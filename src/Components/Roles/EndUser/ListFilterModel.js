import React from 'react'
import styled from 'styled-components'
import { FiFilter } from 'react-icons/fi'
import { Select, Tag } from 'antd'
import { IoCloseSharp } from 'react-icons/io5'
import { useStates } from '../../../utils/StateProvider'
import axios from 'axios'

const { Option } = Select

const options = [
  {
    label: 'L0(End User)',
    value: 'L0',
    color: 'green',
  },
  {
    label: 'L1(Purchase)',
    value: 'L1',
  },
  {
    label: 'L2(Taxation)',
    value: 'L2',
  },
  {
    label: 'L3(PMD)',
    value: 'L3',
  },
  {
    label: 'L4(ERP)',
    value: 'L4',
  },
]
const tagRender = (props) => {
  const { color, label, value, closable, onClose } = props
  const onPreventMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginInlineEnd: 4,
      }}
    >
      {label}
    </Tag>
  )
}

const ListFilterModel = () => {
  const {
    itemListFilters,
    setItemListFilters,
    userDetails,
    setEndUserRequestList,
    itemListFilterModalopen,
    setItemListFilterModalopen,
  } = useStates()

  const ValueChange = (field, value) => {
    setItemListFilters((prevItem) => ({
      ...prevItem,
      [field]: value,
    }))
  }

  const CookiesData = () => {
    const accessToken = localStorage.getItem('accessToken')
    const Cookie = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    return Cookie
  }

  const hide = () => {
    setItemListFilterModalopen(!itemListFilterModalopen)
  }

  const ApplyNowClick = async () => {
    const Cookie = CookiesData()
    const UserId = userDetails.roles.includes('L0') ? userDetails.id : ''
    const isAdmin = userDetails?.roles?.includes('Admin') ? true : false
    try {
      const res = await axios.post(
        ' https://mdm.p360.build/v1/mdm/purchase-item/filter',
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
      hide()
    } catch (err) {
      console.error('Error fetching items:', err)
    }
  }

  const ResetClick = async () => {
    await setItemListFilters({
      itemType: '',
      status: '',
      level: '',
      searchTerm: '',
    })
    const Cookie = CookiesData()
    const UserId = userDetails.roles.includes('L0') ? userDetails.id : ''
    const isAdmin = userDetails?.roles?.includes('Admin') ? true : false
    try {
      const res = await axios.post(
        ' https://mdm.p360.build/v1/mdm/purchase-item/filter',
        {
          itemType: '',
          status: '',
          level: '',
          searchTerm: '',
          creatorId: UserId,
          pageNo: 0,
          pageSize: 100,
          isAdmin: isAdmin,
        },
        Cookie
      )
      setEndUserRequestList(res.data.data)
      hide()
    } catch (err) {
      console.error('Error fetching items:', err)
    }
  }

  return (
    <FilterModelWrapper>
      <FilterModelHeaderConatiner>
        <FilterModelFilterICon />
        <FilterModelHeaderText>Filter</FilterModelHeaderText>
        <FilterModelCloseIcon />
      </FilterModelHeaderConatiner>
      {/* <FilterLine/> */}
      <FilterFieldConatiner>
        <FilterFieldConatinerHeader>Item Type</FilterFieldConatinerHeader>
        <Select
          className='fields'
          placeholder='Select Item Type'
          value={itemListFilters.itemType}
          onChange={(value) => ValueChange('itemType', value)}
        >
          <Option value='purchase'>Purchase</Option>
          <Option value='subcon'>Subcontract</Option>
          <Option value='cost'>Cost</Option>
        </Select>
      </FilterFieldConatiner>
      {/* <FilterLine/> */}
      <FilterFieldConatiner>
        <FilterFieldConatinerHeader>Status</FilterFieldConatinerHeader>
        <Select
          className='fields'
          placeholder='Select Status'
          value={itemListFilters.status}
          onChange={(value) => ValueChange('status', value)}
        >
          <Option value='Pending'>Pending</Option>
          <Option value='Declined'>Declined</Option>
          <Option value='Draft'>Draft</Option>
          <Option value='Live'>Live</Option>
        </Select>
      </FilterFieldConatiner>
      {/* <FilterLine/> */}
      <FilterFieldConatiner>
        <FilterFieldConatinerHeader>Task Progress</FilterFieldConatinerHeader>
        <Select
          placeholder='Select Task Progress'
          className='fields'
          // mode='multiple'
          tagRender={tagRender}
          color={options.color}
          options={options}
          value={itemListFilters.level}
          onChange={(value) => ValueChange('level', value)}
        >
          <Option value='L0'>L0 (End User)</Option>
          <Option value='L1'>L1 (Purchase)</Option>
          <Option value='L2'>L2 (Taxation)</Option>
          <Option value='L3'>L3 (PMD)</Option>
          <Option value='L4'>L4 (ERP)</Option>
        </Select>
      </FilterFieldConatiner>
      {/* <FilterLine/> */}
      <FilterModelButtonContainer>
        <FilterModelResetButton onClick={ResetClick}>
          Reset
        </FilterModelResetButton>
        <FilterModelApplyButton onClick={ApplyNowClick}>
          Apply Now
        </FilterModelApplyButton>
      </FilterModelButtonContainer>
    </FilterModelWrapper>
  )
}

export default ListFilterModel

const FilterModelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 20vw;
  max-width: 250px;
  box-sizing: border-box;
  padding: 0rem !important;
  border-radius: 10px;
  // background-color: #f9f9f9;
`
// const FilterLine= styled.div`
// position:relative;
// width:100%;
// border-top:0.5px solid #ccc;
// `
const FilterModelHeaderConatiner = styled.div`
  width: 100%;
  display: flex;
  padding: 0.2rem;
  gap: 0.2rem;
  // border-bottom:1px solid #ccc;
`
const FilterModelHeaderText = styled.div`
  font-size: 0.7rem;
  position: relative;
  letter-spacing: 0.5px;
  font-weight: 700;
  color: #373a40;
`
const FilterModelFilterICon = styled(FiFilter)`
  font-size: 0.7rem;
  position: relative;
  color: #373a40;
  margin-top: 0.2rem;
  font-weight: 900;
`
const FilterModelCloseIcon = styled(IoCloseSharp)`
  font-size: 0.8rem;
  position: absolute;
  right: 0.7rem;
  cursor: pointer;
`
const FilterFieldConatiner = styled.div`
  width: 100%;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  // border-bottom:1px solid #ccc;
  .fields {
    .ant-input {
      font-size: 0.6rem !important;
      color: #b4b4b3;

      letter-spacing: 0.5px;
    }
    width: 100% !important;
    margin: 0 !important;
    .ant-select-selection-placeholder {
      font-size: 0.7rem !important;
      transition: none !important;
      color: #585c63;
      font-weight: 400;
      pointer-events: none !important;
    }
  }
`
const FilterFieldConatinerHeader = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  // color:#686D76;
  color: #9da1a8;
  font-weight: 600;
`
// const Selectors = styled.select`
// width:100%;
// font-size:0.7rem;
// border:1px solid #ccc;
// border-radius:8px;
// padding:0.4rem;
// cursor:pointer;
// &:focus{
// outline:none;
// }
// `
// const FilterFieldSelectortext = styled.div`
// width:50%;
// padding:0.2rem;
// display:flex;
// font-size:0.6rem;
// `
// const Options = styled.option`
// font-size:0.7rem;
// letter-spacing:0.5px;
// `
const FilterModelButtonContainer = styled.div`
  display: flex;
  margin-top: 0.3rem;
  padding: 0.2rem;
  width: 100%;
  justify-content: space-between;
`
const FilterModelResetButton = styled.div`
  padding: 0.5rem 0.7rem;
  background-color: #eeeeee;
  font-size: 0.7rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
`
const FilterModelApplyButton = styled.div`
  // width:30%;
  padding: 0.5rem 0.7rem;
  font-size: 0.7rem;
  background-color: #000;
  font-weight: 600;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`
