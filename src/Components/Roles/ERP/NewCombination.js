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
  } = useStates()
  const [itemgroupoptions, setItemGroupOptions] = useState([])
  const [productTypeoptions, setProductTypeOptions] = useState([])
  const [productClassoptions, setProductClassOptions] = useState([])
  const [productLineoptions, setProductLineOptions] = useState([])

  useEffect(() => {
    const fetchDependencies = async () => {
      // if (userRole === 'ERP') {
      try {
        const [itemGroup, productType, productClass, productLine] =
          await Promise.all([
            axios.get('https://mdm.p360.build/v1/mdm/item-group/fetch-all'),
            axios.get('https://mdm.p360.build/v1/mdm/product-type/fetch-all'),
            axios.get('https://mdm.p360.build/v1/mdm/product-class/fetch-all'),
            axios.get('https://mdm.p360.build/v1/mdm/product-line/fetch-all'),
          ])

        setDependencies({
          itemGroups: itemGroup.data.data,
          productTypes: productType.data.data,
          productClasses: productClass.data.data,
          productLine: productLine.data.data,
        })

        setProductTypeOptions(
          productType.data.data.map((record) => ({
            value: record.productTypeDescription,
            id: record.productTypeId,
          }))
        )

        setProductClassOptions(
          productClass.data.data.map((record) => ({
            value: record.productClassDescription,
            id: record.productClassId,
          }))
        )

        setProductLineOptions(
          productLine.data.data.map((record) => ({
            value: record.productLineDescription,
            id: record.productLineId,
          }))
        )
      } catch (error) {
        console.error('Error:', error)
      }
      // }
    }

    fetchDependencies()
  }, [])

  const VerifyField = async (prop) => {
    try {
      const response = await axios.post(
        'https://mdm.p360.build/v1/mdm/product-link/verify',
        newProductLink
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

  const itemGroupsfilteredOptions = useMemo(
    () => (value) => {
      if (!value) {
        return dependencies.itemGroups.map((record) => ({
          value: record.itemGroupDescription,
          id: record.itemGroupId,
        }))
      }
      return dependencies.itemGroups
        .filter((record) =>
          record.itemGroupDescription
            .toLowerCase()
            .includes(value.toLowerCase())
        )
        .map((record) => ({
          value: record.itemGroupDescription,
          id: record.itemGroupId,
        }))
    },
    [dependencies.itemGroups]
  )

  const ItemGroupDescriptionSearch = (value) => {
    setItemGroupOptions(itemGroupsfilteredOptions(value))
  }

  const ProductTypefilteredOptions = useMemo(
    () => (value) => {
      if (!value) {
        return dependencies.productTypes.map((record) => ({
          value: record.productTypeDescription,
          id: record.productTypeId,
        }))
      }
      return dependencies.productTypes
        .filter((record) =>
          record.productTypeDescription
            .toLowerCase()
            .includes(value.toLowerCase())
        )
        .map((record) => ({
          value: record.productTypeDescription,
          id: record.productTypeId,
        }))
    },
    [dependencies.productTypes]
  )

  const ProductTypeDescriptionSearch = (value) => {
    setProductTypeOptions(ProductTypefilteredOptions(value))
  }

  const ProductClassfilteredOptions = useMemo(
    () => (value) => {
      if (!value) {
        return dependencies.productClasses.map((record) => ({
          value: `${record.productClassDescription}`,
          id: record.productClassId,
        }))
      }
      return dependencies.productClasses
        .filter((record) =>
          record.productClassDescription
            .toLowerCase()
            .includes(value.toLowerCase())
        )
        .map((record) => ({
          value: `${record.productClassDescription}`,
          id: record.productClassId,
        }))
    },
    [dependencies.productClasses]
  )

  const ProductClassDescriptionSearch = (value) => {
    setProductClassOptions(ProductClassfilteredOptions(value))
  }

  const ProductLinefilteredOptions = useMemo(
    () => (value) => {
      if (!value) {
        return dependencies.productLine.map((record) => ({
          value: record.productLineDescription,
          id: record.productLineId,
        }))
      }
      return dependencies.productLine
        .filter((record) =>
          record.productLineDescription
            .toLowerCase()
            .includes(value.toLowerCase())
        )
        .map((record) => ({
          value: record.productLineDescription,
          id: record.productLineId,
        }))
    },
    [dependencies.productLine]
  )

  const ProductLineDescriptionSearch = (value) => {
    setProductLineOptions(ProductLinefilteredOptions(value))
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
          'https://mdm.p360.build/v1/mdm/product-link/create',
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
            onSearch={ItemGroupDescriptionSearch}
            onChange={(value) => {
              ValueChange('itemGroup', value)
              const selectedOption = itemgroupoptions.find(
                (option) => option.value === value
              )
              if (selectedOption) {
                ValueChange('itemGroup', selectedOption.value)
                ValueChange('itemGroupId', selectedOption.id)
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
                } else {
                  ValueChange('itemGroup', '')
                }
                // ValueChange('itemGroupId', OptionValue.id)
              } else {
                ValueChange('itemGroup', '')
                ValueChange('itemGroupId', '')
              }

              // VerifyField('itemType')
            }}
            popupMatchSelectWidth={false}
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
            onSearch={ProductTypeDescriptionSearch}
            onChange={(value) => {
              const selectedOption = productTypeoptions.find(
                (option) => option.value === value
              )
              if (selectedOption) {
                ValueChange('productType', selectedOption.value)
                ValueChange('productTypeId', selectedOption.id)
              } else {
                ValueChange('productType', '')
                ValueChange('productTypeId', '')
              }
            }}
            onBlur={async () => {
              // setVerifyValue({
              //   id: newProductLink.productTypeId,
              //   desc: newProductLink.productType,
              //   parent: 'itemGroup',
              // })
              // await VerifyField('itemGroup')
              const OptionValue = productTypeoptions.find(
                (option) => option.value === newProductLink.productType
              )
              if (OptionValue) {
                const VerifySuccess = await VerifyField('itemGroup')
                if (VerifySuccess) {
                  ValueChange('productTypeId', OptionValue.id)
                } else {
                  ValueChange('productType', '')
                }
                // ValueChange('productTypeId', OptionValue.id)
                // console.log(OptionValue)
              } else {
                ValueChange('productType', '')
                ValueChange('productTypeId', '')
              }
            }}
            popupMatchSelectWidth={false}
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
            onSearch={ProductClassDescriptionSearch}
            onChange={(value) => {
              const selectedOption = productClassoptions.find(
                (option) => option.value === value
              )
              if (selectedOption) {
                ValueChange('productClass', selectedOption.value)
                ValueChange('productClassId', selectedOption.id)
              } else {
                ValueChange('productClass', '')
                ValueChange('productClassId', '')
              }
            }}
            onBlur={async () => {
              // setVerifyValue({
              //   id: newProductLink.productClassId,
              //   desc: newProductLink.productClass,
              //   parent: 'productType',
              // })
              // await VerifyField('productType')
              const OptionValue = productClassoptions.find(
                (option) => option.value === newProductLink.productClass
              )
              if (OptionValue) {
                const VerifySuccess = await VerifyField('productType')
                if (VerifySuccess) {
                  ValueChange('productClassId', OptionValue.id)
                } else {
                  ValueChange('productClass', '')
                }
                // ValueChange('productClassId', OptionValue.id)
              } else {
                ValueChange('productClass', '')
                ValueChange('productClassId', '')
              }
            }}
            popupMatchSelectWidth={false}
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
            onSearch={ProductLineDescriptionSearch}
            onChange={(value) => {
              const selectedOption = productLineoptions.find(
                (option) => option.value === value
              )
              if (selectedOption) {
                ValueChange('productLine', selectedOption.value)
                ValueChange('productLineId', selectedOption.id)
              } else {
                ValueChange('productLine', '')
                ValueChange('productLineId', '')
              }
            }}
            onBlur={async () => {
              // setVerifyValue({
              //   id: newProductLink.productLineId,
              //   desc: newProductLink.productLine,
              //   parent: 'productClass',
              // })
              // await VerifyField('productClass')
              const OptionValue = productLineoptions.find(
                (option) => option.value === newProductLink.productLine
              )
              if (OptionValue) {
                const VerifySuccess = await VerifyField('productClass')
                if (VerifySuccess) {
                  ValueChange('productLineId', OptionValue.id)
                } else {
                  ValueChange('productLine', '')
                }
                // ValueChange('productLineId', OptionValue.id)
                // console.log(OptionValue)
              } else {
                ValueChange('productLine', '')
                ValueChange('productLineId', '')
              }
            }}
            popupMatchSelectWidth={false}
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