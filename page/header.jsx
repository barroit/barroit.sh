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
<div className='xl:hidden 2xl:block text-nowrap'>
  <p className='hidden lg:block'>
    let skyColor = memory.get("last_seen_sky");
  </p>
  <p className='hidden md:block lg:hidden'>
    log.error("stellar_signal_lost");
  </p>
  <div className='flex md:hidden items-center gap-x-2 h-full ml-1'>
  {ctrl_colors.map((color, i) => (
    <div key={ i } className={ 'p-2 rounded-full ' + color }></div>
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
		const skip = [ 0, 1, 1, 1 ]
		let next = 0
		const wave = () =>
		{
			if (!skip[next]) {
				for (let i = 0; i < imgs.length; i++)
					update_y(imgs[i], i, phase.current)

				phase.current = (phase.current + 0.09) % period
			}

			next = (next + 1) % 4
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
<div className='relative hidden xl:block ml-1 2xl:ml-0'>
  <button ref={ box } onClick={ strip_flip }
          aria-label={ (enabled ? 'disable' : 'enable') + ' strip animation' }
          className={ 'center-y p-1 border-2 flex gap-x-2 min-w-max ' +
                      (enabled ? 'border-red-600' : 'border-green-600') }>
    {strip_icons.map(([ name, alt ], i) => (
      <img key={ name } src={ name } className='scale-60' alt={ alt }/>
    ))}
  </button>
  <TheFuckingContent length={ 60 }/>
</div>
) /* return */
}

function Nav()
{
return (
<nav>
  <ul className='flex items-center h-full'>
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
