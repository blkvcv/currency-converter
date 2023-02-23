import React from 'react'
import styled from 'styled-components'

export const Converter = () => {
	const Container = styled.div`
		width: 600px;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		justify-self: end;
		align-self: center;
		height: 300px;
		padding: 10px;
		border-radius: 8px;
		box-shadow: 0px 5px 20px 1px #aaa;
		box-sizing: border-box;
	`

	return <Container />
}
