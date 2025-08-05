/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

export const cache_timeout = [ 300000, 600000 ]

export async function query(env, force)
{
	const url = new URL('https://api.github.com/search/commits')

	url.searchParams.set('q', 'q=author:barroit')
	url.searchParams.set('sort', '10')
	url.searchParams.set('per_page', '8')

	const res = await fetch('', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${ token }`,
			'Content-Type': 'application/json',
			'User-Agent': 'barroit',
		},
		body: JSON.stringify({ query: ql }),
	})

	console.log(await res.json())

	return '111'
}
