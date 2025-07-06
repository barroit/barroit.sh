/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { useEffect, useRef } from 'react'

import { age_since, fmt_age } from './age.js'
import TheFuckingContent from './react/tfc.jsx'

const age = age_since(1112745600000)
const age_str = fmt_age(age)

const cntl_icons = [
	[ '/close.svg', 'bg-red-500' ],
	[ '/minimize.svg', 'bg-yellow-500' ],
	[ '/expand.svg', 'bg-green-500' ],
]

const tux_base = [
	'barroit               ',
	'$ locale -a           ',
	'zh_CN.utf8            ',
	'en_US.utf8            ',
	'ja_JP.utf8            ',
	'$ uname -sr           ',
	'Jiamu Sun 0.39.01-negi',
]

const tux = [
	'    .--.',
	'   |o_o |',
	'   |:_/ |',
	'  //   \\ \\',
	' (|     | )',
	'/\'\\_   _/`\\',
	'\\___)=(___/',
]

function TerminalHead()
{
return (
<div className='flex justify-between items-center bg-[#353535] select-none
                py-1 px-2 rounded-t-md border-t border-x border-[#616161]'>
  <img src='/2024-le-flag-only.svg'
       className='hidden md:block' alt='' aria-hidden='true'/>
  <p className='font-bold
                text-sm
                sm:text-base
                4xl:text-2xl'
     aria-hidden='true'>
     SUPERFORTRESS:
     <span className='m-1'>~/git/barroit.sh</span>
  </p>
  <div className='relative'>
    <div className='group center-y right-0 flex gap-x-2 pl-5 py-1'>
    {cntl_icons.map(([ icon, color ], i) => (
      <div key={ i }
           className={ `rounded-full cursor-pointer ${ color }` }>
        <img src={ icon } alt='' aria-hidden='true'
             className='scale-75 opacity-0
                        group-hover:opacity-100 duration-200'/>
      </div>
    ))}
    </div>
    <TheFuckingContent length={ 10 }/>
  </div>
</div>
) /* return */
}

function TerminalBody()
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

return (
<article className='flex-1 p-1 pr-5 rounded-b-md border cursor-text
                    border-[#616161] border-t-[#101010] selection:bg-[#314f78]
                    *:text-[1.14rem]/8
                    sm:*:text-[1.27rem]/9
                    md:*:text-[1.68rem]/9
                    lg:*:text-[1.7rem]/9
                    2xl:*:text-[1.2rem]/[1.8rem]
                    3xl:*:text-[1.7rem]/9
                    4xl:*:text-[2.9rem]/16'>
  <pre>{ '$ whoami'                             }</pre>
{tux_base.map((line, i) => (
  <pre key={ i } className='hidden 2xl:block'>
    { line + ' '.repeat(22) + tux[i] }
  </pre>
))}
{tux_base.map((line, i) => (
  <pre key={ i } className='hidden xl:block 2xl:hidden'>
    { line + ' '.repeat(8) + tux[i] }
  </pre>
))}
{tux_base.map((line, i) => (
  <pre key={ i } className='hidden lg:block xl:hidden'>
    { line + ' '.repeat(8) + tux[i] }
  </pre>
))}
{tux_base.map((line, i) => (
  <pre key={ i } className='lg:hidden'>
    { line }
  </pre>
))}
  <pre>{ '$ uptime -p'                          }</pre>
  <pre className='text-pretty xl:rext-nowrap'>
    { `up ${ age_str }` }
  </pre>
  <pre>{ '$ fortune | cowsay -f duck'           }</pre>
  <pre>{ '.--------------------------------.'   }</pre>
  <pre>{ '| In solitude, Vocaloids stayed. |'   }</pre>
  <pre>{ '\'--------------------------------\'' }</pre>
  <pre>{ '      \\'                             }</pre>
  <pre>{ '       \\ >()_'                       }</pre>
  <pre>{ '          (__)__ _'                   }</pre>
  <pre ref={ input } className='after:content-[attr(data-cursor)]'>
    { '$ ' }
  </pre>
</article>
) /* return */
}

function Terminal()
{
return (
<section className='relative flex flex-col bg-[#1e1e1e] w-full xl:w-9/10'>
  <TerminalHead/>
  <TerminalBody/>
  <div className='absolute hidden lg:block
                  bottom-10
                  right-10
                  md:right-20
                  lg:right-10
                  xl:bottom-15
                  xl:right-30
                  3xl:bottom-25
                  3xl:right-40
                  4xl:bottom-40
                  4xl:right-70'>
    <img src='/miku-working.png'
         alt='' aria-hidden='true' draggable='false'
         className='object-contain select-none
                    scale-120
                    xl:scale-140
                    2xl:scale-120
                    3xl:scale-150
                    4xl:scale-220'/>
  </div>
</section>
) /* return */
}

function Barroit()
{
return (
  <article className='w-min mt-5 3xl:mt-0 mb-10 md:mb-14 4xl:mb-25'>
    <div className='font-[ScoreDozer] xl:ml-1.5
                    text-[4rem]
                    sm:text-[4.5rem]
                    md:text-[6rem]
                    lg:text-[7.5rem]
                    xl:text-[9rem]
                    2xl:text-[7rem]
                    3xl:text-[11rem]
                    4xl:text-[18rem]
                    text-shadow-[-0.1rem_0_#b8468a,0.1rem_0_#3781b5]
                    md:text-shadow-[-0.18rem_0_#b8468a,0.18rem_0_#3781b5]
                    lg:text-shadow-[-0.28rem_0_#b8468a,0.28rem_0_#3781b5]'>
      <span className='tracking-[0.9rem]
                       md:tracking-[1.2rem]
                       lg:tracking-[2rem]
                       xl:tracking-[3rem]'>
        BARROI
      </span>
      <span>T</span>
    </div>
    <p className='text-right
                  -mt-5
                  md:-mt-8
                  lg:-mt-10
                  xl:-mt-15
                  2xl:-mt-10
                  4xl:-mt-20
                  text-[0.95rem]
                  sm:text-[1.05rem]
                  md:text-[1.4rem]
                  lg:text-[1.8rem]
                  xl:text-[2rem]
                  2xl:text-[1.7rem]
                  3xl:text-[2.5rem]
                  4xl:text-[3rem]'>
      Powered by Hatsune Miku
    </p>
  </article>
) /* return */
}

export default function Hero()
{
return (
<section className='flex-1 2xl:flex justify-between'>
  <div className='flex-2 flex flex-col items-center 2xl:items-stretch
                  3xl:pr-50
                  4xl:pr-70'>
    <Barroit/>
    <Terminal/>
  </div>
  <div className='flex-1 hidden 2xl:flex 3xl:mr-10 4xl:mr-30'>
    <img src='/miku-headpat.png'
         className='lightbase dark:darkbase object-cover select-none'
         alt='miku needs your headpat' draggable='false'/>
  </div>
</section>
) /* return */
}
