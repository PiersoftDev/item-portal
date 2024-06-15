import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GiSmartphone } from 'react-icons/gi'
import { useStates } from '../../utils/StateProvider'
import OTPInput from 'react-otp-input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Spin, message } from 'antd'

const LoginForm = () => {
  const navigate = useNavigate()
  const {
    loginDetails,
    setLogingDetails,
    setUserRole,
    userRole,
    setuserDeails,
  } = useStates()
  const [otploading, setOtpLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const otpInputStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '33px',
    height: '33px',
    fontSize: '1rem',
    margin: '0 5px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    textAlign: 'center',
    outline: 'none',
    transition: 'border-color 0.2s ease-in-out',
    boxShadow:
      'rgb(204, 219, 232) 3px 3px 6px 0px inset,rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
    background: 'transparent',
    cursor: loginDetails.session ? 'text' : 'not-allowed',
  }

  useEffect(() => {
    const AccessToken = localStorage.getItem('accessToken')
    if (AccessToken) {
      navigate('/')
    }
  }, [])

  const RequestOTPClick = async () => {
    try {
      setOtpLoading(true)
      if (loginDetails.username.length === 10 && !otploading) {
        const res = await axios.post(
          `https://mdm.p360.build/v1/mdm/user/login/+91${loginDetails.username}`
        )
        setLogingDetails({ ...loginDetails, session: res.data.data })
        console.log(res)
        message.success(`OTP sent to ${loginDetails.username}`)
      }
    } catch (error) {
      console.log(error)
      message.error('Something went wrong')
    } finally {
      setOtpLoading(false)
    }
  }

  const LoginClick = async () => {
    if (userRole) {
      try {
        setLoading(true)
        if (loginDetails.confirmationCode && !loading) {
          const data = {
            ...loginDetails,
            username: `+91${loginDetails.username}`,
          }
          const res = await axios.post(
            'https://mdm.p360.build/v1/mdm/user/verify',
            data
          )
          console.log(res)
          setUserRole('End User')
          localStorage.setItem('userDetails', JSON.stringify(res.data.user))
          localStorage.setItem('idToken', res.data.idToken)
          localStorage.setItem('accessToken', res.data.accessToken)
          localStorage.setItem('refreshToken', res.data.refreshToken)

          navigate('/')
          setLogingDetails({
            username: '',
            confirmationCode: '',
            session: '',
          })
        }
      } catch (error) {
        console.log(error)
        message.error('Something went wrong')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <UserForm>
      <SubHeader>Welcome back,</SubHeader>
      {/* <Select
        value={userRole}
        onChange={(e) => {
          setUserRole(e.target.value)
        }}
      >
        <option value='' disabled selected hidden>
          Select Role
        </option>
        <option value='End User'>End User</option>
        <option value='Manager'>Manager</option>
        <option value='Tax Department'>Tax Department</option>
        <option value='ERP'>ERP</option>
      </Select> */}
      <InputContainer>
        <span>
          <GiSmartphone style={{ color: '#999' }} />
        </span>
        <input
          value={loginDetails.username}
          type='tel'
          className='input'
          onChange={(e) => {
            if (!isNaN(e.target.value) && e.target.value.length <= 10) {
              setLogingDetails({ ...loginDetails, username: e.target.value })
            }
          }}
          placeholder='Phone Number'
          autoComplete='off'
        />
        {loginDetails.username.length === 10 && (
          <button onClick={RequestOTPClick} disabled={otploading}>
            {otploading ? <Spin size='small' /> : ' Request OTP'}
          </button>
        )}
      </InputContainer>
      <OtpContainer>
        <Input
          value={loginDetails.confirmationCode}
          onChange={(value) => {
            if (loginDetails.session) {
              if (!isNaN(value) && value.length <= 6) {
                setLogingDetails({ ...loginDetails, confirmationCode: value })
              }
            }
          }}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              style={otpInputStyle}
              disabled={!loginDetails.session}
            />
          )}
        />
      </OtpContainer>
      <LoginButton onClick={LoginClick} disabled={!loginDetails.session}>
        {loading ? 'Loading....' : 'LOGIN'}
      </LoginButton>
    </UserForm>
  )
}

export default LoginForm

const UserForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem;
  margin-top: 1rem;
`

const SubHeader = styled.p`
  color: #232d3f;
  padding: 0 1rem;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen';
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  margin: 0 1rem 1rem 1rem;
  transition: all 0.3s ease-in-out;
  border: 1px solid #ccc;
  padding: 0.3rem 0.6rem;
  input {
    padding: 0.4rem 0.6rem;
    width: 100%;
    background: transparent;
    border: transparent;
    color: #444;
    font-weight: 600;
    letter-spacing: 1px;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #444;
      font-weight: 600;
    }
  }
  button {
    cursor: pointer;
    white-space: nowrap;
    margin-right: -0.5rem;
    letter-spacing: 0.6px;
    font-size: 0.6rem;
    font-weight: 600;
    padding: 0.5rem 0.6rem;
    color: #435585;
    background: transparent;
    border-radius: 5px;
    border: none;
    opacity: 70%;
    transition: all 0.3s ease-in-out;
    &:hover {
      opacity: 100%;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
`

const OtpContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`
const Input = styled(OTPInput)`
  flex-grow: 1 25px;
  &:disabled {
    cursor: not-allowed;
  }
`

const Select = styled.select`
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  margin: 0 1rem 1rem 1rem;
  transition: all 0.3s ease-in-out;
  border: 1px solid #ccc;
  padding: 0.6rem;
  width: 90%;
  background: transparent;
  border: transparent;
  color: #444;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 1px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #444;
    font-weight: 600;
  }
`

const LoginButton = styled.button`
  margin: 0rem 1rem;
  cursor: pointer;
  border: transparent;
  background: #6895d2;
  border-radius: 10px;
  padding: 0.6rem 0.6rem;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
  text-transform: capitalize;
  font-size: 0.9rem;
  letter-spacing: 2px;
  font-family: verdana, arial, sans-serif;
  color: #333;
  font-weight: 500;
  opacity: 100%;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #222;
    opacity: 80%;
  }
  &:disabled {
    cursor: not-allowed;
  }
`
