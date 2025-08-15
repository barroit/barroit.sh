/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { useEffect, useState } from 'react'

import Flicker from './react/flicker.jsx'
import { ToTheirs } from './react/link.jsx'

import { readable_date } from './age.js'
import SectionError from './secerr.jsx'
import useScrollable from './scrollable.js'

import fake from '../.tmp/data.json'

export default function Timeline()
{
	const [ commits, push ] = useState({})
	const box = useScrollable([ commits ])

	const push_commits = async () =>
	{
		const url = new URL('https://api.github.com/search/commits')

		url.searchParams.set('q', 'author:barroit')
		url.searchParams.set('sort', 'author-date')
		url.searchParams.set('per_page', '8')

		// const res = await fetch(url, {
		// 	headers: {
		// 		'Accept': 'application/vnd.github+json',
		// 		'User-Agent': 'barroit',
		// 		'X-GitHub-Api-Version': '2022-11-28',
		// 	},
		// })

		// if (!res.ok) {
		// 	push(undefined)
		// 	return
		// }

		// const latest = await res.json()
		const latest = fake
		const count = latest.total_count
		const items = latest.items.map(({
			sha,
			html_url,
			commit,
			commit: { author },
			repository,
		}) => ({
			sha,
			html_url,
			commit,
			author,
			repo: repository,
		}))

		push({ count, items })
	}

	useEffect(() =>
	{
		push_commits()
	}, [])

return !commits ? (
<SectionError>
  <pre>No commit for you</pre>
</SectionError>
) : !commits.items ? (
<div>
  <div>
    11
  </div>
</div>
) : (
<article>
  <div ref={ box }
       className='group max-w-min h-[85svh] py-1
		  rounded-[1vmin] bg-lneu-50 dark:bg-lneu-900 shadow-rb'>
    <div className='flex h-full duration-400 group-data-no-scroll:opacity-50'>
      <header className='mr-1 text-vertical font-bold text-nowrap'>
	<h1 className='text-[2vh]'>
	  Recent commit by barroit
	</h1>
	<p className='text-right text-[1.5vh]'>
	  { commits.count } in record
	</p>
      </header>
      <div className='w-82 pr-2 overflow-auto text-[1.5vh]'>
      {commits.items.map(({ sha, html_url, commit, author, repo }, i) => (
	<div key={ sha }
	     data-last={ i == commits.items.length - 1 ? '' : undefined }
	     className='*:before:mr-[1ch] data-last:*:not-first:before:mr-[2ch]
			*:first:before:content-["*"]
			not-data-last:*:not-first:before:content-["|"]
			not-data-last:*:not-first:before:text-red-700
			not-data-last:*:not-first:before:font-bold'>
	  <pre className='*:text-yellow-600'>
	    <div className='xl:hidden'>
	      <span>commit </span>
	      <ToTheirs href={ html_url }>
		<Flicker>{ sha }</Flicker>
	      </ToTheirs>
	    </div>
	    <div className='hidden xl:inline-block'>
	      <span>commit </span>
	      <ToTheirs href={ html_url }>
		<Flicker>{ sha }</Flicker>
	      </ToTheirs>
	      <span> (</span>
	      <ToTheirs href={ repo.html_url }>
		<Flicker>{ repo.name }</Flicker>
	      </ToTheirs>
	      <span>)</span>
	    </div>
	  </pre>
	  <pre>Author: { author.name } { `<${ author.email }>` }</pre>
	  <pre>Date:   { readable_date(author.date) }</pre>
	  <pre className='xl:hidden'>
	    <span>Repo:   </span>
	    <ToTheirs href={ repo.html_url }>
	      <Flicker>{ repo.name }</Flicker>
	    </ToTheirs>
	  </pre>
	  <pre></pre>
	{commit.message.split('\n').map((line, i) => (
	  <pre key={ i }>
	    <pre className='inline-block pl-[4ch]'>{ line }</pre>
	  </pre>
	))}
	{i != commits.items.length - 1 && (
	  <pre></pre>
	)}
	</div>
      ))}
	<pre>~</pre>
	<pre>~</pre>
	<pre>~</pre>
	<pre>~</pre>
	<pre>~</pre>
	<pre>~</pre>
	<pre>~</pre>
	<pre>~</pre>
	<pre>~</pre>
	<pre>~</pre>
	<pre>~</pre>
	<pre>~</pre>
	<pre>(END)</pre>
      </div>
    </div>
  </div>
</article>
) /* return */
}
