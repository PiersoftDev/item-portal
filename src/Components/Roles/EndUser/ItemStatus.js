import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Tabs } from 'antd'

import useColumnSearch from '../../SubComponents/SearchComponent'
import { useStates } from '../../../utils/StateProvider'
import axios from 'axios'
import NoDataFound from './NodataFound.png'

const { TabPane } = Tabs

const ItemStatus = () => {
  const { activeTab, setActiveTab, setEndUserRequestList, endUserRequestList } =
    useStates()
  const handleTabChange = (key) => {
    setActiveTab(key)
  }

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          'https://mdm.p360.build/v1/mdm/p360/item/fetch-all'
        )
        setEndUserRequestList(res.data.data)
      } catch (err) {
        console.error('Error fetching items:', err)
      }
    }
    fetchItem()
  }, [])

  const columns = [
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
    // {
    //   title: 'Verification',
    //   fixed: 'right',
    //   render: (_, record) =>
    //     record.id ? (
    //       <Button
    //         onClick={() => {
    //           SimilarItemModalOpen(record)
    //         }}
    //       >
    //         Fetch Similar
    //       </Button>
    //     ) : null,
    // },
  ]

  const Level1List = endUserRequestList.filter(
    (list) => list.status === 'Pending@level1'
  )
  const Level2List = endUserRequestList.filter(
    (list) => list.status === 'Pending@level2'
  )
  const ErpList = endUserRequestList.filter((list) => list.status === 'erp')
  const LiveItems = endUserRequestList.filter((list) => list.status === 'live')
  const RejectedList = endUserRequestList.filter(
    (list) => list.status === 'rejected'
  )

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
        <TabPane tab='Pending at Level 1' key='pendingLevel1'>
          <TableContainer>
            <Table>
              <TableRow className='header'>
                {columns.map((list) => {
                  return <th key={list.dataIndex}>{list.title}</th>
                })}
              </TableRow>
              {Level1List.length > 0 ? (
                Level1List.map((list) => (
                  <TableRow key={list.id}>
                    {columns.map((data) => (
                      <td key={data.dataIndex}>{list[data.dataIndex]}</td>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <DataNotFound>
                    <img src={NoDataFound} alt='No Data Found' />
                  </DataNotFound>
                </TableRow>
              )}
            </Table>
          </TableContainer>
        </TabPane>
        <TabPane tab='Pending at Level 2' key='pendingLevel2'>
          <TableContainer>
            <Table>
              <TableRow className='header'>
                {columns.map((list) => {
                  return <th key={list.dataIndex}>{list.title}</th>
                })}
              </TableRow>
              {Level2List.length > 0 ? (
                Level2List.map((list) => (
                  <TableRow key={list.id}>
                    {columns.map((data) => (
                      <td key={data.dataIndex}>{list[data.dataIndex]}</td>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <DataNotFound>
                    <img src={NoDataFound} alt='No Data Found' />
                  </DataNotFound>
                </TableRow>
              )}
            </Table>
          </TableContainer>
        </TabPane>
        <TabPane tab='Pending at IS' key='pendingIS'>
          <TableContainer>
            <Table>
              <TableRow className='header'>
                {columns.map((list) => {
                  return <th key={list.dataIndex}>{list.title}</th>
                })}
              </TableRow>
              {ErpList.length > 0 ? (
                ErpList.map((list) => (
                  <TableRow key={list.id}>
                    {columns.map((data) => (
                      <td key={data.dataIndex}>{list[data.dataIndex]}</td>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <DataNotFound>
                    <img src={NoDataFound} alt='No Data Found' />
                  </DataNotFound>
                </TableRow>
              )}
            </Table>
          </TableContainer>
        </TabPane>

        <TabPane tab='Live Items' key='liveItems'>
          <TableContainer>
            <Table>
              <TableRow className='header'>
                {columns.map((list) => {
                  return <th key={list.dataIndex}>{list.title}</th>
                })}
              </TableRow>
              {LiveItems.length > 0 ? (
                LiveItems.map((list) => (
                  <TableRow key={list.id}>
                    {columns.map((data) => (
                      <td key={data.dataIndex}>{list[data.dataIndex]}</td>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <DataNotFound>
                    <img src={NoDataFound} alt='No Data Found' />
                  </DataNotFound>
                </TableRow>
              )}
            </Table>
          </TableContainer>
        </TabPane>
        <TabPane tab='Rejected' key='rejected'>
          <TableContainer>
            <Table>
              <TableRow className='header'>
                {columns.map((list) => {
                  return <th key={list.dataIndex}>{list.title}</th>
                })}
              </TableRow>
              {RejectedList.length > 0 ? (
                RejectedList.map((list) => (
                  <TableRow key={list.id}>
                    {columns.map((data) => (
                      <td key={data.dataIndex}>{list[data.dataIndex]}</td>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <DataNotFound>
                    <img src={NoDataFound} alt='No Data Found' />
                  </DataNotFound>
                </TableRow>
              )}
            </Table>
          </TableContainer>
        </TabPane>
      </Tabs>
    </Styles>
  )
}

export default ItemStatus

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
  width: 98%;

  .ant-tabs-tab {
    position: relative;
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
`
const TableContainer = styled.div`
  position: relative;
  width: 100% !important;
  max-height: 50vh;
  min-height: 300px !important;
  overflow: auto;
`

const Table = styled.table`
  position: relative;
  width: 100% !important;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  display: table;
  border-collapse: collapse;
  padding: 0.1rem 0;
  .header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: #cde8e5 !important;
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
    padding: 0.5rem 1rem;
    text-align: center;
    white-space: nowrap;
    min-width: 150px;
    width: auto;

    margin-top: -0.2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-weight: 600;
    &:last-child {
      min-width: 300px;
    }
  }
  td {
    font-size: 0.7rem;
    padding: 0.5rem 1rem;
    text-align: center;
    min-width: 150px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    title: ${(props) => props.children};
    &:last-child {
      min-width: 300px;
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`

const DataNotFound = styled.div`
  position: absolute;
  padding: 1rem;
  left: 20%;
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
