import React from 'react'
import styled from 'styled-components'

import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStates } from '../utils/StateProvider'
import TopBar from './Global/TopBar'
import EndUser from './Roles/EndUser/EndUser'

const SharedLayout = () => {
  // const { userRole } = useStates()
  const navigate = useNavigate()
  // const renderDashboardSection = () => {
  //   switch (userRole) {
  //     case 'End User':
  //       return <Navigate to='end-user' />
  //     case 'Manager':
  //       return <Navigate to='level-1' />
  //     case 'Tax Department':
  //       return <Navigate to='level-2' />
  //     case 'ERP':
  //       return <Navigate to='erp' />
  //     default:
  //       return <Navigate to='/login' />
  //   }
  // }

  const idToken = localStorage.getItem('idToken')
  if (!idToken) {
    navigate('/login')
  }

  return (
    <Wrapper>
      <TopBar />
      <Container>
        <EndUser />
      </Container>
      {/* <Outlet /> */}
    </Wrapper>
  )
}

export default SharedLayout

const Wrapper = styled.div`
  background: #f5fafc;
  overflow: hidden;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  position: relative;
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
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
