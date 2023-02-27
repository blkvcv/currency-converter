export const exchangeFromCZK = (amount: number, rate: number, base: number): number => {
	return Number(((base * amount) / rate).toFixed(2))
}

export const exchangeToCZK = (amount: number, rate: number, base: number): number => {
	return Number(((amount * rate) / base).toFixed(2))
}

export const separateThousands = (x: number) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}