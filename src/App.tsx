import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import type { ExchangeRateT, ExchangeRatesMapT, OverviewT } from './types'
import { exchangeFromCZK } from './utils'
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

const OverviewSection = styled.div`
	margin-top: 40px;
	display: flex;
	align-self: center;
	width: 1100px;
	align-items: center;
	justify-content: space-between;
`

const czData = {
	country: 'Czech Republic',
	currency: 'Koruna',
	amount: 1,
	code: 'CZK',
	rate: 1,
}

const Link = styled.a`
	margin-left: 4px;
	color: white;

	&:visited {
		color: #049dc7;
	}
`

const Footer = styled.div`
	width: 100%;
	height: 100px;
	background: #001222;
	color: white;
	font-size: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
`


const App = () => {
	const [exchangeRatesToCZK, setExchangeRatesToCZK] = useState<OverviewT[]>([])
	const [exchangeRatesFromCZK, setExchangeRatesFromCZK] = useState<OverviewT[]>([])
	const [exchangeRatesMap, setExchangeRatesMap] = useState<ExchangeRatesMapT>({})

	useEffect(() => {
		const dataFetch = async () => {
			const result = await axios('http://0.0.0.0:5000/rates')
			const ratesMap = [czData, ...result.data].reduce((acc: ExchangeRatesMapT, rate: ExchangeRateT) => {
				acc[rate.code] = rate

				return acc
			}, {})

			setExchangeRatesMap(ratesMap)

			const ratesToCZK = result.data.map((rate: ExchangeRateT): OverviewT => {
				return {
					code: rate.code,
					country: rate.country,
					currency: `${rate.amount} ${rate.code}`,
					rate: `${Number(rate.rate).toFixed(2)} CZK`,
				}
			})
			const ratesFromCZK = result.data.map((rate: ExchangeRateT): OverviewT => {
				return {
					code: rate.code,
					country: rate.country,
					currency: '1 CZK',
					rate: `${exchangeFromCZK(1, rate.rate, rate.amount)} ${rate.code}`
				}
			})
			setExchangeRatesToCZK(ratesToCZK)
			setExchangeRatesFromCZK(ratesFromCZK)
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
			<OverviewSection>
				<Overview
					overviewRates={exchangeRatesToCZK}
				/>
				<Overview
					overviewRates={exchangeRatesFromCZK}
				/>
			</OverviewSection>
			<Footer>
				made by Jana Balkovicova ⭐️
				inspired by <Link target='_blank' href='https://www.xe.com/currencyconverter/'>Xe Currency Converter</Link>
			</Footer>
		</Page>
	)
}

export default App
