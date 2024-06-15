import React from 'react'
import styled from 'styled-components'
import Level1DashBoard from './Level1Dashboard'
import Level1ItemList from './Level1ItemList'

const Level1 = () => {
  return (
    <Wrapper>
      <Container>
        <Level1DashBoard />
        <Level1ItemList />
      </Container>
    </Wrapper>
  )
}

export default Level1

const Wrapper = styled.div``

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 1rem;
  transition: all 0.5s ease-in-out;
`
