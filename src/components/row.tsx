import React from 'react'
import styled from 'styled-components'

import type { ExchangeRateT } from '../types'

type Props = {
	exchangeRate: ExchangeRateT
}

export const Row = ({ exchangeRate }: Props): JSX.Element => {
	const Container = styled.div`
		display: flex;
		margin: 5px;
	`

	const Country = styled.div`
		display: flex;
		flex-basis: 40%;
		padding: 10px 20px;
	`

	const Currency = styled.div`
		display: flex;
		flex-basis: 30%;
		padding: 10px 20px;
	`

	const Rate = styled.div`
		display: flex;
		flex-basis: 30%;
		padding: 10px 20px;
	`

	return (
		<Container>
			<Country>{exchangeRate.country}</Country>
			<Currency>
				{exchangeRate.amount} {exchangeRate.code}
			</Currency>
			<Rate>{exchangeRate.rate}</Rate>
		</Container>
	)
}
