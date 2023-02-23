import React from 'react'
import styled from 'styled-components'

import type { ExchangeRateT } from '../types'
import { Row } from './row'

type Props = {
	exchangeRates: ExchangeRateT[]
}

export const Overview = ({ exchangeRates }: Props): JSX.Element => {
	const Container = styled.div`
		width: 600px;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		height: 600px;
		padding: 10px;
		border-radius: 8px;
		box-shadow: 0px 5px 20px 1px #aaa;
		box-sizing: border-box;
		position: relative;
	`

	return (
		<Container>
			{exchangeRates.map((exchangeRate) => (
				<Row key={exchangeRate.code} exchangeRate={exchangeRate} />
			))}
		</Container>
	)
}
