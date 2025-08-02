/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

const fetch_timeout = [ 300000, 600000 ]
let next_timeout = 1
const pinned_items = [ fetch_timeout[next_timeout] + 1, '' ]
const rest_prefix = 'https://api.github.com/repos/barroit'

async function fetch_lines(token, repo)
{
	const url = `${ rest_prefix }/${ repo.name }/stats/contributors`
	const res = await fetch(url, {
		headers: {
			'Accept': 'application/vnd.github+json',
			'Authorization': `Bearer ${ token }`,
			'User-Agent': 'barroit',
			'X-GitHub-Api-Version': '2022-11-28',
		},
	})

	if (!res.ok)
		return { err: 1, data: await res.text(), repo }
	else if (res.status == 202)
		return { err: 0, repo }
	else
		return { err: 0, data: await res.json(), repo }
}

function accum_line(weeks)
{
	return weeks.reduce((prev, { a, d }) => prev + a - d, 0)
}

function accum_hist(data)
{
	return data.reduce((prev, { total, weeks }) => ({
		commits: prev.commits + total,
		lines: prev.lines + accum_line(weeks)
	}), { commits: 0, lines: 0 })
}

function flat_topic(topics)
{
	return topics.map(({ topic }) => topic.name)
}

async function fetch_pinned(token)
{
	const data = {
		query: `query {
			   node(id: "U_kgDOA_eCTA") {
			      ... on User {
				 pinnedItems(first: 6) {
				    nodes {
				       ... on Repository {
					  name
					  description
					  homepageUrl
					  primaryLanguage {
					     color
					     name
					  }
					  pushedAt
					  repositoryTopics(first: 3) {
					     nodes {
						topic {
						   name
						}
					     }
					  }
				       }
				    }
				 }
			      }
			   }
			}`
	}
	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${ token }`,
			'Content-Type': 'application/json',
			'User-Agent': 'barroit',
		},
		body: JSON.stringify(data),
	})

	if (!res.ok)
		return { err: 1, data: await res.text() }

	const json = await res.json()
	const repos = json.data.node.pinnedItems.nodes
	const wait_queue = []

	for (const repo of repos) {
		const wait = fetch_lines(token, repo)

		wait_queue.push(wait)
	}

	const conts = await Promise.all(wait_queue)
	const pending = conts.filter(({ val }) => !val)
	const ret = conts.map(({ err, data, repo }) => ({
		name: repo.name,
		lang: repo.primaryLanguage,
		desc: repo.description,
		topic: flat_topic(repo.repositoryTopics.nodes),
		docs: repo.homepageUrl,
		pushed: repo.pushedAt,
		history: {
			err,
			data: !data ? undefined : accum_hist(data),
		},
	}))

	next_timeout = pending.length ? 0 : 1
	return { err: 0, data: ret }
}

async function query_highlights(env)
{
	const now = Date.now()

	if (pinned_items[0] + fetch_timeout[next_timeout] < now) {
		pinned_items[1] = await fetch_pinned(env.GITHUB_TOKEN)
		pinned_items[0] = now
	}

	const { err, data } = pinned_items[1]
	const status = err ? 500 : 200
	const ret = JSON.stringify(data)

	next_timeout = err ? 0 : 1
	return new Response(ret, { status })
}

function fetch_handler(req, env)
{
	const url = new URL(req.url)

	switch (url.pathname) {
	case '/query/highlights':
		return query_highlights(env)
	}

	return new Response(null, { status: 404 })
}

export default {
	fetch: fetch_handler,
}
