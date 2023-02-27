import React from 'react'
import styled from 'styled-components'

type Props = {
	country: string
	currency?: string
	rate: string
}

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid hsl(0, 0%, 80%);

	&:first-child {
		border-bottom: unset;
	}

	&:first-child:hover {
		color: white;
	}

	&:last-child {
		border-bottom: unset;
	}

	&:hover {
		font-weight: bold;
		color: #09283e;
	}
`

const Column = styled.div`
	display: flex;
	width: 200px;
	padding: 10px 0;
	justify-content: center;
`

export const Row = ({ country, currency, rate }: Props): JSX.Element => {
	return (
		<Container>
			<Column>{country}</Column>
			{currency && <Column>{currency}</Column>}
			<Column>{rate}</Column>
		</Container>
	)
}
