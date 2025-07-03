/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { useRef } from 'react'

import Totheir from './react/totheir.jsx'
import Shell from './react/shell.jsx'
import Flicker from './react/flicker.jsx'

export default function Commit()
{
return (
<Shell left='[' right=']'>
  <Totheir href={`${__HOMEPAGE__}/tree/${__LAST_COMMIT__}`}>
    <Flicker>{__LAST_COMMIT__}</Flicker>
  </Totheir>
</Shell>
) /* return */
}
