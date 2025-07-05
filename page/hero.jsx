/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { useEffect, useRef } from 'react'

import { age_since, fmt_age } from './age.js'

const age = age_since(1112745600000)
const age_str = fmt_age(age)

const cntl_icons = [
	[ '/close.svg', 'bg-red-500' ],
	[ '/minimize.svg', 'bg-yellow-500' ],
	[ '/expand.svg', 'bg-green-500' ],
]

const term_lines = [
	[
		'$ whoami',
		'barroit                                             .--.',
	],
	[
		'$ locale -a                                        |o_o |',
		'zh_CN.utf8                                         |:_/ |',
		'en_US.utf8                                        //   \\ \\',
		'ja_JP.utf8                                       (|     | )',
	],
	[
		'$ uname -sr                                     /\'\\_   _/`\\',
		'Jiamu Sun 0.39.01-negi                          \\___)=(___/',
	],
	[
		'$ uptime -p',
		`up ${ age_str }`,
	],
	[
		'$ fortune | cowsay -f duck',
		'.--------------------------------.',
		'| In solitude, Vocaloids stayed. |',
		'\'--------------------------------\'',
		"      \\",
		"       \\ >()_",
		"          (__)__ _",
	],
	[
		'$ ',
	],
]

function TerminalHead()
{
return (
<div className='flex justify-between items-center bg-[#353535] select-none
                py-1 px-2 rounded-t-md border-t border-x border-[#616161]'>
  <img src='/le-flag-only.svg' className='' alt='' aria-hidden='true'/>
  <p className='font-bold'>
     SUPERFORTRESS:
     <span className='m-1'>~/git/barroit.sh</span>
  </p>
  <div className='group flex gap-x-2'>
  {cntl_icons.map(([ icon, color ], i) => (
    <div key={ i }
         className={ `group h-min rounded-full cursor-pointer ${ color }` }>
        <img src={ icon } alt='' aria-hidden='true'
           className='opacity-0 group-hover:opacity-100
                      duration-200 scale-75 aspect-square object-cover'/>
    </div>
  ))}
  </div>
</div>
) /* return */
}

function TerminalBody()
{
	const box = useRef()
	const lines = term_lines.flat()

	useEffect(() =>
	{
		const item = box.current.lastElementChild
		let prev = '█'
		const id = setInterval(() =>
		{
			item.setAttribute('data-cursor', prev)

			if (!prev)
				prev = '█'
			else
				prev = ''
		}, 600)

		return () => clearInterval(id)
	}, [])

return (
<article ref={ box } className='flex-1 bg-[#1e1e1e] rounded-b-md p-1
                                border border-[#616161] border-t-[#101010]
                                selection:bg-[#314f78]'>
{lines.map((line, i) => (
i != lines.length - 1 ?
  <pre key={ i } className='text-2xl/9'>
    { line + ' '.repeat(75 - line.length) }
  </pre>
:
  <pre key={ i } className='text-2xl/9 after:content-[attr(data-cursor)]'>
    { line }
  </pre>
))}
</article>
) /* return */
}

export default function Hero()
{
return (
<section className='flex-1 flex justify-between'>
  <div className='hero-strip flex-[1.4] flex flex-col *:w-9/10'>
    <article className='mt-10 mb-20'>
      <h1 className='ml-5 font-[ScoreDozer] !text-[10rem] tracking-[3rem]
                     text-shadow-[-0.3rem_0_#b8468a,0.3rem_0_#3781b5]'>
        BARROIT
      </h1>
      <p className='text-2xl text-right -mt-10'>
        —— Powered by Hatsune Miku
      </p>
    </article>
    <section className='flex-1 relative flex flex-col'>
      <TerminalHead/>
      <TerminalBody/>
      <div className='absolute bottom-18 right-45 select-none'>
        <img src='/miku-working.png' className='object-contain'/>
      </div>
    </section>
  </div>
  <div className='flex-1 flex justify-center'>
    <img src='/miku-headpat.png' className='object-contain'/>
  </div>
</section>
) /* return */
}
