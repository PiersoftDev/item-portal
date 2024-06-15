import React from 'react'
import styled from 'styled-components'
import {
  // CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  LikeOutlined,
  DislikeOutlined,
  HourglassOutlined,
} from '@ant-design/icons'
import { Modal } from 'antd'
import ItemStatus from './ItemStatus'
import { useStates } from '../../../utils/StateProvider'

const DashBoardSection = () => {
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
      title: 'Level 1 Pendings',
      icon: <ExclamationCircleOutlined />,
      count: 12,
      tab: 'pendingLevel1',
    },
    {
      title: 'Level 2 Pendings',
      icon: <ClockCircleOutlined />,
      count: 8,
      tab: 'pendingLevel2',
    },
    {
      title: 'IS Pendings',
      icon: <HourglassOutlined />,
      count: 11,
      tab: 'pendingIS',
    },
    {
      title: 'Active Items',
      icon: <LikeOutlined />,
      count: 88,
      tab: 'liveItems',
    },
    {
      title: 'Rejected',
      icon: <DislikeOutlined />,
      count: 22,
      tab: 'rejected',
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
        <ItemStatus />
      </CustomModal>
      <Container>
        {Items.map((item, index) => (
          <BarBox
            key={index}
            type={item.title}
            onClick={() => StatusBoxClick(item.tab)}
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

export default DashBoardSection

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.6rem;
  gap: 2rem;
  width: 95vw;
  min-width: 930px;
`

const getGradientColors = (type) => {
  switch (type) {
    case 'Submitted':
      return 'linear-gradient(135deg, #647D87 10%,#9DCBC9 60%, #7FA7A4 30%)'
    case 'Level 1 Pendings':
      return 'linear-gradient(135deg, #BFCFE7 10%,#B0BCBC 60%, #8E9D9D 30%)'
    case 'Level 2 Pendings':
      return 'linear-gradient(135deg,  #FBECB2 10%,#E7C288 60%, #CFA666 30%)'
    case 'IS Pendings':
      return 'linear-gradient(135deg, #FCF5ED 10%, #BBB3CB 60%, #9D92A7 30%)'
    case 'Active Items':
      return 'linear-gradient(135deg, #92BA92 10%, #BECC9B 60%, #9EAB7B 30%)'
    case 'Rejected':
      return 'linear-gradient(135deg, #FFDBC3 10%, #CB9CA4 60%, #A97B82 30%)'
    default:
      return 'linear-gradient(135deg, #647D87 10%,#9DCBC9 60%, #7FA7A4 30%)'
  }
}

const BarBox = styled.div`
  position: relative;
  background: ${(props) => getGradientColors(props.type)};
  border-radius: 8px;
  width: 20%;
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
    opacity: 100%;
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
    background: #f5fafc;
    position: relative;
    border-radius: 10px;
    align-items: center;
    margin-top: -3rem;
    min-width: 1000px;
    max-width: 1400px;
    width: 100vw !important;
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
