import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import type { ExchangeRateT } from './types'
import { Overview } from './components/overview'
import { Converter } from './components/converter'

const App = () => {
	const [data, setData] = useState<ExchangeRateT[]>([])

	useEffect(() => {
		const dataFetch = async () => {
			const result = await axios('http://0.0.0.0:5000/rates')

			setData(result.data)
		}
		dataFetch()
	}, [])

	const Page = styled.div`
		display: flex;
		height: 100vh;
		flex-direction: column;
		justify-content: space-evenly;
	`
	const Header = styled.h1`
		align-self: center;
		height: 30px;
	`
	const AppContainer = styled.div`
		display: flex;
		align-content: center;
		justify-content: space-around;
	`

	return (
		<Page>
			<Header>Currency Converter & Exchange Rates</Header>
			<AppContainer>
				<Converter />
				<Overview exchangeRates={data} />
			</AppContainer>
		</Page>
	)
}

export default App
