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
	[ '/close.svg', 'bg-red-500' ],
	[ '/minimize.svg', 'bg-yellow-500' ],
	[ '/expand.svg', 'bg-green-500' ],
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
<article className={ className }>
  <div className='font-[ScoreDozer] xl:ml-[0.5vw]
		  text-[13vw] xl:text-[8.2vw]
		  text-shadow-[-0.5vw_0_#b8468a,0.5vw_0_#3781b5]
		  xl:text-shadow-[-0.35vw_0_#b8468a,0.35vw_0_#3781b5]'>
    <span className='tracking-[2.7vw] xl:tracking-[2.5vw]'>BARROI</span>
    <span>T</span>
  </div>
  <p className='font-[SpaceMono] text-right font-bold italic
		-mt-[2vh] xl:-mt-[5vh] text-[4vw] xl:text-[2vw]'>
    Powered by Hatsune Miku
  </p>
</article>
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
<article className={ clsx(className,
			  'overflow-y-auto',
			  'cursor-text selection:bg-[#314f78]',
			  'border-[0.1vw] rounded-b-[0.5vw]',
			  'border-[#ececec] dark:border-[#616161]',
			  'border-t-[#e5e5e5] dark:border-t-[#101010]',
			  'text-[4vw]/[5vw] xl:text-[1.2vw]/[1.6vw]') }>
{lines_sm.map((line, i) => (
  <pre key={ i } className='xl:hidden'>
    { line }
  </pre>
))}
{lines.map((line, i) => (
  <pre key={ i } className='bg-terminal w-min hidden xl:block'>
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
</article>
) /* return */
}

function Terminal({ className })
{
return (
<section className={ clsx(className, 'bg-terminal',
			  'relative overflow-hidden flex flex-col') }>
  <div className='p-[1.5vw] xl:p-[0.4vw]
		  grid grid-cols-3 items-center
		  bg-[#ececec] dark:bg-[#353535]
		  border-t-[0.1vw] border-x-[0.1vw] rounded-t-[0.5vw]
		  border-[#f6f6f6] dark:border-[#616161] select-none'>
    <img src='/2024-le-flag-only.svg'
	 className='w-[3vw] xl:w-[1.5vw]' alt='' aria-hidden='true'/>
    <p className='justify-self-center font-bold text-[2vw] xl:text-[1vw]'
       aria-hidden='true'>
      SUPERFORTRESS:
      <span className='m-[0.4vw]'>~/git/barroit.sh</span>
    </p>
    <div className='relative'>
      <div className='group absolute center-y right-0
		      pl-[3vw] py-[0.9vw] flex gap-x-[0.8vw]'>
      {wcntl.map(([ icon, color ], i) => (
	<div key={ i }
	     className={ clsx('w-[2.5vw] h-[2.5vw]',
			      'xl:w-[1.1vw] xl:h-[1.1vw]',
			      'flex justify-center items-center',
			      'rounded-full cursor-pointer', color) }>
	  <img src={ icon } alt='' aria-hidden='true'
	       className='scale-60 duration-200
			  opacity-0 group-hover:opacity-100'/>
	</div>
      ))}
      </div>
    </div>
  </div>
  <History className='h-full z-1 p-[0.5vw]'/>
  <div className='absolute right-[8vw] bottom-[2vw] h-[10vw] hidden xl:flex'>
    <img src='/miku-working.png'
	 className='object-cover select-none'
	 alt='' aria-hidden='true' draggable='false'/>
  </div>
</section>
) /* return */
}

export default function Hero()
{
return (
<section className='h-[90vh] xl:flex justify-between pb-[1vh]'>
  <div className='flex flex-col items-center xl:items-stretch'>
    <Barroit className='my-[3vh] xl:my-0'/>
    <Terminal className='mt-[2vh] xl:mt-[5vh] w-[90vw] xl:w-[54vw] h-full'/>
  </div>
  <div className='hidden xl:flex'>
    <img src='/miku-headpat.png'
	 className='lightbase dark:darkbase object-cover select-none'
	 alt='miku needs your headpat' draggable='false'/>
  </div>
</section>
) /* return */
}
