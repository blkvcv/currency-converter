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

	const Container = styled.div`
		display: flex;
	`

	return (
		<Container>
			<Converter />
			<Overview exchangeRates={data} />
		</Container>
	)
}

export default App
