import React, { useEffect, useMemo, useState } from 'react'
import { AutoComplete, Select, message } from 'antd'
import styled from 'styled-components'
import { useStates } from '../../../utils/StateProvider'
import axios from 'axios'

const { Option } = Select

const NewCombination = () => {
  const {
    newCombinationopen,
    setNewCombinationOpen,
    newProductLink,
    setNewProductLink,
    IntialProductLink,
    dependencies,
    setDependencies,
    productlinkList,
    setProductLinkList,
    userRole,
    testUrl,
  } = useStates()
  const [itemgroupoptions, setItemGroupOptions] = useState([])
  const [productTypeoptions, setProductTypeOptions] = useState([])
  const [productClassoptions, setProductClassOptions] = useState([])
  const [productLineoptions, setProductLineOptions] = useState([])

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
    const fetchDependencies = async () => {
      if (newProductLink.itemType) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `${testUrl}/v1/mdm/item-group/search`,
          {
            idSearchTerm: '',
            descSearchTerm: newProductLink.itemGroup
              ? newProductLink.itemGroup
              : '',
          },
          Cookie
        )
        let itemGroup = response?.data?.data || []
        setDependencies({
          ...dependencies,
          itemGroups: itemGroup,
        })

        const uniqueOptions = new Map()
        itemGroup.forEach((record) => {
          if (!uniqueOptions.has(record.itemGroupDescription)) {
            uniqueOptions.set(record.itemGroupDescription, {
              value: record.itemGroupDescription,
              id: record.itemGroupId,
            })
          }
        })
        setItemGroupOptions([...uniqueOptions.values()])
      }
    }

    fetchDependencies()
  }, [newProductLink.itemGroup])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newProductLink.itemGroup) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `${testUrl}/v1/mdm/product-type/search`,
          {
            idSearchTerm: '',
            descSearchTerm: newProductLink.productType
              ? newProductLink.productType
              : '',
          },
          Cookie
        )
        let productType = response?.data?.data || []
        setDependencies({
          ...dependencies,
          productTypes: productType,
        })

        const uniqueOptions = new Map()
        productType.forEach((record) => {
          if (!uniqueOptions.has(record.productTypeDescription)) {
            uniqueOptions.set(record.productTypeDescription, {
              value: record.productTypeDescription,
              id: record.productTypeId,
            })
          }
        })
        setProductTypeOptions([...uniqueOptions.values()])
      }
    }

    fetchDependencies()
  }, [
    newProductLink.productType,
    newProductLink.itemGroup,
    newProductLink.itemGroupId,
  ])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newProductLink.productType) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `${testUrl}/v1/mdm/product-class/search`,
          {
            idSearchTerm: '',
            descSearchTerm: newProductLink.productClass
              ? newProductLink.productClass
              : '',
          },
          Cookie
        )
        let productClass = response?.data?.data || []
        setDependencies({
          ...dependencies,
          productClasses: productClass,
        })

        const uniqueOptions = new Map()
        productClass.forEach((record) => {
          if (!uniqueOptions.has(record.productClassDescription)) {
            uniqueOptions.set(record.productClassDescription, {
              value: record.productClassDescription,
              id: record.productClassId,
            })
          }
        })
        setProductClassOptions([...uniqueOptions.values()])
      }
    }

    fetchDependencies()
  }, [
    newProductLink.productClass,
    newProductLink.productTypeId,
    newProductLink.productType,
  ])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newProductLink.productClass) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `${testUrl}/v1/mdm/product-line/search`,
          {
            idSearchTerm: '',
            descSearchTerm: newProductLink.productLine
              ? newProductLink.productLine
              : '',
          },
          Cookie
        )
        let productLine = response?.data?.data || []
        setDependencies({
          ...dependencies,
          productLines: productLine,
        })

        const uniqueOptions = new Map()
        productLine.forEach((record) => {
          if (!uniqueOptions.has(record.productLineDescription)) {
            uniqueOptions.set(record.productLineDescription, {
              value: record.productLineDescription,
              id: record.productLineId,
            })
          }
        })
        setProductLineOptions([...uniqueOptions.values()])
      }
    }

    fetchDependencies()
  }, [
    newProductLink.productLine,
    newProductLink.productClassId,
    newProductLink.productClass,
  ])

  const VerifyField = async (prop) => {
    try {
      const Cookie = CookiesData()
      const response = await axios.post(
        `${testUrl}/v1/mdm/product-link/verify`,
        newProductLink,
        Cookie
      )

      const existingData = response.data.data

      if (existingData) {
        const existingValue = existingData[prop]
        const newValue = newProductLink[prop]
        if (existingValue && existingValue !== newValue) {
          switch (prop) {
            case 'itemType':
              ValueChange('itemGroup', '')
              ValueChange('itemGroupId', '')
              alert(
                `This value is already linked to ItemType. Existing value: ${existingValue}`
              )
              break
            case 'itemGroup':
              ValueChange('productType', '')
              ValueChange('productTypeId', '')
              alert(
                `This value is already linked to ItemGroup. Existing value: ${existingValue}`
              )
              break
            case 'productType':
              ValueChange('productClass', '')
              ValueChange('productClassId', '')
              alert(
                `This value is already linked to ProductType. Existing value: ${existingValue}`
              )
              break
            case 'productClass':
              ValueChange('productLine', '')
              ValueChange('productLineId', '')
              alert(
                `This value is already linked to ProductClass. Existing value: ${existingValue}`
              )
              break
          }
          return false
        }
      }

      return true
    } catch (err) {
      console.log(err)
      message.error('Something Went Wrong')
      return false
    }
  }

  const PaperClose = () => {
    setNewCombinationOpen(!newCombinationopen)
    setNewProductLink(IntialProductLink)
  }

  const ResetFields = () => {
    setNewProductLink(IntialProductLink)
  }

  const ValueChange = (field, value) => {
    setNewProductLink((prevItem) => ({
      ...prevItem,
      [field]: value,
    }))
  }

  const SaveClick = async () => {
    if (
      newProductLink.itemType &&
      newProductLink.itemGroup &&
      newProductLink.productType &&
      newProductLink.productClass &&
      newProductLink.productLine
    ) {
      try {
        const response = await axios.post(
          `${testUrl}/v1/mdm/product-link/create`,
          newProductLink
        )
        console.log(response.data)
        setNewProductLink(IntialProductLink)
        setNewCombinationOpen(false)
        setProductLinkList([...productlinkList, response.data.data])
        message.success('Your Item Classification has been Successfully Added')
      } catch (err) {
        console.log(err)
        message.error('Something Went Wrong')
      }
    }
  }

  return (
    <Wrapper>
      <Top>
        <Title>New Combination</Title>
        <ButtonContainer>
          <Button className='reset' onClick={ResetFields}>
            Reset Fields
          </Button>
          <Button className='cancel' onClick={PaperClose}>
            Cancel
          </Button>
          <Button onClick={SaveClick}>Save Combination</Button>
        </ButtonContainer>
      </Top>
      <GridContainer>
        <Container>
          <label>Item Type *</label>
          <Select
            value={newProductLink.itemType}
            disabled={newProductLink.itemGroup}
            onChange={(value) => ValueChange('itemType', value)}
          >
            <Option value='purchase'>Purchase</Option>
          </Select>
        </Container>
        <Container>
          <label>Item Group</label>
          <StyledDependencies
            type='text'
            allowClear
            value={newProductLink.itemGroup}
            // readOnly={true}
            disabled={!newProductLink.itemType || newProductLink.productType}
            placeholder='Enter Item Group'
            options={itemgroupoptions}
            // onSearch={ItemGroupDescriptionSearch}
            onChange={(value) => {
              if (value === undefined || value === '') {
                ValueChange('itemGroup', '')
                ValueChange('itemGroupId', '')
              } else {
                ValueChange('itemGroup', value)
              }
            }}
            onSelect={async (value) => {
              const selectedOption = itemgroupoptions.find(
                (option) => option.value === value
              )
              if (selectedOption) {
                const VerifySuccess = await VerifyField('itemType')
                if (VerifySuccess) {
                  ValueChange('itemGroupId', selectedOption.id)
                  ValueChange('itemGroup', selectedOption.value)
                } else {
                  ValueChange('itemGroup', '')
                  ValueChange('itemGroupId', '')
                }
              } else {
                ValueChange('itemGroup', '')
                ValueChange('itemGroupId', '')
              }
            }}
            onBlur={async () => {
              const OptionValue = itemgroupoptions.find(
                (option) => option.value === newProductLink.itemGroup
              )
              if (OptionValue) {
                const VerifySuccess = await VerifyField('itemType')
                if (VerifySuccess) {
                  ValueChange('itemGroupId', OptionValue.id)
                  ValueChange('itemGroupId', OptionValue.value)
                } else {
                  ValueChange('itemGroup', '')
                  ValueChange('itemGroupId', '')
                }
                // ValueChange('itemGroupId', OptionValue.id)
              } else {
                ValueChange('itemGroup', '')
                ValueChange('itemGroupId', '')
              }

              // VerifyField('itemType')
            }}
            // popupMatchSelectWidth={false}
            popupClassName='auto-complete-dropdown'
            maxTagCount={10}
          />
        </Container>
        <Container>
          <label>Product Type</label>
          <StyledDependencies
            type='text'
            allowClear
            value={newProductLink.productType}
            disabled={!newProductLink.itemGroup || newProductLink.productClass}
            // readOnly={true}
            placeholder='Enter Product Type'
            options={productTypeoptions}
            // onSearch={ProductTypeDescriptionSearch}
            onChange={(value) => {
              if (value === undefined || value === '') {
                ValueChange('productType', '')
                ValueChange('productTypeId', '')
              } else {
                ValueChange('productType', value)
              }
            }}
            onSelect={async (value) => {
              const selectedOption = productTypeoptions.find(
                (option) => option.value === value
              )
              if (selectedOption) {
                const VerifySuccess = await VerifyField('itemGroup')

                if (VerifySuccess) {
                  ValueChange('productTypeId', selectedOption.id)
                  ValueChange('productType', selectedOption.value)
                } else {
                  ValueChange('productType', '')
                  ValueChange('productTypeId', '')
                }
              } else {
                ValueChange('productType', '')
                ValueChange('productTypeId', '')
              }
            }}
            onBlur={async () => {
              const OptionValue = productTypeoptions.find(
                (option) => option.value === newProductLink.productType
              )
              if (OptionValue) {
                const VerifySuccess = await VerifyField('itemGroup')
                if (VerifySuccess) {
                  ValueChange('productTypeId', OptionValue.id)
                  ValueChange('productType', OptionValue.value)
                } else {
                  ValueChange('productType', '')
                  ValueChange('productTypeId', '')
                }
              } else {
                ValueChange('productType', '')
                ValueChange('productTypeId', '')
              }
            }}
            // popupMatchSelectWidth={false}
            popupClassName='auto-complete-dropdown'
            maxTagCount={10}
          />
        </Container>

        <Container>
          <label>Product Class</label>
          <StyledDependencies
            type='text'
            allowClear
            value={newProductLink.productClass}
            disabled={!newProductLink.productType || newProductLink.productLine}
            // readOnly={true}
            placeholder='Enter Product Class'
            options={productClassoptions}
            // onSearch={ProductClassDescriptionSearch}
            onChange={(value) => {
              if (value === undefined || value === '') {
                ValueChange('productClass', '')
                ValueChange('productClassId', '')
              } else {
                ValueChange('productClass', value)
              }
            }}
            onSelect={async (value) => {
              const selectedOption = productClassoptions.find(
                (option) => option.value === value
              )
              if (selectedOption) {
                const VerifySuccess = await VerifyField('productType')
                if (VerifySuccess) {
                  ValueChange('productClassId', selectedOption.id)
                  ValueChange('productClass', selectedOption.value)
                } else {
                  ValueChange('productClass', '')
                  ValueChange('productClassId', '')
                }
              } else {
                ValueChange('productClass', '')
                ValueChange('productClassId', '')
              }
            }}
            onBlur={async () => {
              const OptionValue = productClassoptions.find(
                (option) => option.value === newProductLink.productClass
              )
              if (OptionValue) {
                const VerifySuccess = await VerifyField('productType')
                if (VerifySuccess) {
                  ValueChange('productClassId', OptionValue.id)
                } else {
                  ValueChange('productClass', '')
                  ValueChange('productClassId', '')
                }
                // ValueChange('productClassId', OptionValue.id)
              } else {
                ValueChange('productClass', '')
                ValueChange('productClassId', '')
              }
            }}
            // popupMatchSelectWidth={false}
            popupClassName='auto-complete-dropdown'
            maxTagCount={10}
          />
        </Container>
        <Container>
          <label>Product Line</label>
          <StyledDependencies
            type='text'
            allowClear
            value={newProductLink.productLine}
            disabled={!newProductLink.productClass}
            // readOnly={true}
            placeholder='Enter Product Line'
            options={productLineoptions}
            // onSearch={ProductLineDescriptionSearch}
            onChange={(value) => {
              if (value === undefined || value === '') {
                ValueChange('productLine', '')
                ValueChange('productLineId', '')
              } else {
                ValueChange('productLine', value)
              }
            }}
            onSelect={async (value) => {
              const selectedOption = productLineoptions.find(
                (option) => option.value === value
              )
              if (selectedOption) {
                const VerifySuccess = await VerifyField('productClass')
                if (VerifySuccess) {
                  ValueChange('productLineId', selectedOption.id)
                } else {
                  ValueChange('productLine', '')
                  ValueChange('productLineId', '')
                }
              } else {
                ValueChange('productLine', '')
                ValueChange('productLineId', '')
              }
            }}
            onBlur={async () => {
              const OptionValue = productLineoptions.find(
                (option) => option.value === newProductLink.productLine
              )
              if (OptionValue) {
                const VerifySuccess = await VerifyField('productClass')
                if (VerifySuccess) {
                  ValueChange('productLineId', OptionValue.id)
                } else {
                  ValueChange('productLine', '')
                  ValueChange('productLineId', '')
                }
                // ValueChange('productLineId', OptionValue.id)
                // console.log(OptionValue)
              } else {
                ValueChange('productLine', '')
                ValueChange('productLineId', '')
              }
            }}
            // popupMatchSelectWidth={false}
            popupClassName='auto-complete-dropdown'
            maxTagCount={10}
          />
        </Container>
      </GridContainer>
    </Wrapper>
  )
}

export default NewCombination

const Wrapper = styled.div`
  position: relative;
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const GridContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem 2rem;
  margin: 0rem 1rem 1rem 1rem;
  @media screen and (min-width: 1550px) {
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  }
  padding: 1rem 2rem;
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;

  label {
    color: #49619f;
    font-family: 'Open Sans Hebrew', sans-serif;
    font-size: 0.7rem;
    margin-bottom: 0.3rem;
  }

  textarea,
  .input {
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
    padding: 0.5rem;
    font-size: 0.7rem;
  }
  textarea:focus {
    outline: none;
  }
`
const StyledDependencies = styled(AutoComplete)`
  .ant-input {
    border-radius: 0.5rem;
    font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.5px;
  }

  .ant-select-selection-placeholder {
    font-size: 0.7rem !important;
    transition: none !important;
    pointer-events: none !important;
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
  .reset {
    background: #ccc;
  }
`
