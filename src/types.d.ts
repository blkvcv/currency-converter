export type ExchangeRateT = {
	country: string
	currency: string
	amount: number
	code: string
	rate: number
}

export type ExchangeRatesMapT = {
	[key: string]: ExchangeRateT
}