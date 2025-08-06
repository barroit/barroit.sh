/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

export default function SectionError({ children })
{
return (
<div className='flex'>
  <div className='m-auto px-3 py-2 flex items-center gap-x-3 border-[0.4vmin]
		  rounded-[2vmin] lightbase dark:darkbase border-blue-500'>
    <img src='/frown.png' className='size-8'
	 draggable='false' aria-hidden='treu'/>
    <pre className='text-[4vmin] xl:text-[3vmin]'>
      <p className='sr-only'>sorry, but</p>
      { children }
    </pre>
  </div>
</div>
) /* return */
}
