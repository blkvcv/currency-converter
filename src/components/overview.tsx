import React from 'react'

import type { ExchangeRateT } from '../types'
import { Row } from './row'

type Props = {
	exchangeRates: ExchangeRateT[]
}

export const Overview = ({ exchangeRates }: Props): JSX.Element => {
	return (
		<div>
			{exchangeRates.map((exchangeRate) => (
				<Row key={exchangeRate.code} exchangeRate={exchangeRate} />
			))}
		</div>
	)
}
