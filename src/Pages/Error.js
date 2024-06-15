import { Checkbox } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Error = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <h1>Page Not Found</h1>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </Wrapper>
  )
}

export default Error

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5fafc;
  width: 100vw;
  height: 100vh;
  h1 {
    font-size: 3rem;
    color: #ccc;
    letter-spacing: 1px;
  }
  button {
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: #8ca6d1;
    transition: all 0.5s ease-in-out;
    letter-spacing: 0.5px;
    color: #ccc;
    opacity: 80%;
    &:hover {
      background: #6389c9;
      opacity: 100%;
    }
  }
`
