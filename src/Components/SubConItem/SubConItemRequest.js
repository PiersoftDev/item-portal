import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { AutoComplete, Input, Select, message } from 'antd'
import { useStates } from '../../utils/StateProvider'
import axios from 'axios'

const { Option } = Select

const SubConItemRequest = () => {
  const {
    errors,
    setErrors,
    subConItem,
    setSubConItem,
    InitialErrors,
    IntialSubConItem,
    setSubConItemRequestModalopen,
    endUserRequestList,
    setEndUserRequestList,
    Requestdependencies,
    setRequestDependencies,
  } = useStates()

  const [loading, setLoading] = useState(false)

  const [projectoptions, setProjectOptions] = useState([])
  const [employeeOptions, setEmployeeOptions] = useState([])
  const [itemgroupoptions, setItemGroupOptions] = useState([])
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
        { searchTerm: subConItem.site ? subConItem.site : '' },
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
  }, [subConItem.site])

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const Cookie = CookiesData()
        const response = await axios.post(
          'https://mdm.p360.build/v1/mdm/employee/search/0/50',
          { searchTerm: subConItem.requester || '' },
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
  }, [subConItem.requester])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (subConItem.itemType) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `https://mdm.p360.build/v1/mdm/product-link/item-group/${subConItem.itemType}`,
          { searchTerm: subConItem.itemGroup ? subConItem.itemGroup : '' },
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
  }, [subConItem.itemGroup])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/uom/search`,
        { searchTerm: subConItem.uomDesc ? subConItem.uomDesc : '' },
        Cookie
      )
      let UOM = response?.data?.data || []
      setRequestDependencies({
        ...Requestdependencies,
        UOMs: UOM,
      })

      const uniqueOptions = new Map()
      UOM.forEach((record) => {
        if (!uniqueOptions.has(record.unitDescription)) {
          uniqueOptions.set(record.unitDescription, {
            Description: `${record.unit} - ${record.unitDescription}`,
            uomId: record.uomId,
            value: record.unitDescription,
            id: record.unit,
          })
        }
      })
      setUOMOptions([...uniqueOptions.values()])
    }
    fetchDependencies()
  }, [subConItem.uomDesc])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/cost-component/fetch-by-cost-component-type/material`,
        {
          searchTerm: subConItem.materialCostComponent
            ? subConItem.materialCostComponent
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
  }, [subConItem.materialCostComponent])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/group-code/search`,
        { searchTerm: subConItem.groupCode ? subConItem.groupCode : '' },
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
  }, [subConItem.groupCode])

  const ValueChange = (field, value) => {
    setSubConItem((prevItem) => ({
      ...prevItem,
      [field]: value,
      generatedDescription: `${prevItem?.productClass} ${prevItem?.productLine} ${prevItem.specifications}`,
    }))
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
  }

  const CancelRequest = () => {
    setSubConItemRequestModalopen(false)
    setSubConItem(IntialSubConItem)
    setErrors(InitialErrors)
  }

  const SubmitItem = async () => {
    const fieldErrors = {}
    if (!subConItem.site) {
      fieldErrors.site = 'Site required'
    }
    if (!subConItem.requester) {
      fieldErrors.requester = 'Requester required'
    }
    if (!subConItem.phoneNumber) {
      fieldErrors.phoneNumber = 'Phone Number required'
    }
    if (!subConItem.requirementDesc) {
      fieldErrors.requirementDesc = 'Requirement Description required'
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return false
    }
    if (
      subConItem.site &&
      subConItem.requester &&
      subConItem.phoneNumber &&
      subConItem.requirementDesc
    ) {
      try {
        const Cookie = CookiesData()
        setLoading(true)
        const response = await axios.post(
          'https://mdm.p360.build/v1/mdm/purchase-item/create',
          subConItem,
          Cookie
        )
        console.log(response.data)
        setSubConItem(IntialSubConItem)
        setSubConItemRequestModalopen(false)
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
                  value={subConItem.site}
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
                      (option) => option.value === subConItem.site
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
                  value={subConItem.requester}
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
                      (option) => option.value === subConItem.requester
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
                  value={subConItem.phoneNumber}
                  maxLength={10}
                  onChange={(e) => {
                    if (
                      !isNaN(e.target.value) &&
                      !e.target.value.startsWith(' ')
                    ) {
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
                value={subConItem.requirementDesc}
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
                <label>Description</label>
                <INPUT
                  placeholder='Description'
                  type='text'
                  maxLength={32}
                  value={subConItem.description}
                  onChange={(e) => {
                    ValueChange('description', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Item Type *</label>
                <Select
                  value={subConItem.itemType}
                  onChange={(value) => ValueChange('itemType', value)}
                  placeholder='Select Item Type'
                >
                  {/* <option value='' selected disabled>
                    Select Item Type
                  </option> */}
                  <Option value='subcontracting'>Sub-Contracting</Option>
                </Select>
              </Container>
              <Container>
                <label>Item Group</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={subConItem.itemGroup}
                  // readOnly={true}
                  placeholder='Enter Item Group'
                  options={itemgroupoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  disabled={subConItem.productType}
                  onChange={(value) => {
                    ValueChange('itemGroup', value)
                  }}
                  onBlur={() => {
                    const OptionValue = itemgroupoptions.find(
                      (option) => option.value === subConItem.itemGroup
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
                <label>Project Order System *</label>
                <Select
                  value={subConItem.projectOrderSystem}
                  onChange={(value) => ValueChange('projectOrderSystem', value)}
                  placeholder='Select Project Order System'
                >
                  <Option value='mnl'>Manual</Option>
                  <Option value='prp'>PRP</Option>
                  <Option value='prp.purchase'>PRP Warehouse Order</Option>
                  <Option value='prp.warehouse'>PRP Warehouse Order</Option>
                </Select>
              </Container>
              <Container>
                <label>Price Policy *</label>
                <Select
                  value={subConItem.pricePolicy}
                  onChange={(value) => ValueChange('pricePolicy', value)}
                  placeholder='Select Price Policy'
                >
                  <Option value='purchasePrice'>Purchase Price</Option>
                  <Option value='costPrice'>Cost Price</Option>
                </Select>
              </Container>
              <Container>
                <label>Group Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={subConItem.groupCode}
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
                      (option) => option.value === subConItem.groupCode
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
              <Container>
                <label>Currency</label>
                <INPUT
                  placeholder='Currency'
                  type='text'
                  value={subConItem.currency}
                  disabled
                  onChange={(e) => {
                    ValueChange('currency', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Control Code</label>
                <INPUT
                  placeholder='Control Code'
                  type='text'
                  value={subConItem.controlCode}
                  onChange={(e) => {
                    ValueChange('controlCode', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Control Function *</label>
                <Select
                  value={subConItem.controlFunction}
                  onChange={(value) => ValueChange('controlFunction', value)}
                  placeholder='Select Control Function'
                >
                  <Option value='costObject/controlCode'>
                    Cost Object/Control Code
                  </Option>
                  <Option value='controlCode'>Control Code</Option>
                </Select>
              </Container>
              <Container>
                <label>Cost Component</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={subConItem.costComponent}
                  // readOnly={true}
                  placeholder='Cost Component'
                  options={costComponentoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  onChange={(value) => {
                    ValueChange('materialCostComponent', value)
                  }}
                  onBlur={() => {
                    const OptionValue = costComponentoptions?.find(
                      (option) => option.value === subConItem.costComponent
                    )
                    if (OptionValue) {
                      ValueChange('materialCostComponentId', OptionValue.id)
                      console.log(OptionValue)
                    } else {
                      ValueChange('costComponent', '')
                      ValueChange('materialCostComponentId', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>
              <Container>
                <label>Commodity Code</label>
                <INPUT
                  type='text'
                  allowClear
                  maxLength={8}
                  placeholder='Enter Commodity Code'
                  value={subConItem.commodityCode}
                  onChange={(e) => {
                    ValueChange('commodityCode', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Cost Determination *</label>
                <Select
                  value={subConItem.costDetermination}
                  onChange={(value) => ValueChange('costDetermination', value)}
                  placeholder='Select Cost Determination'
                >
                  <Option value='quantity'>quantity</Option>
                  <Option value='amountOfTime'>Amount of Time</Option>
                </Select>
              </Container>
              <Container>
                <label>Unit Of Measurement</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={subConItem.uomDesc}
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
                      (option) => option.value === subConItem.uomDesc
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
                <label>Time Unit</label>
                <INPUT
                  placeholder='timeUnit'
                  type='text'
                  value={subConItem.timeUnit}
                  disabled
                  onChange={(e) => {
                    ValueChange('timeUnit', e.target.value)
                  }}
                />
              </Container>
            </GridContainer>
            <GridContainer>
              <Container>
                <label>Detailed Description</label>
                {/* <div className='textCount'>{`${subConItem.detailedDescription?.length} / 150`}</div> */}
                <INPUT
                  type='text'
                  placeholder='Detailed Description'
                  value={subConItem.detailedDescription}
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
                <label>Purchase Price</label>
                <INPUT
                  // readOnly={true}
                  type='text'
                  allowClear
                  placeholder='Enter Purchase Price'
                  // onFocus={() => FieldFocas('Units')}
                  value={subConItem.purchasePrice}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      ValueChange('purchasePrice', e.target.value)
                    }
                  }}
                />
              </Container>
              <Container>
                <label>Purchase Price Group</label>
                <INPUT
                  placeholder='Purchase Price Group'
                  type='text'
                  value={subConItem.purchasePriceGroup}
                  disabled
                />
              </Container>
              <Container>
                <label>Purchase Statistical Group</label>
                <INPUT
                  placeholder='Purchase Statistical Group'
                  value={subConItem.purchaseStatisticalGroup}
                  disabled
                  type='text'
                />
              </Container>
              <Container>
                <label>Sales Price</label>
                <INPUT
                  // readOnly={true}
                  type='text'
                  allowClear
                  placeholder='Enter Sales Price'
                  // onFocus={() => FieldFocas('Units')}
                  value={subConItem.salesPrice}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      ValueChange('salesPrice', e.target.value)
                    }
                  }}
                />
              </Container>
              <Container>
                <label>Sales Price Group</label>
                <INPUT
                  placeholder='Sales Price Group'
                  type='text'
                  value={subConItem.salesPriceGroup}
                  disabled
                />
              </Container>
              <Container>
                <label>Sales Statistical Group</label>
                <INPUT
                  placeholder='Sales Statistical Group'
                  value={subConItem.salesStatisticsGroup}
                  disabled
                  type='text'
                />
              </Container>
              <Container>
                <label>Register Process *</label>
                <Select
                  value={subConItem.registerProgress}
                  onChange={(value) => ValueChange('registerProgress', value)}
                  placeholder='Select Register Process'
                >
                  <Option value='yes'>Yes</Option>
                  <Option value='no'>No</Option>
                </Select>
              </Container>
              <Container>
                <label>Used In Schedule *</label>
                <Select
                  value={subConItem.usedInSchedule}
                  onChange={(value) => ValueChange('usedInSchedule', value)}
                  placeholder='Select Used In Schedule'
                >
                  <Option value='yes'>Yes</Option>
                  <Option value='no'>No</Option>
                </Select>
              </Container>
              <Container>
                <label>Billabale *</label>
                <Select
                  value={subConItem.billabale}
                  onChange={(value) => ValueChange('billabale', value)}
                  placeholder='Select Billabale'
                >
                  <Option value='yes'>Yes</Option>
                  <Option value='no'>No</Option>
                </Select>
              </Container>
            </GridContainer>
          </Section>
        </UserForm>
        <ButtonContainer>
          <button className='cancel' onClick={CancelRequest}>
            Cancel
          </button>
          {/* <button className='save'>Save As Draft</button> */}
          {/* <button className='submit' disabled onClick={SubmitItem}>
            Submit
          </button> */}
        </ButtonContainer>
      </Styles>
    </>
  )
}

export default SubConItemRequest

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
  .ant-select-selection-item {
    font-size: 12px;
    color: #333;
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
  border-radius: 8px;
  border: 0.5px solid #ccc;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
    Helvetica, Arial, sans-serif;
  padding: 0.4rem 0.5rem;
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
