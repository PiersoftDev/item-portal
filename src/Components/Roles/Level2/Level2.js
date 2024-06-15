import React from 'react'
import styled from 'styled-components'

import Level2DashBoard from './Level2Dashboard'
import Level2ItemList from './Level2ItemList'

const Level2 = () => {
  return (
    <Wrapper>
      <Container>
        <Level2DashBoard />
        <Level2ItemList />
      </Container>
    </Wrapper>
  )
}

export default Level2

const Wrapper = styled.div``

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 1rem;
  transition: all 0.5s ease-in-out;
`
