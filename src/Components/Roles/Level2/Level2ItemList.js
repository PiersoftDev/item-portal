import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Table } from 'antd'
// import NewRequest from './ItemRequest'
import useColumnSearch from '../../SubComponents/SearchComponent'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
import { useStates } from '../../../utils/StateProvider'
import axios from 'axios'
import SimilarValues from '../../Global/SimilarValues'
import Level2ItemRequest from './Level2ItemRequest'

const Level2ItemList = () => {
  const {
    level1requestModal,
    setLevel1RequestModal,
    Level1PendingList,
    setLevel1PendingList,
    setSimilarItemsModal,
    setLevel1PendingRequest,
    setSimilarItem,
    similarItemsModal,
  } = useStates()

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          'https://mdm.p360.build/v1/mdm/p360/item/fetch-all'
        )
        setLevel1PendingList(res.data.data)
      } catch (err) {
        console.error('Error fetching items:', err)
      }
    }
    fetchItem()
  }, [])

  const Level1RequestModalOpen = (record) => {
    console.log(record)
    setLevel1RequestModal(!level1requestModal)
    setLevel1PendingRequest(record)
  }

  const SimilarItemModalOpen = (record) => {
    setSimilarItemsModal(!similarItemsModal)
    setSimilarItem(record)
  }

  const columns = [
    {
      title: ' ',
      width: '4rem',
      align: 'center',
      render: (_, record) => (
        <BsArrowUpRightCircleFill
          title='Open'
          style={{ fontSize: '1rem', color: '#343F56' }}
          onClick={() => Level1RequestModalOpen(record)}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      ...useColumnSearch('status', 'Status'),
    },
    {
      title: 'Site',
      dataIndex: 'site',
      ...useColumnSearch('site', 'Site'),
    },
    // {
    //   title: 'Item Type',
    //   dataIndex: 'itemType',
    //   ...useColumnSearch('itemType', 'Item Type'),
    // },
    {
      title: 'Item Group',
      dataIndex: 'itemGroup',
      ...useColumnSearch('itemGroup', 'Item Group'),
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      ...useColumnSearch('productType', 'Product Type'),
    },
    {
      title: 'Product Class',
      dataIndex: 'productClass',
      ...useColumnSearch('productClass', 'Product Class'),
    },
    {
      title: 'Product Line',
      dataIndex: 'productLine',
      ...useColumnSearch('productLine', 'Product Line'),
    },
    {
      title: 'Specifications',
      dataIndex: 'specifications',
      ...useColumnSearch('specifications', 'Specifications'),
    },
    {
      title: 'Detailed Description',
      dataIndex: 'detailedDescription',
      ...useColumnSearch('detailedDescription', 'Detailed Description'),
    },
    { title: 'UOM', dataIndex: 'uom', ...useColumnSearch('uom', 'UOM') },
    {
      title: 'Created Date',
      dataIndex: 'createdDateTime',
      ...useColumnSearch('createdDateTime', 'Created Date'),
    },
    {
      title: 'Requirement Description',
      dataIndex: 'requirementDesc',
      ...useColumnSearch('requirementDesc', 'Requirement Description'),
    },
    {
      title: 'Verification',
      fixed: 'right',
      render: (_, record) =>
        record.id ? (
          <Button
            onClick={() => {
              SimilarItemModalOpen(record)
            }}
          >
            Fetch Similar
          </Button>
        ) : null,
    },
  ]

  return (
    <>
      <Styles>
        <div className='custom-table'>
          <TableContainer>
            <Table
              dataSource={Level1PendingList}
              columns={columns}
              bordered
              pagination={false}
              className='ant-table-container'
              size='small'
              // scroll={{ y: 'calc(55vh)' }}
            />
          </TableContainer>
        </div>
      </Styles>
      <CustomModal
        title='Tax Department'
        open={level1requestModal}
        closable={false}
        footer={false}
      >
        <Level2ItemRequest />
      </CustomModal>
      <SimilarValues />
    </>
  )
}

export default Level2ItemList

const Styles = styled.div`
  margin: 0.6rem 0 0 0;
  height: 79%;
  display: flex;
  flex-direction: column;
  font-family: verdana;
  background: #f5fafc;
  border-radius: 10px;
  padding: 0 1rem 1rem 0rem;
  position: relative;

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
      max-height: 60vh;
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
    .ant-table-thead > tr > th:first-child {
      width: 5vw !important;
      min-width: 5vw !important;
    }
    .ant-table-tbody > tr > td:first-child {
      width: 5vw !important;
      min-width: 5vw !important;
    }
    .ant-table-tbody tr:hover {
      background: #f2f4f5;
      opacity: 100%;
    }
  }
`

const TableContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  position: relative;
  margin-top: 0rem;

  .ant-pagination {
    position: absolute;
    top: 0;
    left: 40vw;
    transform: translateY(-100%);
    display: flex;
    justify-content: center;
    gap: 0.6rem;
    padding: 5px;
    z-index: 99;
  }
`

const CustomModal = styled(Modal)`
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

const Button = styled.button`
  border: none;
  background: #8eaccd;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.3rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 600;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
    Helvetica, Arial, sans-serif;
  // padding: 0.5rem;
  width: auto;
  opacity: 70%;
  transition: all 0.3s ease-in-out;
  &:hover {
    // background: #92c7cf;
    opacity: 100%;
  }
`
