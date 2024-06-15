import { Table, Radio } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { useStates } from '../../../utils/StateProvider'

const PreviewZoom = () => {
  const {
    selectedRowKey,
    setSelectedRowKey,
    selectedRow,
    setSelectedRow,
    setZoomOpen,
    setNewItem,
    newItem,
  } = useStates()
  const SaveClick = () => {
    if (selectedRowKey) {
      setNewItem({
        ...newItem,
        itemgroup: `${selectedRow.code}  -  ${selectedRow.desc}`,
      })
      setZoomOpen(false)
    }
  }

  const Data = [
    {
      key: '01',
      code: '01',
      desc: 'Group 1',
    },
    {
      key: '02',
      code: '02',
      desc: 'Group 2',
    },
    {
      key: '03',
      code: '03',
      desc: 'Group 3',
    },
    {
      key: '04',
      code: '04',
      desc: 'Group 4',
    },
    {
      key: '05',
      code: '05',
      desc: 'Group 5',
    },
    {
      key: '06',
      code: '06',
      desc: 'Group 6',
    },
    {
      key: '07',
      code: '07',
      desc: 'Group 7',
    },
    {
      key: '08',
      code: '08',
      desc: 'Group 8',
    },
    {
      key: '09',
      code: '09',
      desc: 'Group 9',
    },
    {
      key: '10',
      code: '10',
      desc: 'Group 10',
    },
  ]
  const columns = [
    {
      title: 'Select',
      dataIndex: 'key',
      align: 'center',
      width: '10vw',
      render: (text, record) => (
        <Radio
          checked={selectedRowKey === record.key}
          onChange={() => {
            setSelectedRowKey(record.key)
            setSelectedRow(record)
          }}
        />
      ),
    },
    {
      title: 'Code',
      dataIndex: 'code',
      align: 'center',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      align: 'center',
    },
  ]

  return (
    <Wrapper>
      <TableContainer>
        <Table
          columns={columns}
          dataSource={Data}
          pagination={false}
          size='small'
        />
      </TableContainer>
      <ButtonContainer>
        <Button onClick={() => setZoomOpen(false)}>Cancel</Button>
        <Button onClick={SaveClick} disabled={!selectedRowKey}>
          Select
        </Button>
      </ButtonContainer>
    </Wrapper>
  )
}

export default PreviewZoom

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem 1rem 2rem;
`

// const Header = styled.h4`
//   color: #49619f;
//   font-family: 'Open Sans', sans-serif;
//   font-size: 1.2rem;
// `

const TableContainer = styled.div`
  padding: 0 1rem;
  max-height: 380px;
  overflow-y: auto;

  .ant-table-thead {
    font-family: Arial, Helvetica, sans-serif;
    z-index: 99;
    position: sticky;
    top: 0;
    background-color: white;
    font-size: 0.9rem;
  }

  .ant-table-tbody {
    font-family: verdana;
    font-size: 0.8rem;
    z-index: 1;
    cursor: pointer;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const Button = styled.button`
  font-family: 'Open Sans', sans-serif;
  font-size: 0.8rem;
  border-radius: 0.5rem;
  background: #49619f;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #31425b;
  }
`
