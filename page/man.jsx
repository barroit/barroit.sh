/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { useEffect, useRef } from 'react'

import man from './barroit.1?raw'

const lines = man.split('\n')
const sections = []
let section
let prev
let newline = 1

for (const line of lines) {
	if (line[0] == '[' && line[line.length - 1] == ']') {
		const name = line.slice(1, line.length - 1)

		section = [ '', '' ]
		sections.push([ name, section ])

	} else if (line.startsWith('    ')) {
		section[1] += `${ prev ? ' ' : '' }${ line.trimStart() }`
		prev = 1
		newline = 0

	} else if (line.length) {
		section[0] += `${ newline ? '' : ' ' }${ line }`
		prev = 0
		newline = 0

	} else {
		const sub = section[prev].trimEnd()

		newline = 1
		section[prev] = `${ sub }\n\n`
	}

	const str = section[0]
	const len = str.length

	if (len > 1 && str[len - 1] == '\\' && str[len - 2] == '\\') {
		const sub = section[0].slice(0, len - 2)

		newline = 1
		section[0] = `${ sub }\n`
	}
}

function BarroitMan()
{
return (
<p>
  <span className='underline'>BARROIT</span>
  (1)
</p>
) /* return */
}

function Mander({ children })
{
return (
<article className='flex justify-between *:text-[2.8cqmin]'>
  { children }
</article>
) /* return */
}

export default function Man()
{
	const box = useRef()

	const sync_view = (event) =>
	{
		const rect = event.currentTarget.getBoundingClientRect()
		const y = window.scrollY + rect.top -
			  window.innerHeight / 2 + rect.height / 2

		window.scrollTo({ top: y, behavior: 'smooth' })
	}

	useEffect(() =>
	{
		const observer = new IntersectionObserver(([ entry ]) =>
		{
			if (entry.isIntersecting)
				box.current.removeAttribute('data-no-scroll')
			else
				box.current.setAttribute('data-no-scroll', '')
		}, {
			rootMargin: '-4%',
			threshold: 1,
		})

		observer.observe(box.current)
		return () => observer.disconnect()
	}, [])

return (
<div className='section h-[100svh] flex justify-center items-center'>
  <article className='relative'>
    <header className='relative translate-y-2 px-2 w-min border-[0.4vmin]
		       border-pink-700 lightbase dark:darkbase'>
      <h1 className='text-[4vmin]'>README</h1>
    </header>
    <div onClick={ sync_view }
	 className='term-bg border-[0.4vmin] border-pink-700'>
      <div ref={ box }
	   className='@container px-2 w-[90vw] h-[80svh]
		      overflow-auto duration-400
		      data-no-scroll:pointer-events-none
		      data-no-scroll:text-xneu-900/50
		      dark:data-no-scroll:text-xneu-200/50'>
	<div className='mt-4'></div>
	<Mander>
	  <BarroitMan/>
	  <p>Barroit Manual</p>
	  <BarroitMan/>
	</Mander>
	<div className='mt-4'></div>
      {sections.map(([ name, [ str, substr ] ]) => (
	<article key={ name }>
	  <h2 className='text-[4cqw] xl:text-[2.5cqh]'>{ name }</h2>
	  <div className='text-[3cqw] xl:text-[2cqh] **:pl-[8ch] **:text-wrap'>
	    <pre>
	      { str }
	    {!substr ? undefined : (
	      <pre>
	        { substr }
	      </pre>
	    )}
	    </pre>
	  </div>
	</article>
      ))}
	<Mander>
	  <p>Barroit 0.39.01-negi</p>
	  <p>2025-07-20</p>
	  <BarroitMan/>
	</Mander>
      </div>
    </div>
  </article>
</div>
) /* return */
}
