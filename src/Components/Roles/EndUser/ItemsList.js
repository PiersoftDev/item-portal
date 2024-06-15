import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
// import NewRequest from './ItemRequest'
import useColumnSearch from '../../SubComponents/SearchComponent'
import { useStates } from '../../../utils/StateProvider'
import axios from 'axios'
import SimilarValues from '../../Global/SimilarValues'
import { BiSortAlt2 } from 'react-icons/bi'
import {
  IoFilterSharp,
  IoInformationCircleSharp,
  IoPersonCircleSharp,
} from 'react-icons/io5'
import { MdPlace } from 'react-icons/md'
import { FaPerson, FaPhone } from 'react-icons/fa6'
// import { GoDotFill } from 'react-icons/go'
import { RxCross2 } from 'react-icons/rx'
import NoDataFound from './NodataFound.png'
import { Modal, Popover, message } from 'antd'
// import CustomModal from '../../Global/CustomModal'
import Level1ItemRequest from '../Level1/Level1ItemRequest'
import Level2ItemRequest from '../Level2/Level2ItemRequest'
import Level3ItemRequest from './Level3ItemRequest'
import ErpItemRequest from './ErpItemRequest'
import LiveItemRequest from './LiveItemRequest'
import { FaCopy } from 'react-icons/fa6'
import ListFilterModel from './ListFilterModel'

const ItemsList = () => {
  const {
    endUserRequestList,
    setEndUserRequestList,
    similarItemsModal,
    setSimilarItemsModal,
    setSimilarItem,
    level1requestModal,
    setLevel1RequestModal,
    setLevel1PendingRequest,
    level1PendingRequest,
    level2requestModal,
    setLevel2RequestModal,
    level3requestModal,
    setLevel3RequestModal,
    erprequestModal,
    setErpRequestModal,
    setErrors,
    InitialErrors,
    liverequestModal,
    setLiveRequestModal,
    userDetails,
    itemListFilters,
    setuserDeails,
    itemListFilterModalopen,
    setItemListFilterModalopen,
  } = useStates()

  const CookiesData = () => {
    const accessToken = localStorage.getItem('accessToken')
    const Cookie = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    return Cookie
  }

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails')
    if (storedUserDetails) {
      const parsedUserDetails = JSON.parse(storedUserDetails)
      setuserDeails(parsedUserDetails)
    } else {
      console.log('User details not found in localStorage')
    }
  }, [])

  useEffect(() => {
    const fetchItem = async () => {
      const Cookie = CookiesData()
      const UserId = userDetails?.roles?.includes('L0') ? userDetails.id : ''
      const isAdmin = userDetails?.roles?.includes('Admin') ? true : false

      try {
        const res = await axios.post(
          'https://mdm.p360.build/v1/mdm/purchase-item/filter',
          {
            itemType: itemListFilters.itemType,
            status: itemListFilters.status,
            level: itemListFilters.level,
            searchTerm: itemListFilters.searchTerm,
            creatorId: UserId,
            pageNo: 0,
            pageSize: 100,
            isAdmin: isAdmin,
          },
          Cookie
        )
        setEndUserRequestList(res.data.data)
      } catch (err) {
        console.error('Error fetching items:', err)
      }
    }

    if (userDetails && userDetails.roles) {
      fetchItem()
    }
  }, [userDetails])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        message.success('Coppied')
        console.log('Copying to clipboard was successful!')
      },
      (err) => {
        console.error('Could not copy text: ', err)
      }
    )
  }

  // const SimilarItemModalOpen = (record) => {
  //   setSimilarItemsModal(!similarItemsModal)
  //   setSimilarItem(record)
  // }

  const Level1RequestModalOpen = (record) => {
    if (record.currentLevel === 'L1') {
      setLevel1RequestModal(!level1requestModal)
      setLevel1PendingRequest(record)
    } else if (record.currentLevel === 'L2') {
      setLevel2RequestModal(!level2requestModal)
      setLevel1PendingRequest(record)
    } else if (record.currentLevel === 'L3') {
      setLevel3RequestModal(!level3requestModal)
      setLevel1PendingRequest(record)
    } else if (record.currentLevel === 'L4') {
      setErpRequestModal(!erprequestModal)
      setLevel1PendingRequest(record)
    } else if (record.currentLevel === 'Live') {
      setLiveRequestModal(!liverequestModal)
      setLevel1PendingRequest(record)
    }
  }

  const CancelRequest = () => {
    setLevel1RequestModal(false)
    setLevel1PendingRequest({})
    setErrors(InitialErrors)
  }
  const Level2ModalCancelRequest = () => {
    setLevel2RequestModal(false)
    setLevel1PendingRequest({})
    setErrors(InitialErrors)
  }
  const Level3ModalCancelRequest = () => {
    setLevel3RequestModal(false)
    setLevel1PendingRequest({})
    setErrors(InitialErrors)
  }
  const ErpModalCancelRequest = () => {
    setErpRequestModal(false)
    setLevel1PendingRequest({})
    setErrors(InitialErrors)
  }
  const LiveModalCancelRequest = () => {
    setLiveRequestModal(false)
    setLevel1PendingRequest({})
    setErrors(InitialErrors)
  }

  //   // {
  //   //   title: 'Verification',
  //   //   fixed: 'right',
  //   //   render: (_, record) =>
  //   //     record.id ? (
  //   //       <Button
  //   //         onClick={() => {
  //   //           SimilarItemModalOpen(record)
  //   //         }}
  //   //       >
  //   //         Fetch Similar
  //   //       </Button>
  //   //     ) : null,
  //   // },
  // ]

  const ProfileContent = (record) => {
    return (
      <Container>
        <InfoRow>
          <Icon>
            <MdPlace />
          </Icon>
          <Text>{record.site}</Text>
        </InfoRow>
        <InfoRow>
          <Icon>
            <FaPerson />
          </Icon>
          <Text>{record.requester}</Text>
        </InfoRow>
        <InfoRow>
          <Icon>
            <FaPhone />
          </Icon>
          <Text>{record.phoneNumber}</Text>
        </InfoRow>
      </Container>
    )
  }

  const InfoContent = (record) => {
    return (
      <Container>
        <InfoRow>
          <Label>Product Type :</Label>
          <Text>{record.productType}</Text>
        </InfoRow>
        <InfoRow>
          <Label>Product Class :</Label>
          <Text>{record.productClass}</Text>
        </InfoRow>
        <InfoRow>
          <Label>Product Line :</Label>
          <Text>{record.productLine}</Text>
        </InfoRow>
        <InfoRow>
          <Label>Specification :</Label>
          <Text>{record.specifications}</Text>
        </InfoRow>
      </Container>
    )
  }

  const handleOpenChange = (newOpen) => {
    setItemListFilterModalopen(newOpen)
  }

  return (
    <>
      <Wrapper>
        <BodyContainer>
          <Top>
            <TopContainer>
              <Title>
                Items List (
                <Count>Total Records : {endUserRequestList.length}</Count>)
              </Title>
              <TopRightContainer>
                {/* <Button>Progress Type : End User</Button> */}
                {/* <Button>
                  <BiSortAlt2 />
                  Sort
                </Button> */}
                <Popover
                  open={itemListFilterModalopen}
                  onOpenChange={handleOpenChange}
                  content={ListFilterModel}
                  placement='leftTop'
                  trigger='click'
                >
                  <Button>
                    <IoFilterSharp />
                    Filters
                  </Button>
                </Popover>
              </TopRightContainer>
            </TopContainer>
            {itemListFilters.itemType || itemListFilters.level}
            {itemListFilters.status ? (
              <MiddleContainer>
                {itemListFilters.itemType && (
                  <Tag>
                    <div className='text'>
                      Item Type : {itemListFilters.itemType}
                    </div>
                    <RxCross2 className='icon' />
                  </Tag>
                )}
                {itemListFilters.level && (
                  <Tag>
                    <div className='text'>
                      Progress : {itemListFilters.level}
                    </div>
                    <RxCross2 className='icon' />
                  </Tag>
                )}
                {itemListFilters.status && (
                  <Tag>
                    <div className='text'>
                      Status : {itemListFilters.status}
                    </div>
                    <RxCross2 className='icon' />
                  </Tag>
                )}
              </MiddleContainer>
            ) : (
              ''
            )}
          </Top>
          <TableContainer>
            <Table>
              <thead>
                <TableRow className='header'>
                  <th>Requirement Description</th>
                  <th>External Id</th>
                  <th>Item Group</th>
                  <th>Detailed Description</th>
                  <th>Unit</th>
                  <th className='task-progress'>Task Progress</th>
                  <th className='status'>Status</th>
                </TableRow>
              </thead>
              <tbody>
                {endUserRequestList.length > 0 ? (
                  endUserRequestList.map((record) => (
                    <TableRow
                      key={record.id}
                      onClick={() => Level1RequestModalOpen(record)}
                    >
                      {/* {columns.map((data) => (
                      <>
                        {data.dataIndex === 'itemDescription' && (
                          <td key={data.dataIndex}>
                            <IoInformationCircleSharp />
                            {record[data.itemDescription]}
                          </td>
                        )}
                        <td key={data.dataIndex}>{record[data.dataIndex]}</td>
                      </>
                    ))} */}
                      <td key={record.requirementDesc}>
                        <DataContainer>
                          <Popover
                            content={ProfileContent(record)}
                            placement='right'
                            title='Contact Information'
                          >
                            <PersonIcon />
                          </Popover>
                          <DataValue title={record.requirementDesc}>
                            {record.requirementDesc}
                          </DataValue>
                        </DataContainer>
                      </td>
                      <td key={record.extId}>
                        <DataContainer>
                          {record.extId && (
                            <FaCopy
                              onClick={() => {
                                if (record.extId) {
                                  copyToClipboard(record.extId)
                                }
                              }}
                            />
                          )}
                          <DataValue title={record.extId}>
                            {record.extId}
                          </DataValue>
                        </DataContainer>
                      </td>
                      <td key={record.itemGroup}>{record.itemGroup}</td>
                      <td key={record.detailedDescription}>
                        <DataContainer>
                          <Popover
                            content={InfoContent(record)}
                            placement='right'
                            title='Item Information'
                          >
                            <InfoIcon />
                          </Popover>
                          <DataValue
                            title={record.detailedDescription}
                            onClick={() => {
                              if (record.detailedDescription) {
                                copyToClipboard(record.detailedDescription)
                              }
                            }}
                          >
                            {record.detailedDescription}
                          </DataValue>
                        </DataContainer>
                      </td>

                      <td key={record.uom}>{record.uom}</td>
                      <td className='task-progress'>
                        <ProgressBarContainer>
                          <ProgressBar
                            title='Level 0'
                            active={record.currentLevel === 'L0'}
                            live={record.currentLevel === 'Live'}
                          />
                          <ProgressBar
                            title='Level 1'
                            live={record.currentLevel === 'Live'}
                            active={record.currentLevel === 'L1'}
                          />
                          <ProgressBar
                            title='Level 2'
                            live={record.currentLevel === 'Live'}
                            active={record.currentLevel === 'L2'}
                          />
                          <ProgressBar
                            title='Level 3'
                            live={record.currentLevel === 'Live'}
                            active={record.currentLevel === 'L3'}
                          />
                          <ProgressBar
                            title='Live'
                            live={record.currentLevel === 'Live'}
                            active={record.currentLevel === 'L4'}
                          />
                        </ProgressBarContainer>
                      </td>
                      <td className='status'>
                        <StatusBox
                          initiated={record.status === 'Initiated'}
                          rejected={record.status === 'Rejected'}
                          draft={record.status === 'Draft'}
                          live={
                            record.status === 'Live' ||
                            record.status === 'Accepted'
                          }
                        >
                          {/* <DotIcon /> */}
                          {record.status}
                        </StatusBox>
                      </td>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <DataNotFound>
                      <img src={NoDataFound} alt='No Data Found' />
                    </DataNotFound>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </BodyContainer>

        <SimilarValues />
      </Wrapper>
      <ItemRequestCustomModal
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>First Level Approval</span>
            <CloseIcon onClick={CancelRequest}>
              <RxCross2 />
            </CloseIcon>
          </div>
        }
        // title='First Level Approval'
        open={level1requestModal}
        closable={false}
        footer={false}
        // width='80vw'
        // height='80vh'
      >
        <Level1ItemRequest />
      </ItemRequestCustomModal>
      <ItemRequestCustomModal
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Second Level Approval</span>
            <CloseIcon onClick={Level2ModalCancelRequest}>
              <RxCross2 />
            </CloseIcon>
          </div>
        }
        // title='First Level Approval'
        open={level2requestModal}
        closable={false}
        footer={false}
        // width='80vw'
        // height='80vh'
      >
        <Level2ItemRequest />
      </ItemRequestCustomModal>
      <ItemRequestCustomModal
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Third Level Approval</span>
            <CloseIcon onClick={Level3ModalCancelRequest}>
              <RxCross2 />
            </CloseIcon>
          </div>
        }
        // title='First Level Approval'
        open={level3requestModal}
        closable={false}
        footer={false}
        // width='80vw'
        // height='80vh'
      >
        <Level3ItemRequest />
      </ItemRequestCustomModal>
      <ItemRequestCustomModal
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Final Approval</span>
            <CloseIcon onClick={ErpModalCancelRequest}>
              <RxCross2 />
            </CloseIcon>
          </div>
        }
        // title='First Level Approval'
        open={erprequestModal}
        closable={false}
        footer={false}
        // width='80vw'
        // height='80vh'
      >
        <ErpItemRequest />
      </ItemRequestCustomModal>
      <ItemRequestCustomModal
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Live Item ( {level1PendingRequest.extId} )</span>
            <CloseIcon onClick={LiveModalCancelRequest}>
              <RxCross2 />
            </CloseIcon>
          </div>
        }
        // title='First Level Approval'
        open={liverequestModal}
        closable={false}
        footer={false}
        // width='80vw'
        // height='80vh'
      >
        <LiveItemRequest />
      </ItemRequestCustomModal>
    </>
  )
}

export default ItemsList

const Wrapper = styled.div`
  margin: 0.6rem 0 0 0;
  height: 72%;
  display: flex;
  flex-direction: column;
  font-family: verdana;
  align-items: center;
  background: #f5fafc;
  border-radius: 10px;
  padding: 0 1rem 1rem 0rem;
  position: relative;
  overflow: hidden;
  .ant-select {
    width: 20vw;
  }

  .custom-table {
    .ant-table {
      border-radius: 1rem;
      overflow-x: auto;
      height: 100%;
      width: 99%;
      min-width: 1110px;
      max-height: 57vh;
      @media screen and (min-height: 698px) {
        max-height: 70vh;
        min-width: 1250px;
      }
    }

    .ant-table-container {
      .ant-table-body {
        &::-webkit-scrollbar {
          width: 0.2rem;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #9dacbd;
          border-radius: 4px;
          cursor: pointer;
        }

        &::-webkit-scrollbar-track {
          background-color: #e6f3f8;
          border-radius: 5px;
        }
      }
    }

    .ant-table-thead th {
      font-size: 0.7rem;
      font-weight: 600;
      font-family: 'Roboto', sans-serif;
      padding: 0.4rem;
      text-align: center;
      white-space: nowrap;
      color: #3b4040;
      letter-spacing: 0.5px;
      position: sticky;
      // background: #9dacbd;
      width: auto !important;
      top: 0;
      text-indent: 0.5rem;
      z-index: 1;
    }
    .ant-table-tbody td {
      font-size: 0.8rem;
      font-weight: 400;
      font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
        Helvetica, Arial, sans-serif;
      padding: 0.5rem;
      width: auto !important;
      min-width: 15vw;
      white-space: nowrap;
      color: #3c3836;
      cursor: pointer;
      text-align: center;
      z-index: 0;
      // text-indent: -0.8rem;
    }

    .ant-table-tbody tr:hover {
      background: #f2f4f5;
      opacity: 100%;
    }
  }
`
const BodyContainer = styled.div`
  position: relative;
  padding: 1rem 0;
  margin-right: 0.6rem;
  width: 97%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  // border: 1.2px solid #ccc;
  border-radius: 5px;
`

const Top = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: 10%;
  // min-height: 80px;
  max-height: 90px;
  border: 1.2px solid #ccc;
  border-radius: 5px;
  // height: 12vh;
`

const TopContainer = styled.div`
  position: relative;
  width: 100%;
  // border: 1.2px solid #ccc;
  padding: 0.6rem 1rem;
  margin: 0 0.2rem;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60%;
`

const Title = styled.div`
  font-size: 0.9rem;
  letter-spacing: 1px;
  font-weight: 600;
  font-family: verdana;
  color: #1f2544;
`
const TopRightContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const MiddleContainer = styled.div`
  position: relative;
  width: 100%;
  // border: 1.2px solid #ccc;
  padding: 0.7rem 0.7rem;
  margin: 0 0.2rem;
  border-radius: 5px;
  display: flex;
  gap: 0.6rem;
  justify-content: flex-start;
  align-items: center;
  height: 30%;
`

const TableContainer = styled.div`
  position: relative;
  width: 100% !important;
  max-height: 65vh;
  min-height: 300px !important;
  overflow: auto;
  padding: 0 0rem;
`

const Table = styled.table`
  position: relative;
  width: 100% !important;
  border-radius: 10px;
  background-color: #fff;
  // box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  display: table;
  border-collapse: collapse;
  padding: 0.1rem 0;
  .header {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #fff !important;
  }
`
const TableRow = styled.tr`
  position: relative;
  width: 100%;
  display: table-row;
  padding: 0.1rem 0;
  z-index: 1;
  border-radius: 5px;
  transition: all 0.3 ease-in-out;
  cursor: pointer;
  // box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  th {
    font-size: 0.7rem;
    letter-spacing: 0.5px;
    padding: 0.5rem 1rem;
    text-align: start;
    white-space: nowrap;
    min-width: 140px;
    width: 100%;
    color: #1f2544;
    margin-top: -0.2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-weight: 600;
    &:first-child {
      max-width: 300px !important;
    }
    &:nth-child(3) {
      max-width: 300px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  td {
    font-size: 0.7rem;
    letter-spacing: 0.2px;
    padding: 0.5rem 1rem;
    text-align: start;
    min-width: 140px;
    // max-width: 300px;
    width: 100%;
    color: #1f2544;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    title: ${(props) => props.children};
    &:first-child {
      max-width: 300px !important;
    }
    &:nth-child(3) {
      max-width: 300px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .task-progress {
    width: 120px !important;
    // transform: translate(40%, 0);
  }
  .status {
    width: 140px !important;
    display: flex;
    justify-content: center;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`
const Button = styled.button`
  border: 1.2px solid #ccc;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.3rem 0.7rem;
  font-size: 0.7rem;
  letter-spacing: 0.3px;
  font-weight: 600;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
    Helvetica, Arial, sans-serif;
  // padding: 0.5rem;
  width: auto;
  opacity: 90%;
  transition: all 0.3s ease-in-out;
  &:hover {
    // background: #92c7cf;
    opacity: 100%;
  }
`

const StatusBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.1rem;
  width: 70px;
  padding: 0.2rem 0.6rem;
  border: ${(props) =>
    props.initiated
      ? '1px solid #3333ff'
      : props.rejected
      ? '1px solid #ff0000'
      : props.live
      ? '1px solid #00ff00'
      : props.draft
      ? '1px solid #FEB941'
      : ''};
  // border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.65rem;
  letter-spacing: 0.5px;
  background: ${(props) =>
    props.initiated
      ? '#e5e5ff'
      : props.rejected
      ? '#ffb2b2'
      : props.live
      ? '#ddeddd'
      : props.draft
      ? '#FFEBB2'
      : ''};
  color: ${(props) =>
    props.initiated
      ? '#3333ff'
      : props.rejected
      ? '#ff0000'
      : props.live
      ? 'green'
      : props.draft
      ? '#b09304'
      : ''};
`
const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.1rem;
  width: 100px;
  background: transparent;
`
const ProgressBar = styled.div`
  height: 10px;
  width: 20%;
  background: ${(props) =>
    props.active ? '#3333ff' : props.live ? '#91C483' : '#cacae3'};
  border-right: 0.2px solid #ccc;
  border-radius: 4px;
`

const DataNotFound = styled.div`
  position: absolute;
  padding: 1rem;
  left: 40%;
  top: 0;
  font-size: 0.8rem;
  letter-spacing: 0.8px;
  display: flex;
  img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
`
const DataContainer = styled.div`
  display: flex;
  // justify-content: center;
  align-items: center;
  gap: 0.3rem;
`

const DataValue = styled.div`
  position: relative;
  max-width: 250px;
  width: 90%;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const PersonIcon = styled(IoPersonCircleSharp)`
  font-size: 13px;
  color: #596bb3;
`
const InfoIcon = styled(IoInformationCircleSharp)`
  font-size: 13px;
  color: #596bb3;
`

//Popover Contain

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Icon = styled.div`
  color: #555;
  font-size: 0.8rem;
`
const Label = styled.div`
  color: #555;
  font-size: 0.7em;
  letter-spacing: 0.5px;
`

const Text = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.8px;
  color: #333;
`
const Tag = styled.div`
  border: 1.2px solid #ccc;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.3rem 0.7rem;
  font-size: 0.7rem;
  letter-spacing: 0.3px;
  font-weight: 600;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
    Helvetica, Arial, sans-serif;
  // padding: 0.5rem;
  width: auto;
  opacity: 90%;
  transition: all 0.3s ease-in-out;
  .text {
    font-size: 0.6rem;
    letter-spacing: 0.4px;
  }
  .icon {
    font-size: 0.7rem;
    color: #999;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: #333;
    }
  }
`

const ItemRequestCustomModal = styled(Modal)`
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
    position: relative;
    height: 75vh;
    overflow: hidden;
    &::-webkit-scrollbar {
      width: 0rem;
    }
  }
`

const CloseIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #333;
  }
`

const Count = styled.span`
  font-size: 0.6rem;
  letter-spacing: 0.5px;
  color: #333;
`
