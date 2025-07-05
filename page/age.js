/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

export function age_since(ts)
{
	const birth = new Date(ts)
	const now = new Date()

	let years = now.getFullYear() - birth.getFullYear()
	let months = now.getMonth() - birth.getMonth()
	let days = now.getDate() - birth.getDate()
	let hours = now.getHours() - birth.getHours()
	let minutes = now.getMinutes() - birth.getMinutes()

	if (minutes < 0) {
		minutes += 60
		hours--
	}

	if (hours < 0) {
		hours += 24
		days--
	}

	if (days < 0) {
		const prev = new Date(now.getFullYear(), now.getMonth(), 0)

		days += prev.getDate()
		months--
	}

	if (months < 0) {
		months += 12
		years--
	}

	return { years, months, days, hours, minutes }
}

export function fmt_age(age)
{
	const strs = []
	const names = [ 'year', 'month', 'day', 'hour', 'minute' ]

	for (const name of names) {
		const val = age[`${ name }s`]

		strs.push(`${ val } ${ name }${ val > 1 ? 's' : '' }`)
	}

	return strs.join(', ')
}
