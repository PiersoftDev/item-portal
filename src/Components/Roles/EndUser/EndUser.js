import React from 'react'
import styled from 'styled-components'
import DashBoardSection from './UserDashBoardSection'
import ItemsList from './ItemsList'

const EndUser = () => {
  return (
    <Wrapper>
      <Container>
        {/* <DashBoardSection /> */}
        <ItemsList />
      </Container>
    </Wrapper>
  )
}

export default EndUser

const Wrapper = styled.div``

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 1rem;
  transition: all 0.5s ease-in-out;
`

// const DashBoard = styled.div`
//   // background-color: #fff;
//   border-radius: 10px;
//   // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
//   display: flex;
//   position: relative;
//   justify-content: center;
//   margin: 0 2rem 0.6rem 0rem;
// `
