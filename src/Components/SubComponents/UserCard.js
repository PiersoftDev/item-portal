import React from 'react'
import styled from 'styled-components'
import { useStates } from '../../utils/StateProvider'
import { useNavigate } from 'react-router-dom'

const UserCard = () => {
  const { userDetails } = useStates()
  const navigate = useNavigate()

  const Logout = () => {
    navigate('/login')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('refreshToken')
  }
  return (
    <Styles>
      <UserForm>
        <Container>
          <label>First Name</label>
          <input
            value={userDetails.firstName}
            type='text'
            placeholder='Enter First Name'
          />
        </Container>
        <Container>
          <label>Last Name</label>
          <input
            value={userDetails.lastName}
            type='text'
            placeholder='Enter Last Name'
          />
        </Container>
        <Container>
          <label>User ID</label>
          <input type='text' placeholder='Enter User ID' />
        </Container>
        <Container>
          <label>Email ID</label>
          <input
            value={userDetails.email}
            type='mail'
            placeholder='Enter Mail ID'
          />
        </Container>
        <Container>
          <label>Department</label>
          <input type='text' placeholder='Enter Department' />
        </Container>
        <Container>
          <label>Role</label>
          <input type='text' placeholder='Enter Role' />
        </Container>
        <Container>
          <label>Phone Number</label>
          <input
            value={userDetails.phoneNumber}
            type='phone'
            placeholder='Enter Phone Number'
          />
        </Container>
      </UserForm>
      <Button onClick={Logout}>Logout</Button>
    </Styles>
  )
}

export default UserCard

const Styles = styled.div`
  padding: 1rem 2rem;
`
const UserForm = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 45%);
  grid-column-gap: 1rem;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 0.1rem;
    margin-left: 0.5rem;
    color: #49619f;
    font-family: 'Open Sans Hebrew', sans-serif;
    font-size: 0.7rem;
  }

  input {
    border-radius: 0.625rem;
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 0.5rem;
    margin-bottom: 0.6rem;
    font-size: 0.8rem;
    &:focus {
      outline: none;
    }
  }
`
const Button = styled.button`
  font-family: 'Open Sans', sans-serif;
  font-size: 0.8rem;
  border-radius: 0.625rem;
  background: #e72929;
  color: #fff;
  margin-top: 0.6rem;
  width: 95%;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`
