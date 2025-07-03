/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'

const package_dict = JSON.parse(readFileSync('package.json', 'utf-8'))

function exec(cmd)
{
	return execSync(cmd).toString().trim()
}

function last_commit()
{
	const hash = exec('git log -1 --format=%h')

	return  JSON.stringify(hash)
}

function remote_url()
{
	const upstream = exec('git rev-parse \
			       --abbrev-ref --symbolic-full-name @{u}')

	const remote_col = upstream.split('/')
	const remote = remote_col[0]

	const url = exec(`git remote get-url ${remote}`)

	return  JSON.stringify(url)
}

function homepage()
{
	return JSON.stringify(package_dict.homepage)
}

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
	],
	publicDir: 'assets',
	build: {
		outDir: 'build',
	},
	define: {
		__LAST_COMMIT__: last_commit(),
		__REMOTE_URL__: remote_url(),
		__HOMEPAGE__: homepage(),
	},
})
