/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

const rest_prefix = ''

export const cache_timeout = [ 300000, 600000 ]

async function fetch_conts(token, repo)
{
	const url = 'https://api.github.com/repos' +
		    `/barroit/${ repo.name }/stats/contributors`
	const res = await fetch(url, {
		headers: {
			'Accept': 'application/vnd.github+json',
			'Authorization': `Bearer ${ token }`,
			'User-Agent': 'barroit',
			'X-GitHub-Api-Version': '2022-11-28',
		},
	})

	if (!res.ok)
		return { err: await res.text(), repo }
	else if (res.status == 202)
		return { repo }
	else
		return { conts: await res.json(), repo }
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

export async function query(env, force)
{
	const token = env.GITHUB_TOKEN
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
		return { err: await res.text() }

	const json = await res.json()
	const repos = json.data.node.pinnedItems.nodes
	const wait_queue = []

	for (const repo of repos) {
		const wait = fetch_conts(token, repo)

		wait_queue.push(wait)
	}

	const conts = await Promise.all(wait_queue)
	const fast = conts.filter(({ err, conts }) => err || !conts)

	if (fast.length)
		force.next_timeout = 0

	return conts.map(({ err, conts, repo }) => ({
		name: repo.name,
		lang: repo.primaryLanguage,
		desc: repo.description,
		topic: flat_topic(repo.repositoryTopics.nodes),
		docs: repo.homepageUrl,
		pushed: repo.pushedAt,
		history: err ? { err } :
			       conts ? accum_hist(conts) : {},
	}))
}
