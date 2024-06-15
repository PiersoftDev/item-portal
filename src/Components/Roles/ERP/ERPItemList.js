import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Table } from 'antd'
// import NewRequest from './ItemRequest'
import useColumnSearch from '../../SubComponents/SearchComponent'
// import { EyeOutlined } from '@ant-design/icons'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
import PreviewItem from './PreviewItem'

const ERPItemList = () => {
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [previewRecord, setPreviewRecord] = useState()

  const Preview = (record) => {
    setPreviewModalOpen(!previewModalOpen)
    setPreviewRecord(record)
  }
  const dataSource = [
    {
      key: '1',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description1',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Submitted',
    },
    {
      key: '2',
      site: 'Hyderabad',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description2',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '3',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description3',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Level2',
    },
    {
      key: '4',
      site: 'Hyderabad',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description4',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '5',
      site: 'Ranchi',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description5',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level2',
    },
    {
      key: '6',
      site: 'Hyderabad',
      itemtype: 'cost',
      itemGroup: 'civil',
      DetailedDesc: 'description6',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '7',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description7',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Level2',
    },
    {
      key: '8',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description8',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'ERP',
    },
    {
      key: '9',
      site: 'Hyderabad',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description1',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '10',
      site: 'Ranchi',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description2',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level2',
    },
    {
      key: '11',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description3',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Submitted',
    },
    {
      key: '12',
      site: 'Hyderabad',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description4',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Submitted',
    },
    {
      key: '13',
      site: 'Ranchi',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description5',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level2',
    },
    {
      key: '14',
      site: 'Ranchi',
      itemtype: 'cost',
      itemGroup: 'civil',
      DetailedDesc: 'description6',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '15',
      site: 'Hyderabad',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description7',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'ERP',
    },
    {
      key: '16',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description8',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '17',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description1',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Submitted',
    },
    {
      key: '18',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description1',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Submitted',
    },
    {
      key: '19',
      site: 'Hyderabad',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description2',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '20',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description3',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Level2',
    },
    {
      key: '21',
      site: 'Hyderabad',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description4',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '22',
      site: 'Ranchi',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description5',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level2',
    },
    {
      key: '23',
      site: 'Hyderabad',
      itemtype: 'cost',
      itemGroup: 'civil',
      DetailedDesc: 'description6',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '24',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description7',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Level2',
    },
    {
      key: '25',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description8',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'ERP',
    },
    {
      key: '26',
      site: 'Hyderabad',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description1',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '27',
      site: 'Ranchi',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description2',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level2',
    },
    {
      key: '28',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description3',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Submitted',
    },
    {
      key: '29',
      site: 'Hyderabad',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description4',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Submitted',
    },
    {
      key: '30',
      site: 'Ranchi',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description5',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level2',
    },
    {
      key: '31',
      site: 'Ranchi',
      itemtype: 'cost',
      itemGroup: 'civil',
      DetailedDesc: 'description6',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
    {
      key: '32',
      site: 'Hyderabad',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description7',
      uom: 'NOS',
      Createddate: '15-01-2024',
      status: 'ERP',
    },
    {
      key: '33',
      site: 'Ranchi',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description8',
      uom: 'KGs',
      Createddate: '15-01-2024',
      status: 'Level1',
    },
  ]
  const columns = [
    {
      title: ' ',
      width: '4rem',
      align: 'center',
      render: (_, record) => (
        <BsArrowUpRightCircleFill
          title='Open'
          style={{ fontSize: '1rem', color: '#343F56' }}
          onClick={() => Preview(record)}
        />
      ),
    },
    {
      title: 'Site',
      dataIndex: 'site',
      width: 'auto',
      ...useColumnSearch('site', 'Site'),
    },
    {
      title: 'Item Type',
      dataIndex: 'itemtype',
      width: 'auto',
      ...useColumnSearch('itemtype', 'Item Type'),
    },
    {
      title: 'Item Group',
      dataIndex: 'itemGroup',
      ...useColumnSearch('itemGroup', 'Item Group'),
    },
    {
      title: 'Detailed Description',
      dataIndex: 'DetailedDesc',
      width: 'auto',
      ...useColumnSearch('DetailedDesc', 'Detailed Description'),
    },
    { title: 'UOM', dataIndex: 'uom', ...useColumnSearch('uom', 'UOM') },
    {
      title: 'Created Date',
      dataIndex: 'Createddate',
      ...useColumnSearch('Createddate', 'Created Date'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      ...useColumnSearch('status', 'Status'),
    },
  ]

  return (
    <>
      <Styles>
        <div className='custom-table'>
          <TableContainer>
            <Table
              dataSource={dataSource}
              columns={columns}
              bordered
              pagination={false}
              className='ant-table-container'
              size='small'
            />
          </TableContainer>
        </div>
      </Styles>
      <CustomModal
        title='Preview Item'
        open={previewModalOpen}
        centered
        closable={false}
        footer={false}
      >
        <PreviewItem
          previewRecord={previewRecord}
          setPreviewModalOpen={setPreviewModalOpen}
        />
      </CustomModal>
    </>
  )
}

export default ERPItemList

const Styles = styled.div`
  margin: 0;
  height: 100%;
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
      overflow: auto;
      height: 100%;
      width: 99%;
      min-height: 100px;
      max-height: 87vh;
      @media screen and (min-height: 698px) {
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
          background-color: #f5fafc;
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
      color: #3b4040;
      letter-spacing: 0.5px;
      position: sticky;
      top: 0;
      text-indent: 0.5rem;
      z-index: 1;
    }
    .ant-table-tbody td {
      font-size: 0.8rem;
      font-weight: 400;
      font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
        Helvetica, Arial, sans-serif;
      padding: 0.4rem;
      color: #3c3836;
      cursor: pointer;
      text-align: center;
      z-index: 0;
      text-indent: -0.8rem;
    }

    .ant-table-tbody tr:hover {
      background: #f2f4f5;
    }
  }
`

const TableContainer = styled.div`
  overflow-y: auto;
  position: relative;
  transform-origin: -145px 23.75px !important;
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
  width: 80vw !important;
  height: 70vh !important;
  overflow: hidden;
  .ant-modal-title {
    font-size: 1rem;
    background: #eeedeb;
    color: #3c3836;
  }
  .ant-modal-content {
    background: #eeedeb;
    margin-top: -3rem;
  }
`
