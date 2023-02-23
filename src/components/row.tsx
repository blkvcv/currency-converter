import React from 'react'

import type { ExchangeRateT } from '../types'

type Props = {
	exchangeRate: ExchangeRateT
}

export const Row = ({ exchangeRate }: Props): JSX.Element => {
	return (
		<div>
			{exchangeRate.country} | {exchangeRate.amount} {exchangeRate.code} ={' '}
			{exchangeRate.rate} CZK
		</div>
	)
}
