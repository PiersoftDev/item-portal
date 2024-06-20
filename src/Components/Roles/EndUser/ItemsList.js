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
import { MdPlace, MdOutlineRemoveRedEye } from 'react-icons/md'
import { FaPerson, FaPhone } from 'react-icons/fa6'
// import { GoDotFill } from 'react-icons/go'
import { RxCross2 } from 'react-icons/rx'
import NoDataFound from './NoData.gif'

import { Dropdown, Modal, Pagination, Popover, message } from 'antd'
// import CustomModal from '../../Global/CustomModal'

import Level1ItemRequest from '../Level1/Level1ItemRequest'
import Level2ItemRequest from '../Level2/Level2ItemRequest'
import Level3ItemRequest from './Level3ItemRequest'
import ErpItemRequest from './ErpItemRequest'
import LiveItemRequest from './LiveItemRequest'
import { FaCopy } from 'react-icons/fa6'
import ListFilterModel from './ListFilterModel'
import HistoryModal from './modals/HistoryModal'
import CommentsModal from './modals/CommentsModal'
import SimilarItemsModal from './modals/SimilarItemsModal'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaHistory, FaHourglassHalf, FaEye } from 'react-icons/fa'

import { HiTemplate } from 'react-icons/hi'

import { TbDatabase } from 'react-icons/tb'

import ProductLinkHierarchyModal from './modals/ProductLinkHierarchyModal'

import { TbHierarchy2 } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import Level0PendingRequest from '../Level1/Level0PendingRequest'
import Level0ItemRequest from '../Level1/Level0PendingRequest'
import { MdOpenInNew } from 'react-icons/md'

import { PiEyeglassesBold, PiGitBranchBold } from 'react-icons/pi'

const ItemsList = () => {
  const {
    testUrl,
    endUserRequestList,
    setEndUserRequestList,
    similarItemsModal,
    setSimilarItemsModal,
    setSimilarItem,
    level0requestModal,
    setLevel0RequestModal,
    level1requestModal,
    setLevel1RequestModal,
    setPendingRequest,
    PendingRequest,
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
    itemListLoading,
    setItemListLoading,
    itemListPage,
    setItemListPage,
    totalItemsCount,
    setTotalItemsCount,
  } = useStates()

  const navigate = useNavigate()

  const [openHistory, setOpenHistory] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const [openSimilarItems, setOpenSimilarItems] = useState(false)
  const [openProductLinkHierarchy, setOpenProductLinkHierarchy] =
    useState(false)

  const [selectedRecord, setSelectedRecord] = useState(null)

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

      const [level] = userDetails.roles

      try {
        setItemListLoading(true)
        const res = await axios.post(
          `${testUrl}/v1/mdm/purchase-item/filter`,
          {
            itemType: itemListFilters.itemType,
            status: itemListFilters.status,
            level: isAdmin ? '' : level,
            searchTerm: itemListFilters.searchTerm,
            creatorId: UserId,
            pageNo: itemListPage,
            pageSize: 20,
            isAdmin: isAdmin,
          },
          Cookie
        )
        setEndUserRequestList(res.data.data.content)
        setTotalItemsCount(res.data.data.totalElements)
      } catch (err) {
        console.log('Error fetching items:', err)
        if (
          err.message === 'Network Error' ||
          err.message === 'Request failed with status code 500'
        ) {
          // message.warning('Access Expired, please re-login')
          navigate('/login')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('idToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('userDetails')
        }
      } finally {
        setItemListLoading(false)
      }
    }

    if (userDetails && userDetails.roles) {
      fetchItem()
    }
  }, [userDetails, itemListPage])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        message.success('Copied')
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
    if (
      record.currentLevel === 'L0' &&
      userDetails.roles?.some((role) => ['Admin', 'L0'].includes(role))
    ) {
      setLevel0RequestModal(!level0requestModal)
      setPendingRequest(record)
    } else if (
      record.currentLevel === 'L1' &&
      userDetails.roles?.some((role) => ['Admin', 'L1'].includes(role))
    ) {
      setLevel1RequestModal(!level1requestModal)
      setPendingRequest(record)
    } else if (
      record.currentLevel === 'L2' &&
      userDetails.roles?.some((role) => ['Admin', 'L2'].includes(role))
    ) {
      setLevel2RequestModal(!level2requestModal)
      setPendingRequest(record)
    } else if (
      record.currentLevel === 'L3' &&
      userDetails.roles?.some((role) => ['Admin', 'L3'].includes(role))
    ) {
      setLevel3RequestModal(!level3requestModal)
      setPendingRequest(record)
    } else if (
      record.currentLevel === 'L4' &&
      userDetails.roles?.some((role) => ['Admin', 'L4'].includes(role))
    ) {
      setErpRequestModal(!erprequestModal)
      setPendingRequest({
        ...record,
        inheritProjectPeg: 'yes',
        currency: 'INR',
        purchasePriceGroupId: 'NA',
        purchasePriceGroup: 'Not Applicable',
        purchaseStatisticalGroupId: 'NA',
        purchaseStatisticalGroup: 'Not Applicable',
        orderHorizon: '1',
        itemValuationGroupId: 'MAUC',
        itemValuationGroup: 'MAUC',
        operationalCostComponentId: 'OPR',
        operationalCostComponent: 'Operation Cost',
        surchargeCostComponentId: 'SUR',
        surchargeCostComponent: 'Lumpsum Charges',
        projectOrderSystem: 'mnl',
        pegPRPWarehouseOrder: 'yes',
      })
    } else if (
      record.currentLevel === 'Live' ||
      userDetails.roles?.some((role) => ['L0'].includes(role))
    ) {
      setLiveRequestModal(!liverequestModal)
      setPendingRequest(record)
    }
  }

  const CancelL0Request = () => {
    setLevel0RequestModal(false)
    setPendingRequest({})
    setErrors(InitialErrors)
  }

  const CancelRequest = () => {
    setLevel1RequestModal(false)
    setPendingRequest({})
    setErrors(InitialErrors)
  }
  const Level2ModalCancelRequest = () => {
    setLevel2RequestModal(false)
    setPendingRequest({})
    setErrors(InitialErrors)
  }
  const Level3ModalCancelRequest = () => {
    setLevel3RequestModal(false)
    setPendingRequest({})
    setErrors(InitialErrors)
  }
  const ErpModalCancelRequest = () => {
    setErpRequestModal(false)
    setPendingRequest({})
    setErrors(InitialErrors)
  }
  const LiveModalCancelRequest = () => {
    setLiveRequestModal(false)
    setPendingRequest({})
    setErrors(InitialErrors)
  }

  const openHistoryModal = (record) => {
    setOpenHistory(true)
    setSelectedRecord(record)
  }

  const openProductLinkHierarchyFunc = (record) => {
    setOpenProductLinkHierarchy(true)
    setSelectedRecord(record)
  }

  const openCommentsModal = (record) => {
    setOpenComments(true)
    setSelectedRecord(record)
  }

  const openSimilarItemsModal = (record) => {
    setOpenSimilarItems(true)
    setSelectedRecord(record)
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

  const PageChange = (newPage) => {
    setItemListPage(newPage - 1)
  }

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

  const CompanyLiveStatus = (record) => {
    return (
      <Container>
        <InfoRow>
          <Label>7777 :</Label>
          <Text>
            {record.companies.some(
              (item) => item.name === '7777' && item.live
            ) ? (
              <div className='live'>Live</div>
            ) : (
              <div className='fail'>Failed</div>
            )}
          </Text>
        </InfoRow>
        <InfoRow>
          <Label>9999 :</Label>
          <Text>
            {record.companies.some(
              (item) => item.name === '9999' && item.live
            ) ? (
              <div className='live'>Live</div>
            ) : (
              <div className='fail'>Failed</div>
            )}
          </Text>
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
                Items List (<Count>Total Records : {totalItemsCount}</Count>)
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
            {itemListFilters.itemType ||
            itemListFilters.level ||
            itemListFilters.status ? (
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
                  <th>Actions</th>
                  <th>Requirement Description</th>
                  <th>External Id</th>
                  <th>Item Group</th>
                  <th>Detailed Description</th>
                  <th>Unit</th>
                  <th className='task-progress'>Task Progress</th>
                  <th className='status'>Status</th>
                  {/* <th className='actions'>Actions</th> */}
                </TableRow>
              </thead>
              <tbody>
                {itemListLoading ? (
                  <LoadingContainer>
                    <div className='loader' />
                  </LoadingContainer>
                ) : endUserRequestList.length > 0 ? (
                  endUserRequestList.map((record) => (
                    <TableRow key={record.id}>
                      <td>
                        <IconsContainer>
                          <FaHourglassHalf
                            className='icon'
                            onClick={() => {
                              openCommentsModal(record)
                            }}
                            title='Comments'
                          />
                          <FaHistory
                            className='icon'
                            onClick={() => openHistoryModal(record)}
                            title='History'
                          />
                          <FaEye
                            className='icon'
                            onClick={() => Level1RequestModalOpen(record)}
                            title='Open Record'
                          />
                        </IconsContainer>
                      </td>
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
                            <Popover
                              content={CompanyLiveStatus(record)}
                              placement='right'
                              title='Company Live Status'
                            >
                              <BranchIcon
                                company9999Live={record.companies?.some(
                                  (item) => item.name === '9999' && item.live
                                )}
                                company7777Live={record.companies?.some(
                                  (item) => item.name === '7777' && item.live
                                )}
                                onClick={() => {
                                  if (record.extId) {
                                    copyToClipboard(record.extId)
                                  }
                                }}
                              />
                            </Popover>
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
                            // onClick={() => {
                            //   if (record.detailedDescription) {
                            //     copyToClipboard(record.detailedDescription)
                            //   }
                            // }}
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
                          initiated={record.status === 'Pending'}
                          rejected={record.status === 'Declined'}
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

                      {/* <td className='actions'>
                        <Dropdown
                          trigger={['click']}
                          arrow={true}
                          placement='left'
                          menu={{
                            items: [
                              // {
                              //   key: '1',
                              //   label: (
                              //     <Actions
                              //       onClick={() =>
                              //         Level1RequestModalOpen(record)
                              //       }
                              //     >
                              //       <span>
                              //         <FaEye />
                              //       </span>
                              //       <ActionsTitles>View Record</ActionsTitles>
                              //     </Actions>
                              //   ),
                              // },
                              {
                                key: '1',
                                label: (
                                  <Actions
                                    onClick={() => {
                                      openSimilarItemsModal(record)
                                    }}
                                  >
                                    <span>
                                      <HiTemplate />
                                    </span>
                                    <ActionsTitles>Similar Items</ActionsTitles>
                                  </Actions>
                                ),
                              },
                              {
                                key: '2',
                                label: (
                                  <Actions
                                    onClick={() => {
                                      openCommentsModal(record)
                                    }}
                                  >
                                    <span>
                                      <LiaComments />
                                    </span>
                                    <ActionsTitles>Comments</ActionsTitles>
                                  </Actions>
                                ),
                              },
                              {
                                key: '3',
                                label: (
                                  <Actions
                                    onClick={() => openHistoryModal(record)}
                                  >
                                    <span>
                                      <FaHistory />
                                    </span>
                                    <ActionsTitles>History</ActionsTitles>
                                  </Actions>
                                ),
                              },
                              {
                                key: '4',
                                label: (
                                  <Actions
                                    onClick={() =>
                                      openProductLinkHierarchyFunc(record)
                                    }
                                  >
                                    <span>
                                      <TbHierarchy2 />
                                    </span>
                                    <ActionsTitles>
                                      Product Link Hierarchy
                                    </ActionsTitles>
                                  </Actions>
                                ),
                              },
                            ],
                          }}
                        >
                          <Button>
                            <BsThreeDotsVertical />
                          </Button>
                        </Dropdown>
                      </td> */}
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
          <PaginationContainer>
            <Pagination
              value={itemListPage + 1}
              onChange={PageChange}
              total={totalItemsCount}
            />
          </PaginationContainer>
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
            <span>Edit Request</span>
            <CloseIcon onClick={CancelL0Request}>
              <RxCross2 />
            </CloseIcon>
          </div>
        }
        // title='First Level Approval'
        open={level0requestModal}
        closable={false}
        footer={false}
        // width='80vw'
        // height='80vh'
      >
        <Level0ItemRequest />
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
            <span>
              {PendingRequest.currentLevel === 'Live'
                ? `Live Item (${PendingRequest.extId})`
                : 'Your Item Request'}
            </span>
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

      {openHistory && (
        <HistoryModal
          openHistory={openHistory}
          setOpenHistory={setOpenHistory}
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      )}

      {openComments && (
        <CommentsModal
          openComments={openComments}
          setOpenComments={setOpenComments}
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      )}

      {openSimilarItems && (
        <SimilarItemsModal
          openSimilarItems={openSimilarItems}
          setOpenSimilarItems={setOpenSimilarItems}
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      )}

      {openProductLinkHierarchy && (
        <ProductLinkHierarchyModal
          openProductLinkHierarchy={openProductLinkHierarchy}
          setOpenProductLinkHierarchy={setOpenProductLinkHierarchy}
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      )}
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

  .actions-label {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .ant-select {
    width: 20vw;
  }
`
const BodyContainer = styled.div`
  position: relative;
  padding: 1rem 0;
  margin-right: 0.6rem;
  width: 97%;
  height: 100%;
  max-height: 89vh;
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
  max-height: 67vh;
  min-height: 300px !important;
  overflow: auto;
  padding: 0 0rem;

  @media only screen and (min-height: 650px) and (max-height: 650px) {
    max-height: 75vh !important;
  }

  @media only screen and (min-height: 900px) {
    max-height: 80vh !important;
  }
`

const LoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 50vh;
  // background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  .loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid #514b82;
    animation: l20-1 0.8s infinite linear alternate, l20-2 1.6s infinite linear;
  }
  @keyframes l20-1 {
    0% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
    }
    12.5% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 0%,
        100% 0%,
        100% 0%
      );
    }
    25% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 100%,
        100% 100%,
        100% 100%
      );
    }
    50% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    62.5% {
      clip-path: polygon(
        50% 50%,
        100% 0,
        100% 0%,
        100% 0%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    75% {
      clip-path: polygon(
        50% 50%,
        100% 100%,
        100% 100%,
        100% 100%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    100% {
      clip-path: polygon(
        50% 50%,
        50% 100%,
        50% 100%,
        50% 100%,
        50% 100%,
        50% 100%,
        0% 100%
      );
    }
  }
  @keyframes l20-2 {
    0% {
      transform: scaleY(1) rotate(0deg);
    }
    49.99% {
      transform: scaleY(1) rotate(135deg);
    }
    50% {
      transform: scaleY(-1) rotate(0deg);
    }
    100% {
      transform: scaleY(-1) rotate(-135deg);
    }
  }
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
    width: 100%;
    color: #1f2544;
    margin-top: -0.2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-weight: 600;
    z-index: 1;
    &:first-child {
      width: 100px !important;
      text-align: center;
      position: sticky;
      left: 0;
      background: #fff;
      z-index: 99;
    }
    &:nth-child(2) {
      max-width: 170px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:nth-child(6) {
      max-width: 100px !important;
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
    z-index: 1;
    &:first-child {
      width: 100px !important;
      position: sticky;
      left: 0;
      background: #fff;
      z-index: 99;
    }
    &:nth-child(2) {
      max-width: 170px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:nth-child(6) {
      max-width: 100px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  /* .task-progress {
    width: 120px !important;
    // transform: translate(40%, 0);
  }
  .status,
  .actions {
    width: 140px !important;
    display: flex;
    justify-content: center;
  } */

  .actions {
    width: 140px;
    display: flex;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`

const PaginationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
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
  top: 3rem;
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
  align-items: center;
  gap: 0.3rem;
`

const DataValue = styled.div`
  position: relative;
  max-width: 170px;
  min-width: 170px;
  width: 90%;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const IconsContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  gap: 1rem;
  .icon {
    color: #596bb3;
    font-size: 12px;
  }
`

const PersonIcon = styled(IoPersonCircleSharp)`
  font-size: 15px;
  color: #596bb3;
`
const InfoIcon = styled(IoInformationCircleSharp)`
  font-size: 15px;
  color: #596bb3;
`
//Popover Contain

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  max-width: 450px;
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
  .live {
    color: green;
    font-weight: 600;
    border: 1px solid #00ff00;
    background-color: #ddeddd;
    padding: 2px 8px;
    border-radius: 10%;
    font-size: 0.6rem;
  }
  .fail {
    color: #ff0000;
    font-weight: 600;
    border: 1px solid #ff0000;
    background-color: #ffb2b2;
    padding: 2px 8px;
    border-radius: 10%;
    font-size: 0.6rem;
  }
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
    min-width: 950px;
    max-width: 1300px;
    overflow: hidden;
    position: relative;
    @media screen and (max-width: 700px) {
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

// const Actions = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `

// const ActionsTitles = styled.div`
//   font-size: 0.7rem;
//   letter-spacing: 0.5px;
//   color: #333;
// `

const BranchIcon = styled(PiGitBranchBold)`
  font-size: 15px;
  color: ${(props) => {
    if (props.company7777Live && props.company9999Live) {
      return 'green'
    } else if (props.company7777Live || props.company9999Live) {
      return 'orange'
    } else {
      return 'red'
    }
  }};
`
