import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AutoComplete, Checkbox, Input, Modal, Select, message } from 'antd'
import { useStates } from '../../../utils/StateProvider'
import axios from 'axios'
import CustomModal from '../../Global/CustomModal'

const { Option } = Select

const Level2ItemRequest = () => {
  const {
    errors,
    level1PendingRequest,
    setLevel1PendingRequest,
    Requestdependencies,
    setRequestDependencies,
    // setLevel1RequestModal,
    setLevel2RequestModal,
    setEndUserRequestList,
    endUserRequestList,
    setErrors,
  } = useStates()

  const [loading, setLoading] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [rejectReasonModal, setRejectReasonModal] = useState(false)
  const [costComponentoptions, setCostComponentOptions] = useState([])
  // const [uomOptions, setUOMOptions] = useState([])
  const [groupCodeOptions, setGroupCodeOptions] = useState([])

  const RejectReasonChange = (e) => {
    setRejectReason(e.target.value)
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

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/cost-component/fetch-by-cost-component-type/material`,
        {
          searchTerm: level1PendingRequest.materialCostComponent
            ? level1PendingRequest.materialCostComponent
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
  }, [level1PendingRequest.materialCostComponent])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/group-code/search`,
        {
          searchTerm: level1PendingRequest.groupCode
            ? level1PendingRequest.groupCode
            : '',
        },
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
  }, [level1PendingRequest.groupCode])

  const ValueChange = (field, value) => {
    setLevel1PendingRequest((prevItem) => ({
      ...prevItem,
      [field]: value,
      generatedDescription: `${prevItem?.productClass} ${prevItem?.productLine} ${prevItem.specifications}`,
    }))
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
  }

  const showApprovalConfirmation = () => {
    const fieldErrors = {}
    if (!level1PendingRequest.hsnCode) {
      fieldErrors.hsnCode = 'HSN required'
    }
    if (level1PendingRequest.hsnCode.length < 8) {
      fieldErrors.hsnCode = '8-Digit Code required'
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return false
    }
    Modal.confirm({
      title: 'Approval Confirmation',
      content: (
        <ConfirmationContainer>
          <Label> No Similar Items Found</Label> <Checkbox />
        </ConfirmationContainer>
      ),
      onOk: async () => await ApproveItemRequest(),
    })
  }

  const showRejectConfirmation = () => {
    setRejectReasonModal(true)
  }

  const cancelRejectConfirmation = () => {
    setRejectReason('')
    setRejectReasonModal(false)
  }

  const ApproveItemRequest = async () => {
    if (level1PendingRequest.hsnCode) {
      try {
        const Cookie = CookiesData()
        const reqbody = { ...level1PendingRequest, currentLevel: 'L3' }
        console.log(reqbody)
        setLoading(true)
        const response = await axios.put(
          'https://mdm.p360.build/v1/mdm/purchase-item/update',
          reqbody,
          Cookie
        )
        console.log(response.data)
        setLevel1PendingRequest({})
        setLevel2RequestModal(false)
        setEndUserRequestList(
          endUserRequestList.map((record) =>
            record.id === response.data.data.id
              ? { ...record, ...response.data.data }
              : record
          )
        )
        // setEndUserRequestList([...endUserRequestList, response.data.data])
        message.success('Your Item has been Successfully Submitted')
      } catch (err) {
        console.log(err)
        message.error('Submission failed')
        throw err
      } finally {
        setLoading(false)
      }
    } else {
      message.warning('Please fill all required fields')
    }
  }

  const RejectItemRequest = async () => {
    if (rejectReason) {
      try {
        const reqbody = {
          ...level1PendingRequest,
          status: 'Declined',
          comments: [...level1PendingRequest.comments, rejectReason],
        }
        const Cookie = CookiesData()
        setLoading(true)
        const response = await axios.put(
          'https://mdm.p360.build/v1/mdm/purchase-item/update',
          reqbody,
          Cookie
        )
        console.log(response.data)
        setLevel1PendingRequest({})
        setLevel2RequestModal(false)
        setEndUserRequestList(
          endUserRequestList.map((record) =>
            record.id === response.data.data.id
              ? { ...record, ...response.data.data }
              : record
          )
        )
        cancelRejectConfirmation()
        // setEndUserRequestList([...endUserRequestList, response.data.data])
      } catch (err) {
        console.log(err)
        message.error('Submission failed')
        throw err
      } finally {
        setLoading(false)
      }
    } else {
      message.warning('Please Enter Reject Reason')
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
                <label>Site Description</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={level1PendingRequest.site}
                  // readOnly={true}
                  placeholder='Select Project'
                  // options={projectoptions}
                  disabled
                  // onSearch={ItemGroupDescriptionSearch}
                  // onChange={(value) => {
                  //   ValueChange('site', value)
                  // }}
                  // onBlur={() => {
                  //   const OptionValue = projectoptions.find(
                  //     (option) => option.value === level1PendingRequest.site
                  //   )
                  //   if (OptionValue) {
                  //     ValueChange('itemGroupId', OptionValue.id)
                  //   } else {
                  //     ValueChange('site', '')
                  //     ValueChange('siteId', '')
                  //   }
                  // }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                  // onFocus={(e) => FieldFocas('Item Group', 'item-group')}
                />
                {errors.site && <ErrorMessage>{errors.site}</ErrorMessage>}
              </Container>
              <Container>
                <label>Requester</label>
                <INPUT
                  type='text'
                  allowClear
                  placeholder='Enter Your Name'
                  disabled
                  value={level1PendingRequest.requester}
                  onChange={(e) => {
                    ValueChange('requester', e.target.value)
                  }}
                />
                {errors.requester && (
                  <ErrorMessage>{errors.requester}</ErrorMessage>
                )}
              </Container>
              <Container>
                <label>Phone Number</label>
                <INPUT
                  type='tel'
                  allowClear
                  placeholder='Enter Phone Number'
                  value={level1PendingRequest.phoneNumber}
                  maxLength={10}
                  disabled
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
                value={level1PendingRequest.requirementDesc}
                rows={3}
                allowClear
                disabled
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
                <ErrorMessage>{errors.requirementDesc}</ErrorMessage>
              )}
            </Container>
          </Section>
          <Section>
            <SectionTitle>Item Information</SectionTitle>
            <GridContainer>
              <Container>
                <label>Item Type</label>
                <Select
                  value={level1PendingRequest.itemType}
                  onChange={(value) => ValueChange('itemType', value)}
                  placeholder='Select Item Type'
                  disabled
                >
                  {/* <option value='' selected disabled>
                    Select Item Type
                  </option> */}
                  <Option value='Purchase'>Purchase</Option>
                </Select>
              </Container>
              <Container>
                <label>Item Group</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={level1PendingRequest.itemGroup}
                  // readOnly={true}
                  placeholder='Enter Item Group'
                  // options={itemgroupoptions}
                  disabled
                  // onSearch={ItemGroupDescriptionSearch}
                  // onChange={(value) => {
                  //   ValueChange('itemGroup', value)
                  // }}
                  // onBlur={() => {
                  //   const OptionValue = itemgroupoptions.find(
                  //     (option) =>
                  //       option.value === level1PendingRequest.itemGroup
                  //   )
                  //   if (OptionValue) {
                  //     ValueChange('itemGroupId', OptionValue.id)
                  //   } else {
                  //     ValueChange('itemGroup', '')
                  //     ValueChange('itemGroupId', '')
                  //   }
                  // }}
                  // popupMatchSelectWidth={true}
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
                  value={level1PendingRequest.productType}
                  // readOnly={true}
                  placeholder='Enter Product Type'
                  // options={productTypeoptions}
                  disabled
                  // onSearch={ProductTypeDescriptionSearch}
                  // onChange={(value) => {
                  //   ValueChange('productType', value)
                  // }}
                  // onBlur={() => {
                  //   const OptionValue = productTypeoptions.find(
                  //     (option) =>
                  //       option.value === level1PendingRequest.productType
                  //   )
                  //   if (OptionValue) {
                  //     ValueChange('productTypeId', OptionValue.id)
                  //     console.log(OptionValue)
                  //   } else {
                  //     ValueChange('productType', '')
                  //     ValueChange('productTypeId', '')
                  //   }
                  // }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>
              {/* <Container>
                <label>Product Type</label>
                <INPUT
                  type='text'
                  allowClear
                  placeholder='Enter Product Type'
                  onFocus={() => FieldFocas('Product Types', 'product-type')}
                  value={level1PendingRequest.productType}
                  onChange={(e) => {
                    ValueChange('productType', e.target.value)
                  }}
                />
              </Container> */}

              <Container>
                <label>Product Class</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={level1PendingRequest.productClass}
                  // readOnly={true}
                  placeholder='Enter Product Class'
                  // options={productClassoptions}
                  disabled
                  // onSearch={ProductClassDescriptionSearch}
                  // onChange={(value) => {
                  //   ValueChange('productClass', value)
                  //   ValueChange(
                  //     'detailedDescription',
                  //     `${value} ${level1PendingRequest.productLine}  ${level1PendingRequest.specifications}`
                  //   )
                  // }}
                  // onBlur={() => {
                  //   const OptionValue = productClassoptions.find(
                  //     (option) =>
                  //       option.value === level1PendingRequest.productClass
                  //   )
                  //   if (OptionValue) {
                  //     ValueChange('productClassId', OptionValue.id)
                  //     console.log(OptionValue)
                  //   } else {
                  //     ValueChange('productClass', '')
                  //     ValueChange('productClassId', '')
                  //   }
                  // }}
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
                  value={level1PendingRequest.productLine}
                  // readOnly={true}
                  placeholder='Enter Product Line'
                  // options={productLineoptions}
                  disabled
                  // onSearch={ProductLineDescriptionSearch}
                  // onChange={(value) => {
                  //   ValueChange('productLine', value)
                  //   ValueChange(
                  //     'detailedDescription',
                  //     `${level1PendingRequest.productClass} ${value} ${level1PendingRequest.specifications}`
                  //   )
                  // }}
                  // onBlur={() => {
                  //   const OptionValue = productLineoptions.find(
                  //     (option) =>
                  //       option.value === level1PendingRequest.productLine
                  //   )
                  //   if (OptionValue) {
                  //     ValueChange('productLineId', OptionValue.id)
                  //     console.log(OptionValue)
                  //   } else {
                  //     ValueChange('productLine', '')
                  //     ValueChange('productLineId', '')
                  //   }
                  // }}
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
                  value={level1PendingRequest.specifications}
                  disabled
                  // onChange={(e) => {
                  //   ValueChange('specifications', e.target.value)
                  //   ValueChange(
                  //     'detailedDescription',
                  //     `${level1PendingRequest.productClass} ${level1PendingRequest.productLine} ${e.target.value}`
                  //   )
                  // }}
                />
              </Container>
              <Container>
                <label>Generated Description</label>
                <StyledDependencies
                  type='text'
                  placeholder='Generated Description'
                  value={level1PendingRequest.generatedDescription}
                  disabled
                />
              </Container>

              {/* <Container>
                <label>Standard Description</label>
                <Input
                  type='text'
                  placeholder='Standard Description'
                  value={level1PendingRequest.shortdesc}
                />
              </Container> */}
              <Container>
                <label>Unit Of Measurement</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={level1PendingRequest.uom}
                  // readOnly={true}
                  placeholder='Enter Item Group'
                  disabled
                  // options={uomOptions}
                  // onSearch={UOMDescriptionSearch}
                  // onChange={(value) => {
                  //   ValueChange('uom', value)
                  // }}
                  // onBlur={() => {
                  //   const OptionValue = uomOptions.find(
                  //     (option) => option.value === level1PendingRequest.uom
                  //   )
                  //   if (OptionValue) {
                  //     ValueChange('uomId', OptionValue.id)
                  //     console.log(OptionValue)
                  //   } else {
                  //     ValueChange('uom', '')
                  //     ValueChange('uomId', '')
                  //   }
                  // }}
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
                  value={level1PendingRequest.purchasePrice}
                  disabled
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
                <div className='textCount'>{`${level1PendingRequest.detailedDescription?.length} / 150`}</div>
                <INPUT
                  type='text'
                  placeholder='Detailed Description'
                  value={level1PendingRequest.detailedDescription}
                  maxLength={150}
                  onChange={(e) => {
                    ValueChange('detailedDescription', e.target.value)
                  }}
                  disabled
                />
              </Container>
            </GridContainer>
          </Section>

          <Section>
            <SectionTitle>Additional Information</SectionTitle>
            <GridContainer>
              <Container>
                <label>HSN Code *</label>
                <INPUT
                  type='text'
                  allowClear
                  maxLength={8}
                  placeholder='Enter HSN Code'
                  value={level1PendingRequest.hsnCode}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      ValueChange('hsnCode', e.target.value)
                    }
                  }}
                />
                {errors.hsnCode && (
                  <ErrorMessage>{errors.hsnCode}</ErrorMessage>
                )}
              </Container>
              <Container>
                <label>Cost Component</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={level1PendingRequest.materialCostComponent}
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
                      (option) =>
                        option.value ===
                        level1PendingRequest.materialCostComponent
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
                  value={level1PendingRequest.groupCode}
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
                      (option) =>
                        option.value === level1PendingRequest.groupCode
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
          {/* <button className='save'>Save As Draft</button> */}
          <button className='reject' onClick={showRejectConfirmation}>
            Reject
          </button>
          <button className='submit' onClick={showApprovalConfirmation}>
            Approve
          </button>
        </ButtonContainer>
      </Styles>
      <CustomModal
        open={rejectReasonModal}
        width='400px'
        height='250px'
        closable={false}
        footer={false}
      >
        <h5>Reject Reason</h5>
        <Container>
          <textarea
            placeholder='Enter Reject Reason'
            type='text'
            value={rejectReason}
            onChange={RejectReasonChange}
            rows={4}
            style={{
              minWidth: '300px',
              maxWidth: '300px',
              minHeight: '100px',
              maxHeight: '200px',
            }}
          />
        </Container>
        <ConfirmationButton>
          <button className='cancel' onClick={cancelRejectConfirmation}>
            Cancel
          </button>
          <button className='reject' onClick={RejectItemRequest}>
            Reject
          </button>
        </ConfirmationButton>
      </CustomModal>
    </>
  )
}

export default Level2ItemRequest

const Styles = styled.div`
  position: relative;
  padding: 0rem 1rem;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
`

const UserForm = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 65vh;
  overflow-y: auto;
  padding: 0.3rem 0;
  z-index: 99;
  &::-webkit-scrollbar {
    height: 0rem;
    width: 0.2rem;
  }
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
  position: absolute;
  bottom: 0;
  right: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  z-index: 999;
  .cancel {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    background: transparent;
    color: #111;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid #ffa62f;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      // background: #77838f;
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
    background: #799351;
    color: #fff;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      // background: #31425b;
    }
  }
  .reject {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    background: transparent;
    color: #111;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid red;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      // background: #df826c;
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
  z-index: 1000;
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

  .ant-select-dropdown .ant-select-item-option-active,
  .ant-select-dropdown .ant-select-item-option-selected {
    font-size: 0.6rem !important;
  }
`

const ConfirmationContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0.6rem;
`

const Label = styled.div`
  font-size: 0.8rem;
  letter-spacing: 0.5px;
`

const ConfirmationButton = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  display: flex;
  gap: 0.5rem;
  font-size: 1rem;

  .cancel {
    padding: 0.3rem 0.6rem;
    border: 2px solid #2a629a;
    background: transparent;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #ffa62f;
    }
  }
  .reject {
    padding: 0.3rem 0.6rem;
    border: 1.3px solid #c40c0c;
    background: #ffb2b2;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #c40c0c;
    }
  }
`
