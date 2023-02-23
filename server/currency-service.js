const { parse } = require('csv-parse/sync')

const parseRates = (raw) => {
	return parse(raw, {
		columns: raw
			.split('\n')[1]
			.split('|')
			.map((label) => label.toLowerCase()),
		skip_empty_lines: true,
		delimiter: '|',
		fromLine: 3,
	})
}

module.exports = {
	parseRates,
}
