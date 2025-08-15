/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import * as highlights from './highlights.js'

const cache = {}

function init_cache(fn, timeout)
{
	cache[fn.name] = {
		timeout,
		next_timeout: 1,
		last: 0,
	}
}

function fetch_cache(fn)
{
	const now = Date.now()

	const { last, timeout, next_timeout } = cache[fn.name]

	if (last + timeout[next_timeout] < now)
		return

	return cache[fn.name].data
}

function bump_cache(fn, force, res)
{
	cache[fn.name].last = Date.now()
	cache[fn.name].next_timeout = force.next_timeout ? force.next_timeout :
							   res.err ? 0 : 1
	cache[fn.name].data = res
}

init_cache(highlights.query, highlights.cache_timeout)

async function fetch_handler(req, env)
{
	const url = new URL(req.url)
	let fn

	switch (url.pathname) {
	case '/query/highlights':
		fn = highlights.query
		break

	case '/query/works':
		fn = works.query
		break

	default:
		return new Response(null, { status: 404 })
	}

	let res = fetch_cache(fn)
	const force = {}

	if (!res)
		res = await fn(env, force, req)

	const status = res.err ? 500 : 200
	const data = JSON.stringify(res.err ?? res)

	bump_cache(fn, force, res)
	return new Response(data, { status })
}

export default {
	fetch: fetch_handler,
}
