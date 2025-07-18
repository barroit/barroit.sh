/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from "@cloudflare/vite-plugin"

export default defineConfig({
	plugins: [
		react(),
		cloudflare(),
		tailwindcss(),
	],
	publicDir: 'assets',
	build: {
		outDir: 'build',
	},
})
