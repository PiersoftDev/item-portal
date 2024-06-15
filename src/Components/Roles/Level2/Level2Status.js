import React from 'react'
import styled from 'styled-components'
import { Tabs, Table } from 'antd'
import { CommentOutlined } from '@ant-design/icons'
import useColumnSearch from '../../SubComponents/SearchComponent'
import { useStates } from '../../../utils/StateProvider'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
// import PreviewRequest from './PreviewRequest'

const { TabPane } = Tabs

const Level2Status = () => {
  const { activeTab, setActiveTab } = useStates()
  const handleTabChange = (key) => {
    setActiveTab(key)
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
        />
      ),
    },
    {
      title: 'Item Type',
      dataIndex: 'itemtype',
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
      width: '20%',
      ...useColumnSearch('DetailedDesc', 'Detailed Description'),
    },
    {
      title: 'UOM',
      dataIndex: 'uom',
      ...useColumnSearch('uom', 'UOM'),
    },
    {
      title: 'Created Date',
      dataIndex: 'Createddate',
      ...useColumnSearch('Createddate', 'Created Date'),
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      render: (comments, record) => <CommentOutlined size='small' />,
    },
  ]

  const data = [
    {
      key: '1',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description1',
      uom: 'NOS',
      Createddate: '15-01-2024',
    },
    {
      key: '2',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description2',
      uom: 'KGs',
      Createddate: '15-01-2024',
    },
    {
      key: '3',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description3',
      uom: 'NOS',
      Createddate: '15-01-2024',
    },
    {
      key: '4',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description4',
      uom: 'KGs',
      Createddate: '15-01-2024',
    },
    {
      key: '5',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description5',
      uom: 'KGs',
      Createddate: '15-01-2024',
    },
    {
      key: '6',
      itemtype: 'cost',
      itemGroup: 'civil',
      DetailedDesc: 'description6',
      uom: 'NOS',
      Createddate: '15-01-2024',
    },
    {
      key: '7',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description7',
      uom: 'NOS',
      Createddate: '15-01-2024',
    },
    {
      key: '8',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description1',
      uom: 'NOS',
      Createddate: '15-01-2024',
    },
    {
      key: '9',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description2',
      uom: 'KGs',
      Createddate: '15-01-2024',
    },
    {
      key: '10',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description3',
      uom: 'NOS',
      Createddate: '15-01-2024',
    },
    {
      key: '11',
      itemtype: 'purchase',
      itemGroup: 'civil',
      DetailedDesc: 'description4',
      uom: 'KGs',
      Createddate: '15-01-2024',
    },
    {
      key: '12',
      itemtype: 'cost',
      itemGroup: 'Electrical',
      DetailedDesc: 'description5',
      uom: 'KGs',
      Createddate: '15-01-2024',
    },
    {
      key: '13',
      itemtype: 'cost',
      itemGroup: 'civil',
      DetailedDesc: 'description6',
      uom: 'NOS',
      Createddate: '15-01-2024',
    },
    {
      key: '14',
      itemtype: 'purchase',
      itemGroup: 'Plumbing',
      DetailedDesc: 'description7',
      uom: 'NOS',
      Createddate: '15-01-2024',
    },
  ]

  return (
    <Styles>
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        type='card'
        size='small'
        tabBarGutter={8}
        className='TabNames'
      >
        <TabPane tab='Pending for Approvals' key='pendingforapprovals'>
          <div className='custom-table'>
            <TableContainer>
              <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                bordered
                size='small'
                scroll={{ y: 'calc(55vh - 4rem)' }}
              />
            </TableContainer>
          </div>
        </TabPane>
        <TabPane tab='Approved' key='approved'>
          <div className='custom-table'>
            <TableContainer>
              <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                bordered
                size='small'
                scroll={{ y: 'calc(55vh - 4rem)' }}
              />
            </TableContainer>
          </div>
        </TabPane>
        <TabPane tab='Rejections' key='rejections'>
          <div className='custom-table'>
            <TableContainer>
              <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                bordered
                size='small'
                scroll={{ y: 'calc(55vh - 4rem)' }}
              />
            </TableContainer>
          </div>
        </TabPane>
      </Tabs>
      {/* <PreviewItemContainer>
        <PreviewRequest />
      </PreviewItemContainer> */}
    </Styles>
  )
}

export default Level2Status

const Styles = styled.div`
  margin: 0 0.6rem;
  position: relative;
  background: #f5fafc;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  overflow: hidden;
  height: auto;
  min-height: 60vh;
  max-height: 60vh;
  width: 95%;

  .ant-tabs-tab {
    color: #555;
    background-color: #e3e7e8 !important;
    border-radius: 10px !important;
    font-weight: 500;
    font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
  }
  .ant-tabs-tab-active {
    background-color: #fff !important;
  }
  .custom-table {
    .ant-table {
      border-radius: 1rem;
      overflow: hidden;
      width: 100%;
    }

    .ant-table-thead th {
      font-size: 0.8rem;
      font-weight: 500;
      font-family: Segoe UI;
      padding: 0.6rem;
      text-align: center;
      position: sticky;
      text-wrap: nowrap;
      top: 0;
      z-index: 2;
    }
    .ant-table-tbody td {
      font-size: 0.78rem;
      font-weight: 400;
      padding: 0.3rem 0.5rem;
      cursor: pointer;
      text-align: center;
      z-index: 0;
      font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
        Helvetica, Arial, sans-serif;
    }

    .ant-table-tbody tr:hover {
      background: #f2f4f5;
      opacity: 100%;
    }
  }
`
const TableContainer = styled.div`
  max-height: 100%;
  overflow-y: auto;
  position: relative;
  margin-top: 0rem;
`

// const PreviewItemContainer = styled.div`
//   position: absolute;
//   bottom: -100%;
//   min-width: 100%;
//   min-height: 100%;
//   z-index: 1000;
//   background: inherit;
// `
