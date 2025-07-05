/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import Cookies from 'js-cookie'
import { useEffect, useMemo, useRef, useState } from 'react'

import TheFuckingContent from './react/tfc.jsx'
import Flicker from './react/flicker.jsx'
import { rand_once } from './react/rand.js'
import Shell from './react/shell.jsx'
import Totheir from './react/totheir.jsx'

const nav_urls = [
	[ 'Github', 'https://github.com/barroit' ],
	[ 'Crap', 'https://crap.barroit.sh' ],
]

const strip_icons = [
	'/2025-octagram.svg',
	'/2024-flag.svg',
	'/2023-megaphone.svg',
	'/10th-pentagram.svg',
	'/2021-flower.svg',
	'/2020-clover.svg',
	'/2019-prism.svg',
	'/2018-balloon.svg',
	'/2014-triangle.svg',
]

function Lustrous()
{
return (
<p>let skyColor = memory.get("last_seen_sky");</p>
) /* return */
}

function Strip()
{
	const box = useRef()
	const [ enabled, enable ] = useState(() =>
	{
		const media = '(prefers-reduced-motion: reduce)'

		if (!Cookies.get('disable_strip'))
			Cookies.set('disable_strip', true)

		return !window.matchMedia(media).matches &&
		       Cookies.get('disable_strip') != 'true'
	})

	const phase = useRef(rand_once())
	const k = 0.9
	const period = Math.PI * 2
	const fn = (r, c) => Math.sin(k * r + c)

	const smooth_y = (r, c) => `translate3d(0, ${ fn(r, c) }rem, 0)`
	const update_y = (el, r, c) => el.style.transform = smooth_y(r, c)

	useEffect(() =>
	{
		if (!enabled)
			return

		const imgs = Array.from(box.current.children)

		let id
		let skip = 3
		const wave = () =>
		{
			if (!skip) {
				for (let i = 0; i < imgs.length; i++)
					update_y(imgs[i], i, phase.current)

				phase.current = (phase.current + 0.09) % period
				skip = 3
			}

			skip--
			id = requestAnimationFrame(wave)
		}

		const viewcheck = new IntersectionObserver(([ entry ]) =>
		{
			if (!entry.isIntersecting)
				cancelAnimationFrame(id)
			else
			 	id = requestAnimationFrame(wave)
		})

		viewcheck.observe(box.current)

		return () =>
		{
			viewcheck.disconnect()
			cancelAnimationFrame(id)
		}
	}, [ enabled ])

	useEffect(() =>
	{
		const imgs = Array.from(box.current.children)

		for (let i = 0; i < imgs.length; i++)
			update_y(imgs[i], i, phase.current)
	}, [])

	const strip_flip = event =>
	{
		enable(!enabled)
		Cookies.set('disable_strip', enabled)
	}

return (
<div className='relative'>
  <button onClick={ strip_flip }
          aria-label={ (enabled ? 'disable' : 'enable') + ' strip animation' }
          className={ 'center-y p-3 border-2 ' +
                      (enabled ? 'border-red-600' : 'border-green-600')}>
    <div ref={ box } className='center-y flex gap-2'>
    {strip_icons.map((name, i) => (
      <img key={ name } src={ name } alt='' className='scale-60'/>
    ))}
    </div>
    <TheFuckingContent length={ 47 }/>
  </button>
  {/*
    * Hold up our box and make it work with outer flex.
    */}
  <TheFuckingContent length={ 47 }/>
</div>
) /* return */
}

function Nav()
{
return (
<nav>
  <ul className='flex items-center'>
  {nav_urls.map(([ name, url ]) => (
    <li key={ name }>
      <Shell left='[' right=']'>
        <Totheir href={ url }>
          <Flicker>{ name }</Flicker>
        </Totheir>
      </Shell>
    </li>
  ))}
  </ul>
</nav>
) /* return */
}

export default function Header()
{
return (
<header className='header flex justify-between pb-4 pt-5
                   border-b-5 border-[#4d4d4d] dark:border-[#4d4d4d]'>
  <Lustrous/>
  <Strip/>
  <Nav/>
</header>
) /* return */
}
