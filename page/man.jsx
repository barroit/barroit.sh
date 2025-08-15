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

function ManTag()
{
return (
<pre>
  <span className='underline'>BARROIT</span>
  (1)
</pre>
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
<article className='*:border-[0.4vmin] *:border-pink-700'>
  <header className='translate-y-2 w-min px-2 lightbase dark:darkbase'>
    <h1 className='font-black text-[4vmin] xl:text-[3vmin]'>README</h1>
  </header>
  <div onClick={ to_header }>
    <div ref={ box }
	 className='@container h-[85svh] px-2 overflow-auto
		    text-[2cqh] duration-400 lightbase dark:darkbase
		    data-no-scroll:pointer-events-none
		    data-no-scroll:text-xneu-900/50
		    dark:data-no-scroll:text-xneu-200/50'>
      <pre className='invisible'>miku</pre>
      <header className='flex justify-between'>
	<ManTag/>
	<h2>Barroit Manual</h2>
	<ManTag/>
      </header>
      <pre className='invisible'>miku</pre>
      {sections.map(([ name, [ str, substr ] ]) => (
	<article key={ name }>
	  <h2 className='font-extrabold'>{ name }</h2>
	  <div className='**:text-wrap'>
	    <pre className='pl-[8ch]'>
	      { str }
	    {!substr ? undefined : (
	      <pre className='pl-[4ch]'>{ substr }</pre>
	    )}
	    </pre>
	  </div>
        </article>
      ))}
      <footer className='flex justify-between'>
	<p>Barroit 0.39.01</p>
	<p>2025-07-20</p>
	<ManTag/>
      </footer>
    </div>
  </div>
</article>
) /* return */
}
