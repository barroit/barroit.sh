/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

import { useEffect, useRef } from 'react'

export default function useScrollable(dep = [])
{
	const box = useRef()

	useEffect(() =>
	{
		if (!box.current)
			return

		const observer = new IntersectionObserver(([ entry ]) =>
		{
			const item = box.current

			if (entry.isIntersecting) {
				item.removeAttribute('data-no-scroll')
				item.classList.remove('pointer-events-none')
			} else {
				item.setAttribute('data-no-scroll', '')
				item.classList.add('pointer-events-none')
			}

		}, { threshold: 1 })

		observer.observe(box.current)
		return () => observer.disconnect()
	}, dep)

	return box
}
