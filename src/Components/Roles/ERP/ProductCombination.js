import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStates } from '../../../utils/StateProvider'
import NewCombination from './NewCombination'
import axios from 'axios'

const Titles = [
  'Item Type',
  'Item Group Code',
  'Item Group Description',
  'Product Type Code',
  'Product Type Description',
  'Product Class Code',
  'Product Class Description',
  'Product Line Code',
  'Product Line Description',
]

const ProductCombination = () => {
  const {
    setProductCombinationModal,
    newCombinationopen,
    setNewCombinationOpen,
    productlinkList,
    setProductLinkList,
    testUrl,
  } = useStates()

  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState({
    itemType: '',
    itemGroupId: '',
    itemGroup: '',
    productTypeId: '',
    productType: '',
    productClassId: '',
    productClass: '',
    productLineId: '',
    productLine: '',
  })

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
    const fetchItem = async () => {
      try {
        const Cookie = CookiesData()
        setLoading(true)
        const res = await axios.get(
          `${testUrl}/v1/mdm/product-link/fetch-all`,
          Cookie
        )
        setProductLinkList(res.data.data)
      } catch (err) {
        console.error('Error fetching items:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  const filteredData = productlinkList?.filter((item) =>
    Object.keys(filters).every((key) => {
      const itemValue = item[key] ? item[key].toString().toLowerCase() : ''
      const filterValue = filters[key].toString().toLowerCase()
      return itemValue.includes(filterValue)
    })
  )

  const NewCombinationClick = () => {
    setNewCombinationOpen(true)
  }

  const CancelClick = () => {
    setProductCombinationModal(false)
  }

  return (
    <Wrapper>
      <Top>
        <Title>Product Combination</Title>
        <ButtonContainer>
          <Button className='cancel' onClick={CancelClick}>
            Cancel
          </Button>
          {/* <Button onClick={NewCombinationClick}>Add Combination</Button> */}
        </ButtonContainer>
      </Top>
      <TableContainer>
        <Table>
          <thead>
            <TableRow className='header'>
              {Titles.map((title, index) => (
                <th key={index}>
                  <div>{title}</div>
                  <Search
                    name={Object.keys(filters)[index]}
                    placeholder={title}
                    value={filters[Object.keys(filters)[index]]}
                    onChange={handleFilterChange}
                  />
                </th>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <TableRow key={index}>
                <td>{data.itemType}</td>
                <td>{data.itemGroupId}</td>
                <td>{data.itemGroup}</td>
                <td>{data.productTypeId}</td>
                <td>{data.productType}</td>
                <td>{data.productClassId}</td>
                <td>{data.productClass}</td>
                <td>{data.productLineId}</td>
                <td>{data.productLine}</td>
              </TableRow>
            ))}
          </tbody>
          {loading && <div className='loader' />}
        </Table>
      </TableContainer>
      <NewCombinationContainer open={newCombinationopen}>
        <NewCombination />
      </NewCombinationContainer>
    </Wrapper>
  )
}

export default ProductCombination

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  padding: 1rem;
  max-height: 80vh;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
`

const Title = styled.div`
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: 500;
`

const TableContainer = styled.div`
  width: 100%;
  height: 90%;
  overflow: auto;
  min-height: 30vh;
`

const Table = styled.table`
  position: relative;
  display: table;
  border-collapse: collapse;
  width: 100%;
  height: auto;
  .header {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #cde8e5 !important;
    border-radius: 10px;
  }
  .loader {
    position: absolute;
    top: 100px !important;
    left: 300px !important;
    width: 30px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 4px solid #514b82;
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

const TableRow = styled.tr`
  position: relative;
  display: table-row;
  z-index: 1;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
  th,
  td {
    font-size: 0.7rem;
    padding: 0.5rem 1rem;
    text-align: center;
    white-space: nowrap;
    min-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
  }
`

const Search = styled.input`
  padding: 0.2rem 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 90%;
  box-sizing: border-box;
  font-size: 0.6rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  &:focus {
    outline: none;
    border-color: #5b9bd5;
  }
  &::placeholder {
    text-align: center;
  }
`

const Button = styled.button`
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 1px 1px 2px #ccc;
  background: #8ca6d1;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem;
  gap: 1rem;
  .cancel {
    background: #d6dac8;
  }
`

const NewCombinationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 4;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${(props) =>
    props.open ? 'translate(0,0)' : 'translate(0,-150%)'};
  transition: transform 0.3s ease-in-out;
`
