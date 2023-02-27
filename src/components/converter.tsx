import React, { useCallback } from 'react'
import styled from 'styled-components'
import { ExchangeRatesMapT, ExchangeRateT } from '../types'

const Container = styled.div`
	position: absolute;
	top: 150px;
	width: 800px;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	justify-self: end;
	align-self: center;
	height: 300px;
	padding: 10px;
	border-radius: 8px;
	background-color: rgb(255, 255, 255);
	box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
`

const Input = styled.input`
	width: 100%;
	border: 1px solid rgb(221, 221, 221);
	border-radius: 6px;
	padding: 18px;
	background: none;
	box-sizing: border-box;
	font-size: 20px;
	&:focus {
		outline: none;
		border-color:rgb(4 153 198);
	}
	`

const Label = styled.div`
	font-weight: bold;
	margin: 10px 0;
`

const Error = styled.div`
	font-size: 12px;
	color: #db3c3c;
	margin-top: 4px
`

const ConvertButton = styled.button`
    cursor: pointer;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 20px;
    color: rgb(255, 255, 255);
    background: rgb(0, 113, 235);
    border: 2px solid rgb(0, 113, 235);
    border-radius: 8px;
	&:hover {
		opacity: 90%;
	}
`

type Props = {
	exchangeRatesMap: ExchangeRatesMapT
}

const exchange = (amount: number, rate: number, base: number): number => {
	return Number((base * amount / rate).toFixed(2))
}

export const Converter = ({exchangeRatesMap}: Props) => {
	const [inputAmount, setInputAmount] = React.useState<string|number>(0)
	const [amount, setAmount] = React.useState<number>(0)
	const [error, setError] = React.useState<string>('')
	const [selectedCurrency, setSelectedCurrency] = React.useState<string>('EUR')
	const [selectedExchangeRate, setSelectedExchangeRate] = React.useState<number>()
	const [convertedAmount, setConvertedAmount] = React.useState<number>()

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (error) setError('')
		const target = event.target as HTMLInputElement
		if (isNaN(Number(target?.value))) {
			setError('Please enter a valid amount')
		}
		setInputAmount(target?.value)
	}

	const convert = useCallback(() => {
		setAmount(Number(inputAmount))
		const currency = exchangeRatesMap[selectedCurrency] as ExchangeRateT

		setSelectedExchangeRate(currency.rate)
		const converted = exchange(amount, currency.rate, currency.amount)
		setConvertedAmount(converted)
	}, [exchangeRatesMap, inputAmount])

	return (
		<Container>
			<Label>Amount</Label>
			<Input placeholder='0' value={inputAmount} onChange={onChange} />
			{error && <Error>{error}</Error>}
			{amount} CZK = {convertedAmount} {selectedCurrency}
			<ConvertButton onClick={() => !error && convert()}>Convert</ConvertButton>
		</Container>
	)
}
