import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { AutoComplete, Input, Select, message } from 'antd'
import { useStates } from '../../utils/StateProvider'
import axios from 'axios'

const { Option } = Select

const NewRequest = () => {
  const {
    errors,
    setErrors,
    newItem,
    setNewItem,
    InitialErrors,
    InitialItem,
    setEndUserRequestOpen,
    endUserRequestList,
    setEndUserRequestList,
    Requestdependencies,
    setRequestDependencies,
  } = useStates()

  const [loading, setLoading] = useState(false)

  const [projectoptions, setProjectOptions] = useState([])
  const [employeeOptions, setEmployeeOptions] = useState([])
  const [itemgroupoptions, setItemGroupOptions] = useState([])
  const [productTypeoptions, setProductTypeOptions] = useState([])
  const [productClassoptions, setProductClassOptions] = useState([])
  const [productLineoptions, setProductLineOptions] = useState([])
  const [costComponentoptions, setCostComponentOptions] = useState([])
  const [uomOptions, setUOMOptions] = useState([])
  const [groupCodeOptions, setGroupCodeOptions] = useState([])

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
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/project/search`,
        { searchTerm: newItem.site ? newItem.site : '' },
        Cookie
      )
      let project = response?.data?.data || []
      setRequestDependencies({
        ...Requestdependencies,
        projects: project,
      })

      setProjectOptions(
        project.map((record) => ({
          Description: `${record.id} - ${record.description}`,
          value: record.description,
          id: record.id,
        }))
      )
    }
    fetchDependencies()
  }, [newItem.site])

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const Cookie = CookiesData()
        const response = await axios.post(
          'https://mdm.p360.build/v1/mdm/employee/search/0/50',
          { searchTerm: newItem.requester || '' },
          Cookie
        )
        const empData = response?.data?.data || []

        // Create a map to ensure unique entries
        const uniqueOptions = new Map()
        empData.forEach((record) => {
          if (!uniqueOptions.has(record.description)) {
            uniqueOptions.set(record.description, {
              Description: `${record.id} - ${record.description}`,
              value: record.description,
              id: record.id,
            })
          }
        })

        setRequestDependencies({
          ...Requestdependencies,
          employees: empData,
        })

        setEmployeeOptions([...uniqueOptions.values()])
      } catch (error) {
        console.error('Error fetching dependencies:', error)
      }
    }

    fetchDependencies()
  }, [newItem.requester])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newItem.itemType) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `https://mdm.p360.build/v1/mdm/product-link/item-group/${newItem.itemType}`,
          { searchTerm: newItem.itemGroup ? newItem.itemGroup : '' },
          Cookie
        )
        let itemGroup = response?.data?.data || []
        setRequestDependencies({
          ...Requestdependencies,
          itemGroups: itemGroup,
        })

        setItemGroupOptions(
          itemGroup.map((record) => ({
            Description: `${record.id} - ${record.description}`,
            value: record.description,
            id: record.id,
          }))
        )
      }
    }

    fetchDependencies()
  }, [newItem.itemGroup])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newItem.itemGroupId) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `https://mdm.p360.build/v1/mdm/product-link/product-type/${newItem.itemGroupId}`,
          { searchTerm: newItem.productType ? newItem.productType : '' },
          Cookie
        )
        let productType = response?.data?.data || []
        setRequestDependencies({
          ...Requestdependencies,
          productTypes: productType,
        })

        setProductTypeOptions(
          productType.map((record) => ({
            Description: `${record.id} - ${record.description}`,
            value: record.description,
            id: record.id,
          }))
        )
      }
    }

    fetchDependencies()
  }, [newItem.productType, newItem.itemGroup, newItem.itemGroupId])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newItem.productTypeId) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `https://mdm.p360.build/v1/mdm/product-link/product-class/${newItem.productTypeId}`,
          { searchTerm: newItem.productClass ? newItem.productClass : '' },
          Cookie
        )
        let productClass = response?.data?.data || []
        setRequestDependencies({
          ...Requestdependencies,
          productClasses: productClass,
        })

        setProductClassOptions(
          productClass.map((record) => ({
            Description: `${record.id} - ${record.description}`,
            value: record.description,
            id: record.id,
          }))
        )
      }
    }

    fetchDependencies()
  }, [newItem.productClass, newItem.productTypeId, newItem.productType])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newItem.productClassId) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `https://mdm.p360.build/v1/mdm/product-link/product-line/${newItem.productClassId}`,
          { searchTerm: newItem.productLine ? newItem.productLine : '' },
          Cookie
        )
        let productLine = response?.data?.data || []
        setRequestDependencies({
          ...Requestdependencies,
          productLines: productLine,
        })

        setProductLineOptions(
          productLine.map((record) => ({
            Description: `${record.id} - ${record.description}`,
            value: record.description,
            id: record.id,
          }))
        )
      }
    }

    fetchDependencies()
  }, [newItem.productLine, newItem.productClassId, newItem.productClass])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/uom/search`,
        { searchTerm: newItem.uomDesc ? newItem.uomDesc : '' },
        Cookie
      )
      let UOM = response?.data?.data || []
      setRequestDependencies({
        ...Requestdependencies,
        UOMs: UOM,
      })

      setUOMOptions(
        UOM.map((record) => ({
          Description: `${record.unit} - ${record.unitDescription}`,
          uomId: record.uomId,
          value: record.unitDescription,
          id: record.unit,
        }))
      )
    }
    fetchDependencies()
  }, [newItem.uomDesc])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/cost-component/fetch-by-cost-component-type/material`,
        {
          searchTerm: newItem.materialCostComponent
            ? newItem.materialCostComponent
            : '',
        },
        Cookie
      )
      let costComponent = response?.data?.data || []
      setRequestDependencies({
        ...Requestdependencies,
        costComponents: costComponent,
      })

      setCostComponentOptions(
        costComponent.map((record) => ({
          Description: `${record.costComponentId} - ${record.costComponentDescription}`,
          value: record.costComponentDescription,
          id: record.costComponentId,
        }))
      )
    }
    fetchDependencies()
  }, [newItem.materialCostComponent])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/group-code/search`,
        { searchTerm: newItem.groupCode ? newItem.groupCode : '' },
        Cookie
      )
      let groupCode = response?.data?.data || []
      setRequestDependencies({
        ...Requestdependencies,
        groupCodes: groupCode,
      })

      setGroupCodeOptions(
        groupCode.map((record) => ({
          Description: `${record.groupCode} - ${record.groupName}`,
          value: record.groupName,
          id: record.groupCode,
        }))
      )
    }
    fetchDependencies()
  }, [newItem.groupCode])

  const ValueChange = (field, value) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      [field]: value,
      generatedDescription: `${prevItem?.productClass} ${prevItem?.productLine} ${prevItem.specifications}`,
    }))
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
  }

  const CancelRequest = () => {
    setEndUserRequestOpen(false)
    setNewItem(InitialItem)
    setErrors(InitialErrors)
  }

  const SubmitItem = async () => {
    const fieldErrors = {}
    if (!newItem.site) {
      fieldErrors.site = 'Project required'
    }
    if (!newItem.requester) {
      fieldErrors.requester = 'Requester required'
    }
    if (!newItem.phoneNumber) {
      fieldErrors.phoneNumber = 'Phone Number required'
    }
    if (!newItem.requirementDesc) {
      fieldErrors.requirementDesc = 'Requirement Description required'
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return false
    }
    if (
      newItem.site &&
      newItem.requester &&
      newItem.phoneNumber &&
      newItem.requirementDesc
    ) {
      try {
        const Cookie = CookiesData()
        setLoading(true)
        const response = await axios.post(
          'https://mdm.p360.build/v1/mdm/purchase-item/create',
          newItem,
          Cookie
        )
        console.log(response.data)
        setNewItem(InitialItem)
        setEndUserRequestOpen(false)
        setEndUserRequestList([response.data.data, ...endUserRequestList])
        message.success('Your Item has been Successfully Submitted')
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Styles>
        {loading && (
          <LoadingContainer>
            <div className='loader' />
          </LoadingContainer>
        )}
        <UserForm>
          <Section>
            <SectionTitle>Contact Information</SectionTitle>
            <GridContainer>
              <Container>
                <label>Site Description *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.site}
                  // readOnly={true}
                  placeholder='Select Project'
                  options={projectoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  // onSearch={ItemGroupDescriptionSearch}
                  onChange={(value) => {
                    ValueChange('site', value)
                  }}
                  onBlur={() => {
                    const OptionValue = projectoptions.find(
                      (option) => option.value === newItem.site
                    )
                    if (OptionValue) {
                      ValueChange('siteId', OptionValue.id)
                    } else {
                      ValueChange('site', '')
                      ValueChange('siteId', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                  // onFocus={(e) => FieldFocas('Item Group', 'item-group')}
                />
                {errors.site && <ErrorMessage>{errors.site}</ErrorMessage>}
              </Container>
              <Container>
                <label>Requester *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.requester}
                  // readOnly={true}
                  placeholder='Select Employee'
                  options={employeeOptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  // disabled

                  onChange={(value) => {
                    ValueChange('requester', value)
                  }}
                  onBlur={() => {
                    const OptionValue = employeeOptions.find(
                      (option) => option.value === newItem.requester
                    )
                    if (OptionValue) {
                      ValueChange('requesterId', OptionValue.id)
                    } else {
                      ValueChange('requester', '')
                      ValueChange('requesterId', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                  // onFocus={(e) => FieldFocas('Item Group', 'item-group')}
                />
                {errors.requester && (
                  <ErrorMessage>{errors.requester}</ErrorMessage>
                )}
              </Container>
              <Container>
                <label>Phone Number *</label>
                <INPUT
                  type='tel'
                  allowClear
                  placeholder='Enter Phone Number'
                  value={newItem.phoneNumber}
                  maxLength={10}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      ValueChange('phoneNumber', e.target.value)
                    }
                  }}
                />
                {errors.phoneNumber && (
                  <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
                )}
              </Container>
            </GridContainer>
          </Section>
          <Section>
            <SectionTitle>Material Information</SectionTitle>
            <Container>
              <label style={{ marginLeft: '1rem' }}>
                Requirement Description *
              </label>
              <textarea
                type='textarea'
                placeholder='Enter Your Information about material'
                value={newItem.requirementDesc}
                rows={3}
                allowClear
                onChange={(e) => {
                  ValueChange('requirementDesc', e.target.value)
                }}
                style={{
                  margin: '0 4rem 0 1rem',
                  minHeight: '3rem',
                  maxHeight: '3rem',
                  minWidth: '95%',
                  maxWidth: '95%',
                }}
              />
              {errors.requirementDesc && (
                <ErrorMessage style={{ marginLeft: '1rem' }}>
                  {errors.requirementDesc}
                </ErrorMessage>
              )}
            </Container>
          </Section>
          <Section>
            <SectionTitle>Item Information</SectionTitle>
            <GridContainer>
              <Container>
                <label>Item Type *</label>
                <Select
                  value={newItem.itemType}
                  onChange={(value) => ValueChange('itemType', value)}
                  placeholder='Select Item Type'
                >
                  {/* <option value='' selected disabled>
                    Select Item Type
                  </option> */}
                  <Option value='purchase'>Purchase</Option>
                  <Option value='subcontract-service' disabled>
                    Sub-Contract Service
                  </Option>
                </Select>
              </Container>
              <Container>
                <label>Item Group</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.itemGroup}
                  // readOnly={true}
                  placeholder='Enter Item Group'
                  options={itemgroupoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  disabled={newItem.productType}
                  onChange={(value) => {
                    ValueChange('itemGroup', value)
                  }}
                  onBlur={() => {
                    const OptionValue = itemgroupoptions.find(
                      (option) => option.value === newItem.itemGroup
                    )
                    if (OptionValue) {
                      ValueChange('itemGroupId', OptionValue.id)
                    } else {
                      ValueChange('itemGroup', '')
                      ValueChange('itemGroupId', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                  // onFocus={(e) => FieldFocas('Item Group', 'item-group')}
                />
              </Container>
              <Container>
                <label>Product Type</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.productType}
                  // readOnly={true}
                  placeholder='Enter Product Type'
                  options={productTypeoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  disabled={newItem.productClass}
                  onChange={(value) => {
                    ValueChange('productType', value)
                  }}
                  onBlur={() => {
                    const OptionValue = productTypeoptions.find(
                      (option) => option.value === newItem.productType
                    )
                    if (OptionValue) {
                      ValueChange('productTypeId', OptionValue.id)
                      console.log(OptionValue)
                    } else {
                      ValueChange('productType', '')
                      ValueChange('productTypeId', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>

              <Container>
                <label>Product Class</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.productClass}
                  // readOnly={true}
                  placeholder='Enter Product Class'
                  options={productClassoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  disabled={newItem.productLine}
                  onChange={(value) => {
                    ValueChange('productClass', value)
                    ValueChange(
                      'detailedDescription',
                      `${value} ${newItem.productLine}  ${newItem.specifications}`
                    )
                  }}
                  onBlur={() => {
                    const OptionValue = productClassoptions.find(
                      (option) => option.value === newItem.productClass
                    )
                    if (OptionValue) {
                      ValueChange('productClassId', OptionValue.id)
                      console.log(OptionValue)
                    } else {
                      ValueChange('productClass', '')
                      ValueChange('productClassId', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>
              <Container>
                <label>Product Line</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.productLine}
                  // readOnly={true}
                  placeholder='Enter Product Line'
                  options={productLineoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  onChange={(value) => {
                    ValueChange('productLine', value)
                    ValueChange(
                      'detailedDescription',
                      `${newItem.productClass} ${value} ${newItem.specifications}`
                    )
                  }}
                  onBlur={() => {
                    const OptionValue = productLineoptions.find(
                      (option) => option.value === newItem.productLine
                    )
                    if (OptionValue) {
                      ValueChange('productLineId', OptionValue.id)
                      console.log(OptionValue)
                    } else {
                      ValueChange('productLine', '')
                      ValueChange('productLineId', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>

              <Container>
                <label>Specifications</label>
                <INPUT
                  type='text'
                  allowClear
                  placeholder='Enter specifications'
                  value={newItem.specifications}
                  onChange={(e) => {
                    ValueChange('specifications', e.target.value)
                    ValueChange(
                      'detailedDescription',
                      `${newItem.productClass} ${newItem.productLine} ${e.target.value}`
                    )
                  }}
                />
              </Container>
              <Container>
                <label>Generated Description</label>
                <StyledDependencies
                  type='text'
                  placeholder='Generated Description'
                  value={newItem.generatedDescription}
                  disabled
                />
              </Container>

              <Container>
                <label>Unit Of Measurement</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.uomDesc}
                  // readOnly={true}
                  placeholder='Enter Unit of Measurement'
                  options={uomOptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  onChange={(value) => {
                    ValueChange('uomDesc', value)
                  }}
                  onBlur={() => {
                    const OptionValue = uomOptions.find(
                      (option) => option.value === newItem.uomDesc
                    )
                    if (OptionValue) {
                      ValueChange('uomId', OptionValue.uomId)
                      ValueChange('uom', OptionValue.id)
                      ValueChange('purchaseUnit', OptionValue.id)
                      ValueChange('purchasePriceUnit', OptionValue.id)
                      ValueChange('purchaseUnitId', OptionValue.uomId)
                      ValueChange('purchasePriceUnitId', OptionValue.uomId)
                    } else {
                      ValueChange('uomDesc', '')
                      ValueChange('uom', '')
                      ValueChange('uomId', '')
                      ValueChange('purchaseUnit', '')
                      ValueChange('purchasePriceUnit', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>
              <Container>
                <label>Purchase Price</label>
                <INPUT
                  // readOnly={true}
                  type='text'
                  allowClear
                  placeholder='Enter Purchase Price'
                  // onFocus={() => FieldFocas('Units')}
                  value={newItem.purchasePrice}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      ValueChange('purchasePrice', e.target.value)
                    }
                  }}
                />
              </Container>
            </GridContainer>
            <GridContainer>
              <Container>
                <label>Detailed Description</label>
                <div className='textCount'>{`${newItem.detailedDescription.length} / 150`}</div>
                <INPUT
                  type='text'
                  placeholder='Detailed Description'
                  value={newItem.detailedDescription}
                  maxLength={150}
                  onChange={(e) => {
                    ValueChange('detailedDescription', e.target.value)
                  }}
                  // disabled
                />
              </Container>
            </GridContainer>
          </Section>

          <Section>
            <SectionTitle>Additional Information</SectionTitle>
            <GridContainer>
              <Container>
                <label>HSN Code</label>
                <INPUT
                  type='text'
                  allowClear
                  maxLength={8}
                  placeholder='Enter HSN Code'
                  value={newItem.hsnCode}
                  onChange={(e) => {
                    ValueChange('hsnCode', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Cost Component</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.materialCostComponent}
                  // readOnly={true}
                  placeholder='Material Cost Component'
                  options={costComponentoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  onChange={(value) => {
                    ValueChange('materialCostComponent', value)
                  }}
                  onBlur={() => {
                    const OptionValue = costComponentoptions?.find(
                      (option) => option.value === newItem.materialCostComponent
                    )
                    if (OptionValue) {
                      ValueChange('materialCostComponentId', OptionValue.id)
                      console.log(OptionValue)
                    } else {
                      ValueChange('materialCostComponent', '')
                      ValueChange('materialCostComponentId', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>
              <Container>
                <label>Group Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.groupCode}
                  // readOnly={true}
                  placeholder='Group Code'
                  options={groupCodeOptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  onChange={(value) => {
                    ValueChange('groupCode', value)
                  }}
                  onBlur={() => {
                    const OptionValue = groupCodeOptions.find(
                      (option) => option.value === newItem.groupCode
                    )
                    if (OptionValue) {
                      ValueChange('groupCodeId', OptionValue.id)
                    } else {
                      ValueChange('groupCodeId', '')
                      ValueChange('groupCode', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>
            </GridContainer>
          </Section>
        </UserForm>
        <ButtonContainer>
          <button className='cancel' onClick={CancelRequest}>
            Cancel
          </button>
          {/* <button className='save'>Save As Draft</button> */}
          <button className='submit' onClick={SubmitItem}>
            Submit
          </button>
        </ButtonContainer>
      </Styles>
    </>
  )
}

export default NewRequest

const Styles = styled.div`
  padding: 1rem 2rem;
  overflow-y: hidden;
`

const UserForm = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem 2rem;
  margin: 0rem 1rem 1rem 1rem;
  @media screen and (min-width: 1550px) {
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;
  overflow-x: hidden;
  position: relative;

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
  input[type='file']::file-selector-button {
    display: none;
    cursor: pointer;
  }
  .textCount {
    position: absolute;
    top: 2px;
    right: 10px;
    font-size: 10px;
    letter-spacing: 0.5px;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  top: 0rem;
  right: 2rem;
  .cancel {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    background: #616366;
    color: #fff;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background: #77838f;
    }
  }

  .save {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    background: #839684;
    color: #fff;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background: #6b856d;
    }
  }

  .submit {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    background: #49619f;
    color: #fff;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background: #31425b;
    }
  }
`
const ErrorMessage = styled.p`
  margin: 0;
  color: red;
  font-size: 0.6rem;
`

// const Zoom = styled.div`
//   position: absolute;
//   bottom: ${(props) => (props.open ? '0' : '-100%')};
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: #e6f3f8;
//   transition: bottom 0.5s ease-in-out;

//   h1 {
//     margin-left: 3rem;
//     color: #49619f;
//     font-family: 'Open Sans', sans-serif;
//     letter-spacing: 0.6px;
//     font-size: 1.2rem;
//     margin-top: 1rem;
//   }
// `
// const Select = styled.select`
//   border-radius: 0.5rem;
//   border: 1px solid #ccc;
//   font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
//     Helvetica, Arial, sans-serif;
//   padding: 0.5rem;
//   font-size: 0.8rem;
//   cursor: pointer;
//   &:focus {
//     outline: none;
//   }
//   option {
//     cursor: pointer;
//     font-family: 'Open Sans', sans-serif;
//     padding: 0.5rem !important;
//     &:focus {
//       outline: none;
//     }
//   }
// `

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .loader {
    font-weight: bold;
    font-family: monospace;
    font-size: 30px;
    display: inline-grid;
    overflow: hidden;
  }
  .loader:before,
  .loader:after {
    content: 'Loading...';
    grid-area: 1/1;
    clip-path: inset(0 -200% 50%);
    text-shadow: -10ch 0 0;
    animation: l12 1s infinite;
  }
  .loader:after {
    clip-path: inset(50% -200% 0%);
    text-shadow: 10ch 0 0;
    --s: -1;
  }
  @keyframes l12 {
    50%,
    100% {
      transform: translateX(calc(var(--s, 1) * 100%));
    }
  }
`

const INPUT = styled(Input)`
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
    Helvetica, Arial, sans-serif;
  padding: 0.3rem 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
`

const StyledDependencies = styled(AutoComplete)`
  position: relative;
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
  .ant-select-dropdown {
    max-width: 100% !important;
    overflow-x: auto !important;
  }

  .ant-select-dropdown .ant-select-item-option-active,
  .ant-select-dropdown .ant-select-item-option-selected {
    font-size: 0.6rem !important;
  }
`
