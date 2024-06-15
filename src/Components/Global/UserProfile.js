import React, { useEffect } from 'react'
import styled from 'styled-components'
import Photo from './ProfilePhoto.jpg'
import { useStates } from '../../utils/StateProvider'
import { IoIosMail } from 'react-icons/io'
import { FaMobileAlt, FaSearchLocation } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const { userDetails, setuserDeails } = useStates()
  const navigate = useNavigate()

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails')
    if (storedUserDetails) {
      const parsedUserDetails = JSON.parse(storedUserDetails)
      setuserDeails(parsedUserDetails)
    } else {
      console.log('User details not found in localStorage')
    }
  }, [])

  const logoutClick = async () => {
    try {
      if (userDetails.mobileNumber) {
        const res = await axios.get(
          `https://mdm.p360.build/v1/mdm/user/logoutUser/+91${userDetails.mobileNumber}`
        )
        navigate('/login')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('idToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userDetails')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
  return (
    <Wrapper>
      <ProfileContainer>
        <ProfilePhoto src={Photo} alt='Profile Photo' />
      </ProfileContainer>
      <UserTitle>
        <ProfileHeader>{userDetails.fullName}</ProfileHeader>
        <ProfileSubHeader>{userDetails.roles}</ProfileSubHeader>
      </UserTitle>
      <DetailesContainer>
        <InfoContent>
          <IoIosMail />
          <Value>{userDetails.email}</Value>
        </InfoContent>
        <InfoContent>
          <FaMobileAlt />
          <Value>{userDetails.mobileNumber}</Value>
        </InfoContent>
        {userDetails.projects && (
          <InfoContent>
            <FaSearchLocation />
            {userDetails.projects.map((project) => {
              return <Value>{project}</Value>
            })}
          </InfoContent>
        )}
      </DetailesContainer>
      <Button onClick={logoutClick}>Logout</Button>
    </Wrapper>
  )
}

export default UserProfile

const Wrapper = styled.div`
  position: relative;
  width: 17vw;
  min-width: 200px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
`
const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-bottom: 1.5px solid #ccc;
`

const ProfilePhoto = styled.img`
  width: 80px;
  height: 100%;
`

const UserTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const ProfileHeader = styled.div`
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  font-weight: 600;
  color: #333;
`

const ProfileSubHeader = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  color: #555;
`
const DetailesContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
`
const InfoContent = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: flex-start;
  align-items: center;
`
const Value = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  color: #444;
`
const Button = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  border: 1px solid #ef6262;
  padding: 0.1rem 0.6rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #ef6262;
  }
`
