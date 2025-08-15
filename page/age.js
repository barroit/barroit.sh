/* SPDX-License-Identifier: GPL-3.0-or-later */
/*
 * Copyright 2025 Jiamu Sun <barroit@linux.com>
 */

const WEEKDAYS = [
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat',
]

const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

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

function pad(num, n)
{
	return num.toString().padStart(n, '0')
}

export function readable_date(time)
{
	const date = new Date(time)

	const week = WEEKDAYS[date.getDay()]
	const month = MONTHS[date.getMonth()]
	const day = date.getDate()

	const hours = pad(date.getHours(), 2)
	const minutes = pad(date.getMinutes(), 2)
	const seconds = pad(date.getSeconds(), 2)
	const years = pad(date.getFullYear(), 2)

	const bias = date.getTimezoneOffset() * -1
	const abs_bias = Math.abs(bias)

	const sign = bias < 0 ? '-' : '+'
	const hh = pad((abs_bias / 60) >>> 0, 2)
	const mm = pad(abs_bias % 60, 2)

	return `${ week } ${ month } ` +
	       `${ hours }:${ minutes }:${ seconds } ${ years } ` +
	       `${ sign }${ hh }${ mm }`
}
