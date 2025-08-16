/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import clsx from 'clsx'
import debounce from 'debounce'
import Cookies from 'js-cookie'
import { useEffect, useMemo, useRef, useState } from 'react'

import TheFuckingContent from './react/tfc.jsx'
import Flicker from './react/flicker.jsx'
import { rand_once } from './react/rand.js'
import Shell from './react/shell.jsx'
import { ToTheirs } from './react/link.jsx'

const nav_urls = [
	[ 'Github', 'https://github.com/barroit' ],
	[ 'Crap',   'https://crap.barroit.sh'    ],
]

const strip_icons = [
	[ '/2025-octagram.svg',  'magical mirai 2025 octagram'  ],
	[ '/2024-flag.svg',      'magical mirai 2024 flag'      ],
	[ '/2023-megaphone.svg', 'magical mirai 2023 megaphone' ],
	[ '/10th-pentagram.svg', 'magical mirai 10th pentagram' ],
	[ '/2021-flower.svg',    'magical mirai 2021 flower'    ],
	[ '/2020-clover.svg',    'magical mirai 2020 clover'    ],
	[ '/2019-prism.svg',     'magical mirai 2019 prism'     ],
	[ '/2018-balloon.svg',   'magical mirai 2018 balloon'   ],
	[ '/2014-triangle.svg',  'magical mirai 2014 triangle'  ],
]

const ctrl_colors = [ 'bg-red-500', 'bg-yellow-500', 'bg-green-500' ]

function Lustrous()
{
return (
<div className='md:hidden xl:block text-nowrap'>
  <p className='hidden 2xl:block'>
    let skyColor = memory.get("last_seen_sky");
  </p>
  <p className='hidden xl:block 2xl:hidden'>
    memory.get("last_seen_sky");
  </p>
  <div className='flex md:hidden gap-x-3'>
  {ctrl_colors.map((color, i) => (
    <div key={ i } className={ clsx('p-[2cqw] rounded-full', color) }></div>
  ))}
  </div>
</div>
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
	const ampl = useRef(0.7)
	const freq = 0.9
	const period = Math.PI * 2
	const wave_fn = (r, c) => ampl.current * Math.sin(freq * r + c)

	const smooth_y = (r, c) => `translate3d(0, ${ wave_fn(r, c) }rem, 0)`
	const update_y = (el, r, c) => el.style.transform = smooth_y(r, c)

	useEffect(() =>
	{
		if (!enabled)
			return

		let fps_avg = 39
		let ts_prev = performance.now()
		let counting = 300

		let skip
		let skips = 0

		const imgs = Array.from(box.current.children)
		let id
		const wave = ts_next =>
		{
			if (counting) {
				const ts_delta = (ts_next - ts_prev)
				const fps_next = 1000 / ts_delta

				fps_avg = (fps_avg + fps_next) / 2
				ts_prev = ts_next
				counting--

				skip = fps_avg / 60

				if (skip < 1) {
					skip = 1
					counting = 0
				}
			}

			if (++skips > skip) {
				for (let i = 0; i < imgs.length; i++)
					update_y(imgs[i], i, phase.current)

				phase.current = (phase.current + 0.09) % period
				skips = 0
			}

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

	const sync_y_force = () =>
	{
		const imgs = box.current.children
		const img = box.current.children[0]
		const styles = getComputedStyle(img)
		const height = parseFloat(styles.height)

		ampl.current = (height ? height : 16) / 50

		for (let i = 0; i < box.current.children.length; i++)
			update_y(imgs[i], i, phase.current)
	}
	const sync_y = debounce(sync_y_force, 200)

	useEffect(() =>
	{
		sync_y_force()

		window.addEventListener('resize', sync_y)

		return () => window.removeEventListener('resize', sync_y)
	}, [])

	const strip_flip = event =>
	{
		enable(!enabled)
		Cookies.set('disable_strip', enabled)
	}

return (
<button ref={ box } onClick={ strip_flip }
	aria-label={ (enabled ? 'disable' : 'enable') + ' strip animation' }
	className={ clsx('h-4 px-1 hidden md:flex items-center gap-x-3',
			 'hover:bg-zinc-200 dark:hover:bg-zinc-900',
			 'border-[0.3cqh] border-green-600 duration-50',
			 enabled && 'border-red-600') }>
  {strip_icons.map(([ name, alt ], i) => (
    <img key={ name } src={ name } alt={ alt }
	 className='w-2 invert dark:invert-0'/>
  ))}
</button>
) /* return */
}

function Nav()
{
return (
<nav>
  <ul className='flex'>
  {nav_urls.map(([ name, url ]) => (
    <li key={ name }>
      <Shell className='px-3 portrait:pointer-coarse:px-4
			before:left-0 after:right-0
			hover:before:-translate-x-1
			hover:after:translate-x-1
			pointer-coarse:active:before:-translate-x-2
			pointer-coarse:active:after:translate-x-2'>
	<ToTheirs href={ url }>
	  <Flicker>{ name }</Flicker>
	</ToTheirs>
      </Shell>
    </li>
  ))}
  </ul>
</nav>
) /* return */
}

export default function Banner()
{
return (
<header className='@container h-[8svh] mx-[5vw]
		   pt-[1cqh] pl-[1cqh] pr-[0.5cqh]
		   flex justify-between items-center
		   text-[3cqh] border-b-[0.4svh]
		   text-xneu-950 bg-white dark:text-xneu-200 dark:bg-xneu-950
		   border-xneu-200 dark:border-xneu-700'>
  <Lustrous/>
  <Strip/>
  <Nav/>
</header>
) /* return */
}
