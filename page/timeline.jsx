/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { useEffect } from 'react'

export default function Timeline()
{
	const fill_pinned = async () =>
	{
		const res = await fetch('/query/works')
		const repos = await res.json()

	}

	useEffect(() =>
	{
		fill_pinned()
	}, [])

return (
<div>
</div>
) /* return */
}
