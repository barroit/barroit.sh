/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { useEffect, useState } from 'react'

import Flicker from './react/flicker.jsx'
import Totheir from './react/totheir.jsx'

function Error({ error })
{
return (
<div className='h-full flex justify-center items-center'>
  <div className='relative lightbase dark:darkbase'>
    <div className='p-3 flex items-center border-[0.4vmin] rounded-[2vmin]
		    border-blue-500'>
      <img src='/frown.png' className='h-12' draggable='false'/>
      <article className='ml-4 text-[3vmin]'>
        <p>Pinned repository</p>
        <p>isn't available right now</p>
      </article>
    </div>
  </div>
</div>
) /* return */
}

function Pinned({ repos })
{
	//
}

export default function Work()
{
	const [ pinned, pin ] = useState([])

	useEffect(() =>
	{
		pin('WIP :(')
	}, [])

return (
<div className='section h-[100svh]'>
{!Array.isArray(pinned) ? (
  <Error error={ pinned }/>
) : (
  <div className='h-full grid grid-cols-4 justify-items-center items-center'>
    <svg viewBox='0 0 200 1000' height='80svh'>
      <path d='M 200,0
	       A 400,600 0 0,0 200,1000'
	    fill='none' stroke='currentColor' strokeWidth='4'/>
    </svg>
    <div className='relative col-start-3 col-span-2 w-full'>
      <Pinned repos={ pinned }/>
    </div>
  </div>
)}
</div>
) /* return */
}
