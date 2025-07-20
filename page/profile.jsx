/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { useEffect, useRef } from 'react'

import Header from './header.jsx'
import Hero from './hero.jsx'
import Man from './man.jsx'

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
		xl:hidden overflow-hidden'>
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

export default function Profile()
{
return (
<>
  <Header/>
  <main className='dashed-strip'>
    <Hero/>
    <div className='relative overflow-hidden'>
      <div className='star-strip'></div>
      <Man/>
    </div>
  </main>
  <footer></footer>
  <Totop/>
</>
) /* return */
}
