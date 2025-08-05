/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 *
 * PAIN!!! CSS animation fucked me!!!
 */

import { clsx } from 'clsx'
import { useEffect, useState, useRef } from 'react'
import { ChevronDownIcon,
	 ChevronUpIcon,
	 ClockIcon,
	 CloudOfflineIcon,
	 CodeIcon,
	 DotFillIcon,
	 GitCommitIcon,
	 TagIcon,
	 LinkIcon,
	 RepoIcon,
} from '@primer/octicons-react'

import Flicker from './react/flicker.jsx'
import { ToTheirs } from './react/link.jsx'
import digitlen from './react/digitlen.js'

import { age_since } from './age.js'

const MARKER_SIZE = 24

const marker_colors = [
	'oklch(0.8765 0.1588 180)',
	'oklch(0.7147 0.1893 45)',
	'oklch(0.8705 0.1664 90)',
	'oklch(0.8382 0.1207 340)',
	'oklch(0.6 0.2415 21.9)',
	'oklch(0.4764 0.2959 270)',
]

function hidden(item)
{
	const styles = getComputedStyle(item)

	return styles.display == 'none'
}

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

function Circle({ size, className, fill })
{
	const d = parseInt(size)
	const r = d / 2
return (
<svg viewBox={ `0 0 ${ d } ${ d }` }
     width={ d } height={ d }
     className={ clsx('inline-block', className) }>
  <circle cx={ r } cy={ r } r={ r } fill={ fill }/>
</svg>
) /* return */
}

function FieldLoading({ pulse, className })
{
return (
<div className={ clsx(className, pulse && 'motion-safe:animate-pulse',
		      'rounded-[0.7vmin] bg-xneu-200 dark:bg-xneu-800') }>
  <span className='invisible'>.</span>
</div>
) /* return */
}

function FieldSlot({ children, className })
{
return (
<div className={ clsx('*:first:mr-[3cqw] *:first:size-[1.8cqh]', className) }>
  { children }
</div>
) /* return */
}

function FieldDesc({ pad = 0, name, desc, children, className })
{
return (
<FieldSlot className={ className }>
  { children }
  <span className='font-bold'>{ desc }</span>
  <span className='ml-(--padding)' style={ { '--padding': `${ pad + 1 }ch` } }>
    { name }
  </span>
</FieldSlot>
) /* return */
}

function FakeRepoCard({ pulse })
{
return (
<div className='@container p-2 bg-xneu-50 dark:bg-xneu-900'>
  <div className={ clsx('space-y-3', pulse && 'motion-safe:animate-pulse') }>
    <div className='space-y-1'>
      <div className='text-[2.5cqh]'>
	<FieldLoading pulse={ pulse }/>
      </div>
      <div className='text-[1.5cqh]'>
	<FieldLoading pulse={ pulse }/>
      </div>
    </div>
    <div className='grid grid-cols-2 grid-rows-2
		    gap-y-1 gap-x-2 text-[1.5cqh]'>
      <FieldLoading pulse={ pulse }/>
      <FieldLoading pulse={ pulse }/>
      <FieldLoading pulse={ pulse }/>
      <FieldLoading pulse={ pulse }/>
      <FieldLoading pulse={ pulse } className='col-span-2'/>
      <FieldLoading pulse={ pulse } className='mt-1'/>
    </div>
  </div>
</div>
) /* return */
}

function clamp_str(str, max)
{
	if (str.length > max)
		str = `${ str.slice(0, max - 3) }...`

	return str
}

function fmt_date_col(time, str)
{
	return `${ time } ${ str }${ time > 1 ? 's' : '' } ago`
}

function fmt_date(str)
{
	const { years, months, days, hours, minutes } = age_since(str)
	const fields = [
		[ years,   'year'   ],
		[ months,  'month'  ],
		[ days,    'day'    ],
		[ hours,   'hour'   ],
		[ minutes, 'minute' ],
	]

	for (const [ time, name ] of fields) {
		if (time)
			return fmt_date_col(time, name)
	}
}

function RepoCard({ repo, focused })
{
	const history = repo.history
	const histerr = repo.history.err
	let pad = 0

	if (history && !histerr)
		pad = digitlen(history.lines) - digitlen(history.commits)

	const docs_url = URL.parse(repo.docs)
	const docs_path = docs_url.pathname.replace(/\/+$/, '')
	const docs_str = docs_url.hostname + docs_path

	const docs = clamp_str(docs_str, 35)
	const docs_xl = clamp_str(docs, 25)

	const topics_arr = Array.from(repo.topic)
	const topics_str = topics_arr.join(' / ')
	const topics = clamp_str(topics_str, 45)
	const topics_sm = clamp_str(topics_str, 35)

	const pushed = fmt_date(repo.pushed)

return (
<section className={ clsx('@container p-2 space-y-3',
			  'bg-xneu-50 dark:bg-xneu-900',
			  !focused && 'select-none') }
	 inert={ !focused }>
  <div className='space-y-1'>
    <div className='text-[2.5cqh] font-bold space-x-1'>
      <RepoIcon size='16' className='size-[2.5cqh]'/>
      <ToTheirs href={ `https://github.com/barroit/${repo.name}` }
	       className='!decoration-[0.4cqmax]'>
	<Flicker className='after:text-[2cqh] after:-ml-[0.6cqmax]
			    after:font-bold after:content-["_↗"]'>
	  { repo.name }
	</Flicker>
      </ToTheirs>
    </div>
    <p className='pl-[0.5cqw] text-[1.5cqh] text-xneu-700 dark:text-xneu-400'>
      { repo.desc }
    </p>
  </div>
  <div className='grid grid-cols-2 grid-rows-2 gap-y-1 gap-x-2 text-[1.6cqh]'>
  {histerr ? (
    <FieldSlot className='row-span-2 my-auto'>
      <CloudOfflineIcon size='24'/>
      <span>unavailable</span>
    </FieldSlot>
  ) : !history.lines ? (
    <FieldLoading pulse={ focused }/>
  ) : (
    <FieldDesc name='commits' desc={ history.commits } pad={ pad }>
      <GitCommitIcon size='24'/>
    </FieldDesc>
  )}
    <div className='xl:hidden'></div>
    <FieldDesc name='push' desc={ pushed } className='hidden xl:block'>
      <ClockIcon size='24'/>
    </FieldDesc>
  {histerr ? (
    undefined
  ) : !history.lines ? (
    <FieldLoading pulse={ focused }/>
  ) : (
    <FieldDesc name='lines' desc={ history.lines }>
      <CodeIcon size='24'/>
    </FieldDesc>
  )}
    <FieldDesc name='push' desc={ pushed } className='xl:hidden'>
      <ClockIcon size='24'/>
    </FieldDesc>
    <FieldSlot className='col-span-2 xl:col-span-1 *:last:!decoration-[0.4vmin]'>
      <LinkIcon size='24'/>
      <ToTheirs href={ repo.docs } className='xl:hidden'>
	<Flicker>{ docs }</Flicker>
      </ToTheirs>
      <ToTheirs href={ repo.docs } className='hidden xl:inline-block'>
	<Flicker>{ docs_xl }</Flicker>
      </ToTheirs>
    </FieldSlot>
    <FieldSlot className='col-span-2'>
      <TagIcon size='24'/>
      <span className='hidden xl:inline-block'>{ topics }</span>
      <span className='xl:hidden'>{ topics_sm }</span>
    </FieldSlot>
    <FieldSlot className='mt-1 *:first:!mr-1'>
      <DotFillIcon fill={ repo.lang.color } size='16'
		   className='scale-180 !align-text-top'/>
      <span>{ repo.lang.name }</span>
    </FieldSlot>
  </div>
</section>
) /* return */
}

function marker_zoom(idx, rail, out)
{
	if (hidden(rail.current))
		return

	const rect = rail.current.children[idx + 1]
	const prev = rect.getAttribute('width')

	if (prev == MARKER_SIZE && out ||
	    prev == MARKER_SIZE * 2 && !out)
		return

	let next
	let offset
	let fixup

	if (out) {
		next = prev / 2
		offset = next / 2
		fixup = -5
	} else {
		next = prev * 2
		offset = -(prev / 2)
		fixup = 5
	}

	const match = rect.style.transform.match(/^translate3d\((.*)\)$/)
	const str = match[1]
	const strarr = str.split(', ')

	const transform = strarr.map(v => parseFloat(v) + offset)
	const x = transform[0]
	const y = transform[1]

	rect.setAttribute('width', next)
	rect.setAttribute('height', next)
	rect.style.transform = `translate3d(${ x + fixup }px, ${ y }px, 0)`
}

function marker_grow(idx, rail)
{
	marker_zoom(idx, rail, 0)
}

function marker_shrink(idx, rail)
{
	marker_zoom(idx, rail, 1)
}

function Showcase({ repos })
{
	const rail = useRef()
	const [ focused, focus ] = useState(0)

	const slots = [
		(focused + 5) % 6,
		focused,
		(focused + 1) % 6,
	]

	const loading = !repos.length
	const markers = [
		marker_colors[slots[0]],
		marker_colors[slots[1]],
		marker_colors[slots[2]],
	]

	useEffect(() =>
	{
		if (hidden(rail.current))
			return

		const items = Array.from(rail.current.children)
		const path = items[0]

		const len = path.getTotalLength()
		const span = len / 4

		items.shift()
		items.forEach((rect, i) =>
		{
			const dist = span * (i + 1)
			const point = path.getPointAtLength(dist)
			const fixup = MARKER_SIZE / 2

			const x = `${ point.x - fixup }px`
			const y = `${ point.y - fixup }px`

			rect.style.transform = `translate3d(${ x }, ${ y }, 0)`
		})
	}, [])

return (
<div className='xl:mr-10 py-5 flex gap-x-10'>
  <svg ref={ rail } viewBox='0 0 202 1002'
       width='20' height='100' className='relative w-auto h-full
					  hidden xl:block text-xneu-500'>
    <path d='M 180 0
	     h 20
	     v 20
	     M 200 0
	     A 400 600, 0, 0, 0, 200 1000
	     M 180 1000
	     h 20
	     v -20'
	  fill='none' stroke='currentColor' strokeWidth='4'/>
  {markers.map((color, i) => (
    <rect key={ i } width={ MARKER_SIZE } height={ MARKER_SIZE }
	  className='duration-200' fill={ color }/>
  ))}
  </svg>
  <div className='flex flex-col justify-between w-80'>
  {slots.map((idx, i) => (
    <div key={ idx }
	 onFocus={ loading ? undefined : () => marker_grow(i, rail) }
	 onBlur={ loading ? undefined : () => marker_shrink(i, rail) }
	 onPointerEnter={ loading ? undefined : () => marker_grow(i, rail) }
	 onPointerLeave={ loading ? undefined : () => marker_shrink(i, rail) }
	 className='relative odd:scale-75 even:scale-110
		    *:rounded-[1vmin] *:last:shadow-rb'>
    {i != 1 && (
      <div className='absolute inset-0 z-1 backdrop-blur-[0.2cqh]
		      bg-xneu-100/50 dark:bg-xneu-900/50'>
      {!loading && (
	<button className='group w-full h-full flex justify-center items-center
			   border-4 border-transparent hover:border-blue-400
			   duration-200'
		onClick={ () => focus(idx) }>
	  <div className='*:size-[8cqh] *:text-pink-400 *:duration-200
			  *:group-hover:scale-150
			  *:group-focus-visible:scale-150
			  pointer-coarse:*:group-active:scale-150'>
	  {i ? (
	    <ChevronDownIcon size='12'/>
	  ) : (
	    <ChevronUpIcon size='12'/>
	  )}
	  </div>
	</button>
      )}
      </div>
    )}
    {loading ? (
      <FakeRepoCard pulse={ i == 1 }/>
    ) : (
      <RepoCard repo={ repos[idx] } focused={ i == 1 }/>
    )}
    </div>
  ))}
  </div>
</div>
) /* return */
}

export default function Work()
{
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

			console.error(`${ prefix }: ${ history.err }`)
		}

		pin(repos)
	}

	useEffect(() =>
	{
		fill_pinned()
	}, [])

return (
<div className='section h-[100svh] mt-16 flex justify-center'>
{!pinned ? (
  <Error error={ pinned }/>
) : (
  <Showcase repos={ pinned }/>
)}
</div>
) /* return */
}
