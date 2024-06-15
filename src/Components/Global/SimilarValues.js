import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStates } from '../../utils/StateProvider'
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai'
import { BsArrowDownSquareFill } from 'react-icons/bs'
import JSONDiff from './JsonDiff'

const SimilarValues = () => {
  const {
    similarItemsModal,
    setSimilarItemsModal,
    setSimilarItem,
    similarItem,
  } = useStates()

  const [similarValues, setSimilarValues] = useState([])
  const [loadind, setLoading] = useState(false)
  const [compareRecord, setCompareRecord] = useState()

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
    const fetchSimilar = async () => {
      try {
        const Cookie = CookiesData()
        setLoading(true)
        const res = await axios.get(
          `https://mdm.p360.build/v1/mdm/p360/item/fetch-similar/${similarItem?.id}`,
          Cookie
        )
        console.log(res)
        setSimilarValues(res.data.data)
        console.log(similarItem.id)
      } catch (err) {
        console.error('Error fetching items:', err)
      } finally {
        setLoading(false)
      }
    }
    if (similarItem?.id) {
      fetchSimilar()
    }
  }, [similarItem])

  const CompareClick = (record) => {
    setCompareRecord(record)
  }

  const data = [
    {
      title: 'Item Group',
      value: similarItem?.itemGroup,
    },
    {
      title: 'Product Type',
      value: similarItem?.productType,
    },
    {
      title: 'Product Class',
      value: similarItem?.productClass,
    },
    {
      title: 'Product Line',
      value: similarItem?.productLine,
    },
    {
      title: 'Specification',
      value: similarItem?.specifications,
    },
    {
      title: 'Detailed Description',
      value: similarItem?.detailedDescription,
    },
    {
      title: '',
    },
  ]

  const ModalClose = () => {
    setSimilarItemsModal(false)
    setSimilarItem(null)
    setSimilarValues([])
    setCompareRecord()
  }
  return (
    <Wrapper open={similarItemsModal}>
      <Modal open={similarItemsModal}>
        <TitleContainer>
          <Title>Similar Items</Title>
          <CloseIcon onClick={ModalClose} />
        </TitleContainer>
        <Content>
          <Table>
            <tr className='head'>
              {data.map((record, index) => {
                return <th key={index}>{record.title}</th>
              })}
            </tr>
            <tr className='firstData'>
              {data.map((record, index) => {
                return <td>{record.value}</td>
              })}
            </tr>
            {similarValues.map((record, index) => {
              return (
                <tr key={index}>
                  <td>{record.itemGroup}</td>
                  <td>{record.productType}</td>
                  <td>{record.productClass}</td>
                  <td>{record.productLine}</td>
                  <td>{record.specifications}</td>
                  <td>{record.detailedDescription}</td>
                  <td>
                    <Button onClick={() => CompareClick(record)}>
                      Compare
                    </Button>
                  </td>
                </tr>
              )
            })}
            {loadind && <div className='loader' />}
          </Table>
        </Content>
        <CompareContainer open={compareRecord}>
          <DownArrow onClick={() => setCompareRecord(null)} />
          {compareRecord && (
            <JSONContainer>
              <JSONBox>
                <div className='title'>
                  <div>Existing Values</div>
                </div>
                <JSONDiff
                  original={similarItem}
                  updated={compareRecord}
                  type='new'
                />
              </JSONBox>
              <JSONBox>
                <div className='title'>
                  <div>New Values</div>
                </div>
                <JSONDiff
                  original={similarItem}
                  updated={compareRecord}
                  type='existing'
                />
              </JSONBox>
            </JSONContainer>
          )}
        </CompareContainer>
      </Modal>
    </Wrapper>
  )
}

export default SimilarValues

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.open ? 'flex' : 'none')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  justify-content: center;
  align-items: center;
  z-index: 999;
  top: 0;
  left: 0;
  transition: all 0.5s ease-in-out;
`
const Modal = styled.div`
  position: fixed;
  max-width: 1000px;
  min-height: 300px;
  max-height: 800px;
  width: 100%;
  height: 80%;
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  backdrop-filter: blur(22px);
  z-index: 1000;
  overflow: hidden;

  .loader {
    margin-top: 1rem;
    width: 50px;
    aspect-ratio: 1;
    display: grid;
    border-radius: 50%;
    background: linear-gradient(
          0deg,
          rgb(0 0 0/50%) 30%,
          #0000 0 70%,
          rgb(0 0 0/100%) 0
        )
        50%/8% 100%,
      linear-gradient(90deg, rgb(0 0 0/25%) 30%, #0000 0 70%, rgb(0 0 0/75%) 0)
        50%/100% 8%;
    background-repeat: no-repeat;
    animation: l23 1s infinite steps(12);
  }
  .loader::before,
  .loader::after {
    content: '';
    grid-area: 1/1;
    border-radius: 50%;
    background: inherit;
    opacity: 0.915;
    transform: rotate(30deg);
  }
  .loader::after {
    opacity: 0.83;
    transform: rotate(60deg);
  }
  @keyframes l23 {
    100% {
      transform: rotate(1turn);
    }
  }
`
const TitleContainer = styled.div`
  position: absolute;
  width: 95%;
  top: 15px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.div`
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: 500;
  color: #888;
`

const CloseIcon = styled(AiOutlineClose)`
  font-size: 1.2rem;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #444;
  }
`

const Content = styled.div`
  position: relative;
  margin-top: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
`

const Table = styled.table`
  position: relative;
  width: 95%;
  min-width: 800px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  border-radius: 10px;
  overflow: auto;
  // border: 1px solid #888;
  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  &::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  tr {
    width: 98%;
    height: auto;
    padding: 0.2rem;
    display: flex;
    justify-content: space-evenly;
    // border-bottom: 1px solid #ccc;
    // border: 1px solid #888;
    margin: 0 0.5rem;
    background: #d2e9e9;
    border-radius: 5px;
    // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  th {
    width: 10%;
    height: auto;
    padding: 0.2rem 0.4rem;
    font-size: 0.6rem;
    letter-spacing: 1px;
    display: flex;
    white-space: nowrap;
    justify-content: center;
  }
  td {
    width: 10%;
    height: auto;
    padding: 0.2rem 0.4rem;
    font-size: 0.6rem;
    white-space: nowrap;
    display: flex;
    justify-content: center;
  }
  .head {
    background: #ffffff;
    box-shadow: none;
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  .firstData {
    background: #d8e8e8;
    margin-bottom: 0.5rem;
    border-bottom: none;
  }
`

const Button = styled.button`
  padding: 0.3rem 0.4rem;
  border: none;
  font-size: 0.6rem;
  letter-spacing: 0.6px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  background-color: #7aa2e3;
  color: #fff;
  transition: all 0.3s ease-in-out;
  opacity: 70%;
  &:hover {
    opacity: 100%;
  }
`
const CompareContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 888;
  transform: ${(props) =>
    props.open ? 'translate(0,0)' : 'translate(0,100%)'};
  transition: all 0.5s ease-in-out;

  .title {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    margin-bottom: 10px;
    z-index: 1001;
    background-color: #fff;
  }
`

const DownArrow = styled(BsArrowDownSquareFill)`
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 1000;
  font-size: 1.2rem;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #444;
  }
`

const JSONContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80%;
  max-height: 800px;
  overflow: auto;
  margin: 0 1rem;
  background-color: #ffffff;
  &::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
`

const JSONBox = styled.div`
  flex: 1;
  width: 50%;
  margin: 0 5px;
  pre {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    overflow: hidden;
    margin: 0;
  }
`
