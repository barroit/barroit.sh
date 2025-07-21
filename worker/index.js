/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

const fetch_timeout = 600000
const pinned_items = [ fetch_timeout + 1, '' ]

async function fetch_pinned_items(token)
{
	const data = {
		query: `query {
			   node(id: "U_kgDOA_eCTA") {
			      ... on User {
				 pinnedItems(first: 6) {
				    nodes {
				       ... on Repository {
					  name
					  primaryLanguage {
					     color
					     name
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
		return res.text()

	const json = await res.json()
	const repos = json.data.node.pinnedItems.nodes

	return repos.map(({ name, primaryLanguage }) => ({
		name,
		lang: primaryLanguage,
	}))
}

async function query_highlights(env)
{
	const now = Date.now()

	if (pinned_items[0] + fetch_timeout < now) {
		pinned_items[1] = await fetch_pinned_items(env.GITHUB_TOKEN)
		pinned_items[0] = now
	}

	const data = JSON.stringify(pinned_items[1])
	const status = Array.isArray(pinned_items[1]) ? 200 : 500

	return new Response(data, { status })
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
