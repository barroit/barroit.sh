/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import Header from './header.jsx'
import Hero from './hero.jsx'
import Man from './man.jsx'

export default function Profile()
{
return (
<>
  <Header/>
  <main className='strip-bg'>
    <Hero/>
    <Man/>
  </main>
</>
) /* return */
}
