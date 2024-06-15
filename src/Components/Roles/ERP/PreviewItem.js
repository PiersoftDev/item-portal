import { Checkbox, Table } from 'antd'
import React from 'react'
import styled from 'styled-components'
import PreviewZoom from './PreviewItemZoom'
import { useStates } from '../../../utils/StateProvider'

const PreviewItem = ({ previewRecord, setPreviewModalOpen }) => {
  const { zoomOpen, setZoomOpen, zoomHeader, setZoomHeader } = useStates()
  const CancelClick = () => {
    setPreviewModalOpen(false)
  }
  const ProceedClick = () => {
    setPreviewModalOpen(false)
  }

  const data = [
    {
      key: 1,
      item_type: 'Purchase',
      item_group: 'CV - Civil',
      product_type: 'PT - Product Class',
      product_class: 'PC - Product Class',
      product_line: 'PL - Product Line',
      specification: '100mm Rod with 2 holes',
      detailed_description: 'Product Class Product Line 100mm Rod with 2 holes',
      standard_descrption: '32 Chars Standard Desc',
      uom: 'NOS',
      hsn: '10 20 10 30',
      cost_component: 'MAT - Material',
    },
  ]
  const columns = [
    {
      title: 'Item Type',
      dataIndex: 'item_type',
    },
    {
      title: 'Item Group',
      dataIndex: 'item_group',
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
    },
    {
      title: 'Product CLass',
      dataIndex: 'product_class',
    },
    {
      title: 'Product Line',
      dataIndex: 'product_line',
    },
    {
      title: 'Specification',
      dataIndex: 'specification',
    },
    {
      title: 'Detailed Description',
      dataIndex: 'detailed_description',
    },
    {
      title: 'Standard Description',
      dataIndex: 'standard_descrption',
    },
    {
      title: 'UOM',
      dataIndex: 'uom',
    },
    {
      title: 'HSN',
      dataIndex: 'hsn',
    },
    {
      title: 'Cost Component',
      dataIndex: 'cost_component',
    },
  ]
  return (
    <Wrapper>
      <SectionTitle>Basic Details</SectionTitle>
      <TableContainer>
        <Table
          columns={columns}
          dataSource={data}
          size='small'
          pagination={false}
          className='custom-table'
        />
      </TableContainer>

      <ERPForm>
        <Section>
          <SectionTitle>Aditional Fields</SectionTitle>
          <GridContainer>
            <Container>
              <label>Currency</label>
              <input placeholder='Currency' type='text' />
            </Container>
            <Container>
              <label>Purchase Unit</label>
              <input placeholder='Purchase Unit' type='text' />
            </Container>
            <Container>
              <label>Purchase Price Unit</label>
              <input placeholder='Purchase Price Unit' type='text' />
            </Container>
            <Container>
              <label>Purchase Price Group</label>
              <input placeholder='Purchase Price Group' type='text' />
            </Container>
            <Container>
              <label>Purchase Statistics Group</label>
              <input placeholder='Purchase Statistics Group' type='text' />
            </Container>
            <Container>
              <label>Warehouse</label>
              <input placeholder='Warehouse' type='text' />
            </Container>
            <Container>
              <label>Item Valuation Group</label>
              <input placeholder='Item Valuation Group' type='text' />
            </Container>
            {/* <Container>
              <label>Project Order System</label>
              <select placeholder='Project Order System'>
                <option>Manual</option>
                <option>PRP Purchase Order</option>
                <option>PRP Warehouse Order</option>
              </select>
            </Container> */}
            <Container>
              <label>Order Horizon</label>
              <input placeholder='Order Horizon' type='text' />
            </Container>
            <Container>
              <label>Operation Cost Component</label>
              <input placeholder='Operation Cost Component' type='text' />
            </Container>
            <Container>
              <label>Surcharge Cost Component</label>
              <input placeholder='Surcharge Cost Component' type='text' />
            </Container>
          </GridContainer>
        </Section>
      </ERPForm>
      <ButtonContainer>
        <Button onClick={CancelClick}>Back</Button>
        <Button onClick={ProceedClick}>Proceed</Button>
      </ButtonContainer>
    </Wrapper>
  )
}

export default PreviewItem

const Wrapper = styled.div`
  position: relative;
  padding: 0.7rem;
  min-height: 400px;
  z-index: 9999;
`

const TableContainer = styled.div`
  overflow-x: auto;
  position: relative;
  margin-top: 0rem;
  white-space: nowrap;
  .custom-table {
    .ant-table {
      border-radius: 0.6rem;
      overflow: auto;
      height: 100%;
      width: 98%;
      min-width: 1110px;
      max-height: 60vh;
    }

    .ant-table-thead th {
      font-size: 0.5rem;
      font-weight: 600;
      font-family: 'Roboto', sans-serif;
      padding: 0.4rem;
      text-align: center;
      color: #3b4040;
      letter-spacing: 0.5px;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .ant-table-tbody td {
      font-size: 0.6rem;
      font-weight: 400;
      font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
        Helvetica, Arial, sans-serif;
      padding: 0.4rem;
      color: #3c3836;
      cursor: pointer;
      text-align: center;
      z-index: 0;
    }

    .ant-table-tbody tr:hover {
      background: #f2f4f5;
      opacity: 100%;
    }
  }
`

const ERPForm = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 200px;
  margin: 1rem 0;
`

const Section = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid #eeedeb;
`

const SectionTitle = styled.h2`
  color: #49619f;
  font-family: 'Open Sans Hebrew', sans-serif;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  letter-spacing: 0.5px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem 2rem;
  margin: 0rem 1rem 1rem 1rem;
  @media screen and (min-width: 1550px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;

  label {
    color: #49619f;
    font-family: 'Open Sans Hebrew', sans-serif;
    font-size: 0.7rem;
    margin-bottom: 0.3rem;
  }

  input {
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    color: var(--grey-100);
    font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
    padding: 0.5rem;
    font-size: 0.7rem;
  }
  select {
    border-radius: 0.5rem;
    color: var(--grey-100);
    border: 1px solid #ccc;
    font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
    padding: 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  option {
    background-color: #f0f0f0;
    color: #333;
    cursor: pointer;
    padding: 10px !important;
  }
  input:focus {
    outline: none;
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
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
