/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import { age_since, fmt_age } from './age.js'
import TheFuckingContent from './react/tfc.jsx'

const age = age_since(1112745600000)
const age_str = fmt_age(age)

const wcntl = [
	[ '/close.svg', 'bg-red-500 hover:bg-red-400' ],
	[ '/minimize.svg', 'bg-yellow-500 hover:bg-yellow-400' ],
	[ '/expand.svg', 'bg-green-500 hover:bg-green-400' ],
]

const history = [
	[
		'$ whoami',
		'barroit                                       .--.',
	],
	[
		'$ locale -a                                  |o_o |',
		'zh_CN.utf8                                   |:_/ |',
		'en_US.utf8                                  //   \\ \\',
		'ja_JP.utf8                                 (|     | )',
	],
	[
		'$ uname -sr                               /\'\\_   _/`\\',
		'Jiamu Sun 0.39.01-negi                    \\___)=(___/',
	],
	[
		'$ uptime -p',
		`up ${ age_str }`,
	],
]

const history_sm = [
	[
		'$ whoami',
		'barroit                     .--.',
	],
	[
		'$ locale -a                |o_o |',
		'zh_CN.utf8                 |:_/ |',
		'en_US.utf8                //   \\ \\',
		'ja_JP.utf8               (|     | )',
	],
	[
		'$ uname -sr             /\'\\_   _/`\\',
		'Jiamu Sun 0.39.01-negi  \\___)=(___/',
	],
	[
		'$ uptime -p',
		`up ${ age_str }`,
	],
]

const cowsay = [
	'$ fortune | cowsay -f duck',
	'.--------------------------------.',
	'| In solitude, Vocaloids stayed. |',
	'\'--------------------------------\'',
	"      \\",
	"       \\ >()_",
	"          (__)__ _",
]

function Barroit({ className })
{
return (
<header className={ className }>
  <div className='font-[x14y20pxScoreDozer] text-[13vw] xl:text-[8vw]
		  text-shadow-[-0.5vmin_0_#b8468a,0.5vmin_0_#3781b5]'>
    <span className='tracking-[2.7vmin] xl:tracking-[5vmin]'>BARROI</span>
    <span>T</span>
  </div>
  <p className='-mt-5 text-right italic
		font-[x16y32pxGridGazer] text-[4vw] xl:text-[2vw]'>
    Powered by Hatsune Miku
  </p>
</header>
) /* return */
}

function Toolbar()
{
return (
<header className='@container p-[0.5cqmin] flex justify-between items-center
		   select-none bg-xneu-200 dark:bg-[#353535]
		   border-t border-x rounded-t-[1cqmin]
		   border-xneu-100 dark:border-xneu-700'>
  <img src='/2024-le-flag-only.svg'
       className='w-[2cqh]' alt='' aria-hidden='true'/>
  <p className='font-bold text-[1.3cqh]' aria-hidden='true'>
    SUPERFORTRESS:
    <span className='m-[0.5ch]'>/boot/efi/EFI/barroit</span>
  </p>
  <div className='relative'>
    <div className='group absolute top-1/2 -right-6 -translate-y-1/2
		    px-6 py-1 flex gap-x-1'>
    {wcntl.map(([ icon, color ], i) => (
      <div key={ i }
	   className={ clsx(color,
			    'w-max p-[0.2cqh] rounded-full duration-200') }>
	<img src={ icon }
	     className='w-1 duration-200 opacity-0 group-hover:opacity-100'
	     alt='' aria-hidden='true'/>
      </div>
    ))}
    </div>
  </div>
</header>
) /* return */
}

function History()
{
	const input = useRef()

	useEffect(() =>
	{
		const icons = [ '█', '' ]
		let next = 0
		const id = setInterval(() =>
		{
			input.current.setAttribute('data-cursor', icons[next])
			next = (next + 1) % 2
		}, 600)

		return () => clearInterval(id)
	}, [])

	const lines = history.flat()
	const lines_sm = history_sm.flat()

return (
<div className='relative h-full p-[0.5cqmin] overflow-y-auto
		border rounded-b-[1cqmin] text-[2cqh]/[3cqh]
		bg-lneu-50 dark:bg-lneu-950
		border-xneu-100 dark:border-xneu-700
		border-t-zinc-300 dark:border-t-zinc-900'>
  <div className='cursor-text selection:text-white
		  selection:bg-blue-600 dark:selection:bg-blue-800'>
  {lines_sm.map((line, i) => (
    <pre key={ i } className='xl:hidden text-wrap'>
      { line }
    </pre>
  ))}
  {lines.map((line, i) => (
    <pre key={ i } className='hidden xl:block'>
      { line }
    </pre>
  ))}
  {cowsay.map((line, i) => (
    <pre key={ i }>
      { line }
    </pre>
  ))}
    <pre ref={ input } className='after:content-[attr(data-cursor)]'>
      { '$ ' }
    </pre>
    <div className='absolute right-[10cqmin] bottom-[3cqmin]
		    h-[20cqh] flex portrait:hidden light:invert'>
      <img src='/miku-working.png'
	 className='object-cover select-none'
	 alt='' aria-hidden='true' draggable='false'/>
    </div>
  </div>
</div>
) /* return */
}

function Terminal({ className })
{
return (
<article className={ clsx(className, '@container flex flex-col') }>
  <Toolbar/>
  <History/>
</article>
) /* return */
}

export default function Hero()
{
return (
<div className='h-[92svh] mx-[5vw] xl:flex justify-between'>
  <div className='h-full flex flex-col items-center xl:items-start'>
    <Barroit className='mt-[3svh] xl:mt-0 px-[0.5vmin]'/>
    <Terminal className='w-full h-full mt-[6svh] xl:mt-[4svh]'/>
  </div>
  <div className='hidden lightbase dark:darkbase h-full xl:flex'>
    <img src='/miku-headpat.png'
	 className='h-full object-cover select-none light:invert'
	 alt='miku needs your headpat' draggable='false'/>
  </div>
</div>
) /* return */
}
