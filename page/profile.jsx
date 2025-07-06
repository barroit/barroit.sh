/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import Header from './header.jsx'
import Hero from './hero.jsx'

export default function Profile()
{
return (
<>
  <Header/>
  <main className='flex-1 flex flex-col min-h-[92vh] strip-bg'>
    <Hero/>
  </main>
  <footer>
    footer
  </footer>
</>
) /* return */
}
