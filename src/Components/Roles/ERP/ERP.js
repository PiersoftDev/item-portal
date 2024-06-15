import React from 'react'
import styled from 'styled-components'
import ERPItemList from './ERPItemList'

const ERP = () => {
  return (
    <Wrapper>
      <Container>
        <ERPItemList />
      </Container>
    </Wrapper>
  )
}

export default ERP

const Wrapper = styled.div``

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  margin: 0 1rem;
  transition: all 0.5s ease-in-out;
`
