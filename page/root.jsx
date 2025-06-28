/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Profile from './profile.jsx'

import './index.css'
import './patch.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Profile/>
  </StrictMode>,
)
