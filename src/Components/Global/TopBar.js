import React, { useState } from 'react'
import styled from 'styled-components'
import { BsPersonCircle, BsPower, BsPlus, BsList } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { Modal, Popover } from 'antd'
import UserCard from '../SubComponents/UserCard'
import NewRequest from '../PurchaseItem/ItemRequest'
import PortalLogo from './Item-Portal-Logo.png'
import { useStates } from '../../utils/StateProvider'
import ProductCombination from '../Roles/ERP/ProductCombination'
// import CustomModal from './CustomModal'
import { IoNotifications } from 'react-icons/io5'
import { FaUser, FaLink } from 'react-icons/fa'
import { BiSolidPurchaseTag } from 'react-icons/bi'
import { FaFileContract } from 'react-icons/fa6'
import UserCreationModal from './UserCreationModal'
import UserProfile from './UserProfile'

const TopBar = () => {
  const navigate = useNavigate()
  const {
    UserProfileOpen,
    setUserProfileOpen,
    endUserRequestOpen,
    setEndUserRequestOpen,
    userRole,
    productCombinationModal,
    setProductCombinationModal,
    createUserModal,
    setCreateUserModal,
    userDetails,
  } = useStates()

  const [endUserRequestModalOpen, setEndUserRequestModalOpen] = useState(false)
  const [clicked, setClicked] = useState(false)

  const hide = () => {
    setClicked(!clicked)
  }

  const handleOpenChange = (newOpen) => {
    setClicked(newOpen)
  }

  const CreateUserClick = () => {
    setCreateUserModal(!createUserModal)
    hide()
  }

  const RequestModalOpenClick = () => {
    setEndUserRequestModalOpen(!endUserRequestModalOpen)
  }

  const RequestButtonClick = () => {
    setEndUserRequestOpen(true)
    hide()
  }

  const UserProfileClick = () => {
    setUserProfileOpen(true)
  }

  const UserProfileClose = () => {
    setUserProfileOpen(false)
  }

  const ProductCombinationModalClick = () => {
    setProductCombinationModal(!productCombinationModal)
    hide()
  }

  const CreateContent = (record) => {
    return (
      <PopOverContainer>
        {userDetails.roles?.includes('Admin') && (
          <CreateButton onClick={CreateUserClick}>
            <FaUser size={8} />
            <Text>User</Text>
          </CreateButton>
        )}
        {userDetails.roles?.includes('Admin', 'L0') && (
          <CreateButton onClick={RequestButtonClick}>
            <BiSolidPurchaseTag size={10} />
            <Text>Purchase Item</Text>
          </CreateButton>
        )}
        {userDetails.roles?.includes('Admin', 'L0') && (
          <CreateButton>
            <FaFileContract size={10} />
            <Text>SubCon Item</Text>
          </CreateButton>
        )}
        {userDetails.roles?.includes('Admin', 'L4') && (
          <CreateButton onClick={ProductCombinationModalClick}>
            <FaLink size={10} />
            <Text>Item Clasification</Text>
          </CreateButton>
        )}
      </PopOverContainer>
    )
  }

  return (
    <>
      <Container>
        <LogoImg src={PortalLogo} alt='Portal Logo' />
        <RightHeader>
          {userDetails.roles?.includes('Admin', 'End User', 'ERP') && (
            <Popover
              content={CreateContent()}
              clicked
              open={clicked}
              onOpenChange={handleOpenChange}
              placement='leftTop'
              trigger='click'
            >
              <Button>
                <BsPlus size={15} />

                <div className='profileTitle'>Create</div>
              </Button>
            </Popover>
          )}

          {/* )} */}
          {/* <Button onClick={RequestModalOpenClick}>
            <StyledIcon>
              <BsPlus size={15} />
            </StyledIcon>
            <div className='profileTitle'>End User</div>
          </Button> */}
          <NotificationContainer>
            <div className='badge'>10</div>
            <NotificationIcon />
          </NotificationContainer>
          <Popover
            content={UserProfile()}
            clicked
            placement='leftTop'
            trigger='click'
          >
            <Button className='profile'>
              <ProfileIcon />
            </Button>
          </Popover>
        </RightHeader>
        <Modal
          style={{ minWidth: '400px' }}
          title='User Profile'
          open={UserProfileOpen}
          onCancel={UserProfileClose}
          footer={false}
        >
          <UserCard />
        </Modal>
        <ItemRequestCustomModal
          title='ITEM REQUEST'
          open={endUserRequestOpen}
          closable={false}
          footer={false}
        >
          <NewRequest />
        </ItemRequestCustomModal>
      </Container>
      <ProductCombinationCustomModal
        open={productCombinationModal}
        closable={false}
        footer={false}
      >
        <ProductCombination />
      </ProductCombinationCustomModal>
      <UserCreationModal />
    </>
  )
}

export default TopBar

const Container = styled.div`
  position: relative;
  width: 98vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin: 1rem;
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  gap: 0.2rem;
  width: auto;
  cursor: pointer;
  font-size: 0.8rem;
  color: #fff;
  padding: 0.4rem 0.7rem;
  border-radius: 5px;
  transition: all 0.3s;
  // background: #637a9f;
  background: #000;
  // box-shadow: 1px 1px 4px #999 inset;

  span {
    font-size: 0.9rem;
    letter-spacing: 0.4px;
    font-family: 'Roboto', sans-serif;
  }
`

const RightHeader = styled.div`
  position: relative;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  transition: all 1s ease-in-out;
  .profile {
    background: transparent;
    border: 1px solid #ccc;
    color: #000;
    border: 1.2px solid #ccc;
  }
  .profileTitle {
    font-size: 0.7rem;
    opacity: 90%;
    font-weight: 600;
    letter-spacing: 0.4px;
    font-family: 'Roboto', sans-serif;
  }
`

const ItemRequestCustomModal = styled(Modal)`
  position: relative;
  display: flex;
  justify-content: center;
  top: 6%;

  .ant-modal-content {
    padding: 1rem;
    min-width: 900px;
    max-width: 1000px;
    overflow: hidden;
    position: relative;
    @media screen and (max-width: 668px) {
      min-width: 600px;
    }
  }

  .ant-modal-title {
    font-size: 1.2rem;
    letter-spacing: 1px;
    word-spacing: 1px;
  }
  .ant-modal-body {
    max-height: 70vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #9dacbd;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: #e6f3f8;
      border-radius: 5px;
    }
  }
`

const ProductCombinationCustomModal = styled(Modal)`
  position: relative;
  display: flex;
  justify-content: center;
  top: 6%;

  .ant-modal-content {
    padding: 1rem;
    min-width: 900px;
    max-width: 1100px;
    width: 80vw;
    overflow: hidden;
    position: relative;
    @media screen and (max-width: 668px) {
      min-width: 600px;
    }
  }

  .ant-modal-title {
    font-size: 1.2rem;
    letter-spacing: 1px;
    word-spacing: 1px;
  }
  .ant-modal-body {
    overflow-y: hidden;

    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #9dacbd;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: #e6f3f8;
      border-radius: 5px;
    }
  }
`

const LogoImg = styled.img`
  height: 30px;
  width: auto;
  margin-right: 1rem;
`

const NotificationContainer = styled.div`
  border: 1.2px solid #ccc;
  border-radius: 5px;
  position: relative;
  // box-shadow: 1px 1px 4px #999;
  display: flex;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  .badge {
    position: absolute;
    top: 1px;
    right: 8px;
    font-size: 0.3rem;
    font-weight: bold;
    color: #fff;
    background: #ee4e4e;
    border-radius: 50%;
    padding: 0.15rem;
    box-shadow: 1px 1px 2px #999;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
  }
`

const NotificationIcon = styled(IoNotifications)`
  position: relative;
  font-size: 1.2rem;
  color: #444;
  z-index: 8;
`

const ProfileIcon = styled(BsPersonCircle)`
  position: relative;
  font-size: 1rem;
  color: #444;
`

const PopOverContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 2px;
  // border: 1px solid #ccc;
  border-radius: 5px;
  // background-color: #f9f9f9;
`

const Icon = styled.div`
  color: #555;
  font-size: 0.8rem;
`

const Text = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.8px;
  color: #333;
`

const CreateButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.8rem;
  letter-spacing: 0.8px;
  padding: 0.4rem 1rem;
  border: 1px solid #ccc;
  background: none;
  color: #374259 !important;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background: #ccc;
  }
`
