/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
	],
	publicDir: 'assets',
	build: {
		outDir: 'build',
	},
})
