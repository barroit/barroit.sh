/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { useEffect, useRef } from 'react'

import Shell from './react/shell.jsx'
import { ToTheirs, ToOurs } from './react/link.jsx'
import Flicker from './react/flicker.jsx'

import Banner from './banner.jsx'
import Hero from './hero.jsx'
import Man from './man.jsx'
import Work from './work.jsx'

function Totop()
{
	const img = useRef()

	useEffect(() =>
	{
		/*
		 * WebKit hates this animation.
		 * Force this bitch to run.
		 */
		let retry = 10
		const id = setInterval(() =>
		{
			const classes = img.current.classList

			classes.remove('motion-safe:animate-bounce')
			img.current.offsetWidth
			classes.add('motion-safe:animate-bounce')

			retry--;

			if (!retry)
				clearInterval(id)
		}, 50)
	}, [])

	const reset_view = () =>
	{
		window.scrollTo({ top: 0, behavior: 'smooth'})
	}

return (
<div className='relative min-h-[calc(100vh-100svh)] p-5
		overflow-hidden'>
  <div className='star-strip'></div>
  <div className='h-full flex justify-center'>
    <button onClick={ reset_view }
	    className='py-2 px-2 motion-safe:pt-5 motion-safe:px-4'
	    aria-hidden='true'>
      <img ref={ img } src='/arrow-circle-up.svg'
	   className='w-10 light:invert
		      motion-safe:animate-bounce will-change-transform'
	   alt='' aria-hidden='true'/>
    </button>
  </div>
</div>
) /* return */
}

function HeroSep()
{
return (
<div className='relative mt-5 mx-[5vw] pt-[0.4svh]
		bg-xneu-200 dark:bg-xneu-700'>
  <div className='absolute z-1 top-1/2 left-1/2
		  -translate-x-1/2 -translate-y-1/2
		  px-1 portrait:pointer-coarse:px-2
		  rounded-full lightbase dark:darkbase'>
    <Shell className='px-3 portrait:pointer-coarse:px-4
		      text-nowrap text-[3vmin]
		      before:left-0 after:right-0
		      hover:before:-translate-x-1 hover:after:translate-x-1
		      pointer-coarse:active:before:-translate-x-2
		      pointer-coarse:active:after:translate-x-2'>
      <ToOurs href='#underhero'>
	<Flicker>end of shell output</Flicker>
      </ToOurs>
    </Shell>
  </div>
  <div id='underhero' className='absolute invisible translate-y-2'></div>
</div>
) /* return */
}

export default function Profile()
{
return (
<div className='dashed-strip'>
  <Banner/>
  <main>
    <Hero/>
    <HeroSep/>
    <div className='relative overflow-hidden'>
      <div className='star-strip'></div>
      <Man/>
      <Work/>
      {/* <Timeline/> */}
    </div>
  </main>
  <Totop/>
</div>
) /* return */
}
