const express = require('express')
const axios = require('axios').default
const currencyService = require('./currency-service')

const app = express()

const RATES_URL =
	'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

app.get('/rates', async (_, res) => {
	const raw = await axios.get(RATES_URL)
	const rates = currencyService.parseRates(raw.data)
	res.send(rates)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening on ${PORT}`))
