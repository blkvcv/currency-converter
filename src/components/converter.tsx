import React, { useMemo } from 'react'

import styled from 'styled-components'
import Select, { SingleValue } from 'react-select'

import { ExchangeRatesMapT } from '../types'
import { exchangeFromCZK, exchangeToCZK, separateThousands } from '../utils'

const Container = styled.div`
	position: relative;
	margin-top: 80px;
	width: 1000px;
	height: 240px;
	display: flex;
	flex-direction: column;
	align-self: center;
	border-radius: 8px;
	background-color: rgb(255, 255, 255);
	box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
	justify-content: space-between;
`

const ActionPanel = styled.div`
	margin: 0 30px;
	margin-top: 10px;
	display: flex;
	justify-content: space-between;
`
const ActionSection = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
`

const Input = styled.input`
	width: 360px;
	padding: 8px 10px;
	font-size: 17px;
	box-sizing: border-box;
    transition: all 100ms;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
	margin-bottom: 5px;

	&:hover {
		outline: none;
		border-color: hsl(0, 0%, 70%);
	}

	&:focus {
		outline: none;
		border: 1px solid #2684ff;
		box-shadow: 0 0 0 1px #2684ff;
	}
`

const Label = styled.div`
	font-weight: bold;
	margin: 10px 0;
`

const Error = styled.div`
	font-size: 12px;
	color: #db3c3c;
`

const SelectContainer = styled.div`
	width: 280px;
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
	height: 50px;
	align-self: end;
`

const ConvertedSection = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 30px 30px 30px;
	align-items: flex-end;
`

const ConvertedAmount = styled.div`
	display: flex;
	flex-direction: column;
`

const Amount = styled.div`
	font-size: 40px;
	font-weight: bold;
	color: #2e3c57;
`
const AmountDescription = styled.div`
	font-size: 20px;
	color: #2e3c57;
`

const Source = styled.div`
	font-size: 12px;
`

const Link = styled.a`
	font-weight: bold;
	color: black;

	&:visited {
		color: #2684ff !important;
	}
`

type Props = {
	exchangeRatesMap: ExchangeRatesMapT
}

export const Converter = ({ exchangeRatesMap }: Props) => {
	const [inputAmount, setInputAmount] = React.useState<string>()
	const [inputError, setInputError] = React.useState<string>('')
	const [selectedCurrencyFrom, setSelectedCurrencyFrom] = React.useState<string>('CZK')
	const [selectedCurrencyTo, setSelectedCurrencyTo] = React.useState<string>('CZK')

	const [convertedAmount, setConvertedAmount] = React.useState<string>()
	const [convertedDescription, setConvertedDescription] = React.useState<string>()
	const [conversionError, setConversionError] = React.useState('')

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (inputError) setInputError('')
		const target = event.target as HTMLInputElement
		if (isNaN(Number(target?.value))) {
			setInputError('Please enter a valid amount')
		}
		setInputAmount(target?.value)
	}

	const convert = () => {
		if (conversionError) setConversionError('')

		const amount = (Number(inputAmount))
		const currencyFrom = exchangeRatesMap[selectedCurrencyFrom]
		const currencyTo = exchangeRatesMap[selectedCurrencyTo]

		let converted = 0
		if (currencyFrom.code === 'CZK') {
			converted = exchangeFromCZK(amount, currencyTo.rate, currencyTo.amount)
		} else if (currencyTo.code === 'CZK') {
			converted = exchangeToCZK(amount, currencyFrom.rate, currencyFrom.amount)
		} else {
			setConversionError('Only conversions from or to CZK are supported.')
		}
		setConvertedDescription(`${separateThousands(amount)} ${selectedCurrencyFrom} =`)
		setConvertedAmount(`${separateThousands(converted)} ${selectedCurrencyTo}`)
	}


	const exchangeRateOptions = useMemo(
		() =>
			Object.keys(exchangeRatesMap).map((code) => {
				return {
					value: code,
					label: `${exchangeRatesMap[code].code} | ${exchangeRatesMap[code].country}`,
				}
			}),
		[exchangeRatesMap, selectedCurrencyFrom]
	)

	const onSelectInputChange = (
		selectId: string,
		newValue: SingleValue<{ value: string; label: string }>
	) => {
		if (newValue?.value) {
			if (selectId === 'from') setSelectedCurrencyFrom(newValue?.value)
			if (selectId === 'to') setSelectedCurrencyTo(newValue?.value)
		}
	}

	return (
		<Container>
			<ActionPanel>
				<ActionSection>
					<Label>Amount</Label>
					<Input placeholder="0" value={inputAmount} onChange={onChange} />
					{inputError && <Error>{inputError}</Error>}
				</ActionSection>
				<ActionSection>
					<Label>From</Label>
					<SelectContainer>
						<Select
							defaultValue={exchangeRatesMap[0] as any}
							onChange={(value: any) => onSelectInputChange('from', value)}
							options={exchangeRateOptions as any}
						/>
					</SelectContainer>
				</ActionSection>

				<ActionSection>
					<Label>To</Label>
					<SelectContainer>
						<Select
							onChange={(newValue: any) => onSelectInputChange('to', newValue)}
							options={exchangeRateOptions as any}
						/>
					</SelectContainer>
				</ActionSection>
			</ActionPanel>
			<ConvertedSection>
				<ConvertedAmount>
					<AmountDescription>{convertedDescription}</AmountDescription>
					<Amount>{convertedAmount}</Amount>
					{conversionError ?
						<Error>{conversionError}</Error> :
						<Source>
							Exchange rates are provided by{' '}
							<Link target='_blank' href='https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/'>Czech National Bank</Link>
						</Source>
					}
				</ConvertedAmount>
				<ConvertButton onClick={() => !inputError && convert()}>
					Convert
				</ConvertButton>
			</ConvertedSection>
		</Container>
	)
}
