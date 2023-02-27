import React from 'react'
import styled from 'styled-components'

import type { ExchangeRateT } from '../types'
import { Row } from './row'

type Props = {
	exchangeRates: ExchangeRateT[]
}

const Container = styled.div`
	width: 800px;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	height: 600px;
	padding: 10px;
	border-radius: 8px;
	box-sizing: border-box;
	top: 450px;
	position: relative;
	align-self: center;
`

export const Overview = ({ exchangeRates }: Props): JSX.Element => {
	return (
		<Container>
			{exchangeRates.map((exchangeRate) => (
				<Row key={exchangeRate.code} exchangeRate={exchangeRate} />
			))}
		</Container>
	)
}
