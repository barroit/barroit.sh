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
<article className='flex justify-between'>
  { children }
</article>
) /* return */
}

export default function Man()
{
	const box = useRef()

	const to_header = (event) =>
	{
		const header = event.currentTarget.previousElementSibling

		const rect = header.getBoundingClientRect()
		const y = window.scrollY + rect.top - rect.height

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
		}, { threshold: 1 })

		observer.observe(box.current)
		return () => observer.disconnect()
	}, [])

return (
<div>
  <article className='relative *:border-[0.4vmin] *:border-pink-700'>
    <header className='relative z-1 translate-y-2 w-min px-2
		       bg-lneu-50 dark:bg-lneu-950'>
      <h1 className='font-black text-[4vmin] xl:text-[3vmin]'>README</h1>
    </header>
    <div onClick={ to_header }>
      <div ref={ box }
	   className='@container relative w-90 h-[85svh] px-2 text-[2cqh]
		      lightbase dark:darkbase overflow-auto duration-400
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
	  <h2 className='font-extrabold'>{ name }</h2>
	  <div className='**:text-wrap'>
	    <pre className='pl-[8ch]'>
	      { str }
	    {!substr ? undefined : (
	      <pre className='pl-[4ch]'>
		{ substr }
	      </pre>
	    )}
	    </pre>
	  </div>
	</article>
      ))}
	<Mander>
	  <p>Barroit 0.39.01</p>
	  <p>2025-07-20</p>
	  <BarroitMan/>
	</Mander>
      </div>
    </div>
  </article>
</div>
) /* return */
}
