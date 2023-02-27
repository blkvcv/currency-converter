import React from 'react'
import styled from 'styled-components'

import type { OverviewT } from '../types'
import { Row } from './row'

type Props = {
	overviewRates: OverviewT[]
}

const Container = styled.div`
	width: 520px;
	display: flex;
	flex-direction: column;
	padding: 10px;
	border-radius: 8px;
	box-sizing: border-box;
	position: relative;
	align-self: center;
`

const Header = styled.div`
	background-color: #09283e;
	width: 100%;
	border-radius: 8px;
	color: white;
	font-weight: bold;
`

export const Overview = ({ overviewRates }: Props): JSX.Element => {
	return (
		<Container>
			<Header>
				<Row country='Country'
					currency='Currency'
					rate='Rate' />
			</Header>
			{overviewRates.map(({ code, country, currency, rate}) => (
				<Row
					key={code}
					country={country}
					currency={currency}
					rate={rate}
				/>
			))}
		</Container>
	)
}
