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

export type OverviewT = {
	country: string
	currency: string
	rate: string
	code: string
}