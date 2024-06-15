import React from 'react'
import styled from 'styled-components'
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  LikeOutlined,
  DislikeOutlined,
  HourglassOutlined,
} from '@ant-design/icons'
import { Modal } from 'antd'

import { useStates } from '../../../utils/StateProvider'
import Level1Status from './Level1Status'

const Level1DashBoard = () => {
  const { setActiveTab, itemStatusOpen, setItemStatusOpen } = useStates()
  const StatusBoxClick = (tab) => {
    setItemStatusOpen(true)
    setActiveTab(tab)
  }
  const StatusBoxClose = () => {
    setItemStatusOpen(false)
  }

  const Items = [
    {
      title: 'Pending For Approval',
      icon: <ExclamationCircleOutlined />,
      count: 8,
      tab: 'pendingforapprovals',
      color: 'linear-gradient(135deg, #BFCFE7 10%, #B0BCBC 60%, #8E9D9D 30%)',
    },
    {
      title: 'Approved',
      icon: <LikeOutlined />,
      count: 122,
      tab: 'approved',
      color: 'linear-gradient(135deg, #92BA92 10%, #BECC9B 60%, #9EAB7B 30%)',
    },
    {
      title: 'My Rejections',
      icon: <DislikeOutlined />,
      count: 14,
      tab: 'rejections',
      color: 'linear-gradient(135deg, #FFDAC1 10%, #FFBA92 60%, #CB9CA4 30%)',
    },
    {
      title: 'Rejected at Level 2',
      icon: <DislikeOutlined />,
      count: 4,
      tab: 'rejectedatlevel2',
      color: 'linear-gradient(135deg, #FFDBC3 10%, #CB9CA4 60%, #FFBA92 30%)',
    },
  ]

  return (
    <>
      <CustomModal
        title='Item Status'
        open={itemStatusOpen}
        onCancel={StatusBoxClose}
        footer={false}
      >
        <Level1Status />
      </CustomModal>
      <Container>
        {Items.map((item, index) => (
          <BarBox
            key={index}
            type={item.title}
            onClick={() => StatusBoxClick(item.tab)}
            color={item.color}
          >
            <BoxIcon>{item.icon}</BoxIcon>
            <Count>{item.count}</Count>
            <BoxHeader>{item.title}</BoxHeader>
          </BarBox>
        ))}
      </Container>
    </>
  )
}

export default Level1DashBoard

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.6rem;
  gap: 10%;
  width: 95vw;
  min-width: 930px;
`

const BarBox = styled.div`
  position: relative;
  background: ${(props) => props.color};
  border-radius: 8px;
  width: 15%;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s ease-in-out, transform 0.2s ease,
    box-shadow 0.3s ease-in-out;
  padding: 0.8rem;
  box-sizing: border-box;
  display: flex;
  -webkit-backdrop-filter: blur(100px);
  flex-direction: column;
  box-shadow: 4px 4px 10px rgba(0.3, 0.3, 0.2, 0.4);
  &:hover {
    transform: scale(1.05);
    box-shadow: 4px 4px 10px rgba(0.3, 0.3, 0.2, 0.4);
  }
`

const BoxHeader = styled.div`
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.6px;
  margin-top: auto;
  opacity: 100%;
`

const Count = styled.div`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 900;
`

const BoxIcon = styled.div`
  font-size: 0.9rem;
  color: #fff;
  padding: 1px 2px;
  align-self: flex-end;
  margin: 0;
`
const CustomModal = styled(Modal)`
  display: flex;
  justify-content: center;
  .ant-modal-content {
    position: relative;
    border-radius: 10px;
    align-items: center;
    margin-top: -3rem;
    min-width: 1000px;
    max-width: 1400px;
    @media screen and (max-width: 668px) {
      margin-top: 0rem;
    }
  }

  .ant-modal-body {
    margin-top: 1.5rem;
    overflow: auto;
    &::-webkit-scrollbar {
      height: 0rem;
    }
  }
  .ant-modal-title {
    font-size: 1rem;
    letter-spacing: 1px;
    font-weight: 500;
    position: absolute;
    margin-top: -0.6rem;
    left: 2rem;
  }
`
