/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import Shell from './react/shell.jsx'
import { ToTheirs, ToOurs } from './react/link.jsx'
import Flicker from './react/flicker.jsx'

import Banner from './banner.jsx'
import Hero from './hero.jsx'
import Man from './man.jsx'
import Work from './work.jsx'
import Timeline from './timeline.jsx'

import ArrowUp from './assets/arrow-circle-up.svg?react'

function Totop()
{
	const reset_view = () =>
	{
		window.scrollTo({ top: 0, behavior: 'smooth'})
	}

return (
<div className='h-full mt-16 flex justify-center'>
  <button onClick={ reset_view } className='p-5'>
    <ArrowUp className='size-5 pointer-coarse:size-8 text-cyan-400
			hover:scale-150 focus-visible:scale-150
			pointer-coarse:active:scale-150
			duration-200 motion-safe:animate-bounce'/>
    <p className='sr-only'>back to top</p>
  </button>
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
  <div id='underhero' className='absolute invisible translate-y-16'></div>
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
      <Totop/>
    </div>
  </main>
</div>
) /* return */
}
