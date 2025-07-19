/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

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
<article className='flex justify-between *:text-[2.8vmin]'>
  { children }
</article>
) /* return */
}

export default function Man()
{
return (
<div className='@container h-[100svh] flex justify-center items-center'>
  <article className='relative *:border-[0.4vmin] *:border-pink-700
		      *:lightbase *:dark:darkbase'>
    <header className='relative px-2 inline-block'>
      <h1 className='!text-[4vmin]'>README</h1>
    </header>
    <div className='-mt-2 px-2 xl:w-[90cqw] h-[85cqh] xl:h-[75cqh]
		    overflow-auto'>
      <div className='mt-4'></div>
      <Mander>
	<BarroitMan/>
	<p>Barroit Manual</p>
	<BarroitMan/>
      </Mander>
      <div className='mt-4'></div>
    {sections.map(([ name, [ str, substr ] ]) => (
      <article key={ name }>
	<h2 className='!text-[3.4vmin]'>{ name }</h2>
	<pre className='pl-[8ch] text-wrap text-[3vmin]'>
	  { str }
	{!substr ? undefined : (
	  <pre className='pl-[4ch] text-wrap text-[3vmin]'>
	    { substr }
	  </pre>
	)}
	</pre>
      </article>
    ))}
      <Mander>
	<BarroitMan/>
	<p>2025-07-20</p>
	<BarroitMan/>
      </Mander>
    </div>
  </article>
</div>
) /* return */
}
