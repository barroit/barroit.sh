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

function Toolbar({ className })
{
return (
<header className={ clsx(className,
			 '@container flex justify-between items-center',
			 'select-none bg-[#ececec] dark:bg-[#353535]',
			 'border-t border-x rounded-t-[1vmin]',
			 'border-[#ececec] dark:border-[#616161]') }>
  <img src='/2024-le-flag-only.svg'
       className='w-2' alt='' aria-hidden='true'/>
  <p className='font-bold text-[1cqh]'
     aria-hidden='true'>
    SUPERFORTRESS:
    <span className='m-[0.4vmin]'>/boot/efi/EFI/barroit</span>
  </p>
  <div className='relative'>
    <div className='group absolute top-1/2 -translate-y-1/2 -right-6
		    px-6 py-1 flex gap-x-1'>
    {wcntl.map(([ icon, color ], i) => (
      <div key={ i }
	   className={ clsx(color,
			    'p-[0.2cqw] w-max rounded-full duration-200') }>
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

function History({ className })
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
<div className={ clsx(className,
		      '@container relative',
		      'term-bg border rounded-b-[0.5vmin]',
		      'border-[#ececec] dark:border-[#616161]',
		      'border-t-[#e5e5e5] dark:border-t-[#101010]',
		      'text-[2.4cqh]/[3.2cqh] overflow-y-auto') }>
  <div className='cursor-text selection:text-white
		  selection:bg-[#3967d1] dark:selection:bg-[#083aa4]'>
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
    <div className='absolute right-[3cqmin] bottom-[3cqmin]
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
<article className={ clsx(className, 'flex flex-col overflow-hidden') }>
  <Toolbar className='p-[0.5vmin]'/>
  <History className='h-full p-[0.5vmin]'/>
</article>
) /* return */
}

export default function Hero()
{
return (
<div className='section h-[92svh] xl:flex justify-between'>
  <div className='h-full flex flex-col items-center xl:items-start'>
    <Barroit className='mt-[3svh] xl:mt-0 xl:w-full px-[0.5vmin]'/>
    <Terminal className='mt-[6svh] xl:mt-[4svh] w-full h-full'/>
  </div>
  <div className='hidden lightbase dark:darkbase h-full xl:flex'>
    <img src='/miku-headpat.png'
	 className='h-full object-cover select-none light:invert'
	 alt='miku needs your headpat' draggable='false'/>
  </div>
</div>
) /* return */
}
