import React from 'react'
import styled from 'styled-components'
import KMVLogo from '../Images/KMV Group logo.jpg'
import PortalLogo from '../Images/Item-Portal.png'
import LoginForm from '../Components/Login/LoginForm'
// import Draggable from 'react-draggable'

// import { message } from 'antd'

const Login = () => {
  return (
    <Styles>
      {/* <BackgroundVideoContainer>
        <video autoPlay loop muted>
          <source src={BackgroundVideo} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </BackgroundVideoContainer> */}
      <a href='https://www.kmvgroup.com/'>
        <KMVGroup
          src={KMVLogo}
          alt='KMV Groups'
          href='https://www.kmvgroup.com/'
          target='_blank'
        />
      </a>
      {/* <Draggable bounds='parent' defaultClassName='drag'> */}
        <LoginBox>
          {/* <Title>PORTAL 360</Title> */}
          <SubTitleContainer>
            <Line />
            <PortalTitle src={PortalLogo} />
            {/* <SubTitle>ITEM MASTERS MANAGEMENT</SubTitle> */}
            <Line />
          </SubTitleContainer>
          <LoginView>
            <LoginForm />
          </LoginView>
        </LoginBox>
      {/* </Draggable> */}
    </Styles>
  )
}

export default Login

const Styles = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    270deg,
    rgba(244, 198, 252, 0.67),
    rgba(82, 114, 237, 0.82)
  );
`

const KMVGroup = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: clamp(4rem, 1rem, 5vh);
  height: clamp(4rem, 1rem, 5vh);
  cursor: pointer;
  border-radius: 5px;
  @media only screen and (max-width: 400px) {
    width: clamp(2rem, 1rem, 3vh);
    height: clamp(2rem, 1rem, 3vh);
  }
`

const PortalTitle = styled.img`
  position: relative;
  width: 150px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 0.4rem;
`

const LoginBox = styled.div`
  padding: 1.5rem 0rem;
  margin: 1rem 10%;
  min-width: 350px;
  max-width: 350px;
  height: auto;
  border-radius: 1rem;
  background: #e6ebf1;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  transition: all 0.2s ease-in-out;
  @media only screen and (max-width: 400px) {
    min-width: 300px;
    max-width: 300px;
    padding: 1.5rem 0rem;
    margin: 1rem 10%;
  }
`


const SubTitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const Line = styled.div`
  flex: 1;
  height: 1.5px;
  background-color: #666;
  opacity: 30%;
`

const LoginView = styled.div`
  transition: all 0.5s ease-in-out;
  transform: translateY(0%);
`

// const Info = styled.div`
//   display: flex;
//   justify-content: space-between;
// `
// const ErrorText = styled.div`
//   color: red;
//   font-size: 0.6rem;
//   margin-right: 0.4rem;
//   letter-spacing: 0.5px;
//   text-wrap: nowrap;
// `

// const BackgroundVideoContainer = styled.div`
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   z-index: -1;

//   video {
//     object-fit: cover;
//     width: 100%;
//     height: 100%;
//   }
// `
