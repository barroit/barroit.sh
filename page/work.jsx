/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 *
 * PAIN!!! CSS animation fucked me!!!
 */

import { clsx } from 'clsx'
import { useEffect, useState, useRef } from 'react'
import { CloudOfflineIcon,
	 CodeIcon,
	 GitCommitIcon,
	 RepoIcon,
} from '@primer/octicons-react'

import Flicker from './react/flicker.jsx'
import Totheir from './react/totheir.jsx'
import digitlen from './react/digitlen.js'

function Error({ error })
{
return (
<div className='h-full flex justify-center items-center'>
  <div className='relative lightbase dark:darkbase'>
    <div className='p-3 flex items-center border-[0.4vmin] rounded-[2vmin]
		    border-blue-500'>
      <img src='/frown.png' className='h-12' draggable='false'/>
      <article className='ml-4 text-[3vmin]'>
        <p>Pinned repository</p>
        <p>isn't available right now</p>
      </article>
    </div>
  </div>
</div>
) /* return */
}

function Circle({ fill })
{
return (
<svg viewBox='0 0 128 128' width='16' height='16'
     className='size-[1.4cqh] inline-block'>
  <circle cx='50' cy='50' r='50' fill={ fill }/>
</svg>
) /* return */
}

function FieldLoading({ pulse })
{
return (
<div className={ clsx(pulse && 'animate-pulse',
		      'rounded-[0.7vmin] py-1 bg-xneu-200 dark:bg-xneu-800') }>
</div>
) /* return */
}

function FieldBar({ pad, name, desc, children })
{
return (
<div>
  { children }
  <span className='ml-1 font-bold'>{ desc }</span>
  <span className='ml-(--padding)' style={ { '--padding': `${ pad + 1 }ch` } }>
    { name }
  </span>
</div>
) /* return */
}

function FakeRepoCard()
{
return (
<section className='@container p-2 space-y-3 rounded-[1vmin]
		    bg-xneu-200 dark:bg-xneu-900'>
  <div className='flex *:first:px-1 *:last:flex-1'>
    <FieldLoading/>
    <span size='16' className='text-[2cqh] invisible'>.</span>
    <FieldLoading/>
  </div>
  <div className='grid grid-cols-2 grid-rows-2 gap-1 *:even:col-start-2'>
    <p className='invisible text-[1.5cqh]'>miku</p>
    <FieldLoading/>
    <FieldLoading/>
    <FieldLoading/>
  </div>
</section>
) /* return */
}

function RepoCard({ repo })
{
	const history = repo.history.data
	const err = repo.history.err
	let pad = 0

	if (history && !err)
		pad = digitlen(history.lines) - digitlen(history.commits)

return (
<section className='@container p-2 space-y-3
		    rounded-[1vmin] bg-xneu-200 dark:bg-xneu-900'>
  <div className='text-[2cqh] space-x-1'>
    <RepoIcon size='16' className='size-[2cqh]'/>
    <Totheir href={ `https://github.com/barroit/${repo.name}` }
	     className='!decoration-[0.4vmin]'>
      <Flicker className='after:text-[2vmin] after:-ml-[0.6vmin]
			  after:font-bold after:content-["_↗"]'>
	{ repo.name }
      </Flicker>
    </Totheir>
  </div>
  <div className='grid grid-cols-2 grid-rows-2 gap-y-1
		  text-[1.5cqh] *:odd:col-start-2'>
  {err ? (
    <div className='invisible'>miku</div>
  ) : !history ? (
    <FieldLoading pulse/>
  ) : (
    <FieldBar name='commits' desc={ history.commits } pad={ pad }>
      <GitCommitIcon size='24' className='size-[2cqh]'/>
    </FieldBar>
  )}
    <div className='space-x-[0.5vmin] text-[1.5cqh]'>
      <Circle fill={ repo.lang.color }/>
      <span>{ repo.lang.name }</span>
    </div>
  {err ? (
    <div>
      <CloudOfflineIcon size='24' className='size-[2cqh]'/>
      <span className='ml-[1ch]'>unavailable</span>
    </div>
  ) : (!history ? (
    <FieldLoading pulse/>
  ) : (
    <FieldBar name='lines' desc={ history.lines } pad={ 1 }>
      <CodeIcon size='24' className='size-[2cqh]'/>
    </FieldBar>
  ))}
  </div>
</section>
) /* return */
}

function Pinned({ repos, rail })
{
	const box = useRef()
	const [ next, advance ] = useState(0)

	const move_repo = (event) =>
	{
		// const items = Array.from(box.current.children)

		// if (event.deltaY > 0)
		// 	items.shift()
		// else
		// 	items.pop()

		if (event.deltaY > 0)
			advance(prev => (prev + 1) % 6)
		else
			advance(prev => (prev + 5) % 6)
	}

	useEffect(() =>
	{
		if (!repos.length)
			return

		const parent = box.current

		parent.addEventListener('wheel', move_repo)
		return () => parent.removeEventListener('wheel', move_repo)
	}, [ repos ])

	const slot = [
		(next + 5) % 6,
		next,
		(next + 1) % 6,
		(next + 2) % 6,
		(next + 3) % 6,
	]


return (
<div ref={ box }
     className={ clsx('relative flex flex-col justify-around w-40',
		      '*:first:hidden *:last:hidden',
		      !repos.length && 'motion-safe:animate-pulse') }>
{slot.map((idx, i) => repos.length ? (
  <RepoCard key={ idx } repo={ repos[idx] }/>
) : (
  <FakeRepoCard key={ idx }/>
))}
</div>
) /* return */
}

function Rail({ rail })
{
return (
<svg viewBox='0 0 200 1000'
     width='20' height='100' className='w-auto h-full hidden xl:block'>
  <path d='M 200,0
	   A 400,600 0 0,0 200,1000'
	fill='none' stroke='currentColor' strokeWidth='4' ref={ rail }/>
  <rect width='16' height='16' fill='#ff0000ff'/>
</svg>
) /* return */
}

export default function Work()
{
	const rail = useRef()
	const [ pinned, pin ] = useState([])

	const fill_pinned = async () =>
	{
		const res = await fetch('/query/highlights')

		if (!res.ok) {
			const message = await res.text()

			console.error(`/graphql: ${ message }`)
			pin(undefined)
		}

		const repos = await res.json()

		for (const { name, history } of repos) {
			if (!history.err)
				continue

			const prefix = `/${ name }/stats/contributors`

			console.error(`${ prefix }: ${ history.data }`)
		}

		pin(repos)
	}

	useEffect(() =>
	{
		fill_pinned()
	}, [])

return (
<div className='section h-[100svh] flex justify-center items-center'>
{!pinned ? (
  <Error error={ pinned }/>
) : (
  <div className='h-[75svh] flex gap-x-20'>
    <Rail rail={ rail }/>
    <Pinned repos={ pinned } rail={ rail }/>
  </div>
)}
</div>
) /* return */
}
