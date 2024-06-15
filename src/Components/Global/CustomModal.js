import React from 'react'
import styled from 'styled-components'

const CustomModal = ({ open, width, height, children }) => {
  return (
    <Overlay open={open}>
      <ModalContainer open={open} width={width} height={height}>
        {children}
      </ModalContainer>
    </Overlay>
  )
}

export default CustomModal

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
`

const ModalContainer = styled.div`
  position: fixed;
  width: ${(props) => props.width || '70vw'};
  height: ${(props) => props.height || '70vh'};
  max-width: 900px;
  max-height: 80vh;
  // z-index: 1000000;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 1px 2px #e5e5ff;
  overflow: hidden;
  padding: 0.6rem;
  border-radius: 5px;
  opacity: ${(props) => (props.open ? 1 : 0)}
  transform: ${(props) =>
    props.open ? 'translate(0,0)' : 'translate(0,-150%)'};
  transition: all 0.1s ease-in-out;

  @media screen and (max-width: 768px) {
    width: 90vw;
  }
`
