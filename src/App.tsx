import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import type { ExchangeRateT, ExchangeRatesMapT } from './types'
import { Overview } from './components/overview'
import { Converter } from './components/converter'

const Page = styled.div`
	display: flex;
	flex-direction: column;
`

const Banner = styled.div`
	background-image: url(background.avif);
	height: 300px;
	width: 100%;
	position: absolute;
	top: 0;
	background-position-y: -100px;
`

const Header = styled.div`
	position: relative;
	top: 30px;
	width: 100%;
	height: 100px;
	display: flex;
	flex-direction: column;
	color: white;
	align-items: center;
`

const Title = styled.h1`
	margin-bottom: 0
`

const Subtitle = styled.h4`
	margin: 5px
`

const czData = {
	country: 'Czech Republic',
	currency: 'Koruna',
	amount: 1,
	code: 'CZK',
	rate: 1,
}


const App = () => {
	const [exchangeRates, setExchangeRates] = useState<ExchangeRateT[]>([])
	const [exchangeRatesMap, setExchangeRatesMap] = useState<ExchangeRatesMapT>({})

	useEffect(() => {
		const dataFetch = async () => {
			const result = await axios('http://0.0.0.0:5000/rates')
			const ratesMap = [czData, ...result.data].reduce((acc: ExchangeRatesMapT, rate: ExchangeRateT) => {
				acc[rate.code] = rate

				return acc
			}, {})

			setExchangeRates(result.data)
			setExchangeRatesMap(ratesMap)
		}
		dataFetch()
	}, [])

	return (
		<Page>
			<Banner />
			<Header>
				<Title>XChange Rates</Title>
				<Subtitle>Check live rates and convert your currency</Subtitle>
			</Header>
			<Converter exchangeRatesMap={exchangeRatesMap} />
			<Overview exchangeRates={exchangeRates} />
		</Page>
	)
}

export default App
