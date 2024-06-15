import React from 'react'
import styled from 'styled-components'

const Logo = () => {
  return (
    <Styles>
      <Title>PORTAL 360</Title>
      <SubTitle>ITEM MASTERS MANAGEMENT</SubTitle>
    </Styles>
  )
}

export default Logo

const Styles = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  color: #34495e;
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0;
`

const SubTitle = styled.div`
  color: #666;
  font-family: 'Roboto', sans-serif;
  font-size: 0.6rem;
  text-align: center;
  letter-spaing: 1px;
  word-spacing: 2px;
  font-weight: 500;
`
