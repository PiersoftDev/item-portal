import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { AutoComplete, Checkbox, Input, Modal, Select, message } from 'antd'
import { useStates } from '../../../utils/StateProvider'
import axios from 'axios'
import CustomModal from '../../Global/CustomModal'
import { CiImageOn } from 'react-icons/ci'
const { Option } = Select

const ErpItemRequest = () => {
  const {
    errors,
    PendingRequest,
    setPendingRequest,
    Requestdependencies,
    setRequestDependencies,
    setErpRequestModal,
    setEndUserRequestList,
    endUserRequestList,
    setErrors,
    testUrl,
    imageViewModal,
    setImageViewModal,
  } = useStates()

  const [loading, setLoading] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [rejectReasonModal, setRejectReasonModal] = useState(false)
  // const [projectoptions, setProjectOptions] = useState([])
  // const [itemgroupoptions, setItemGroupOptions] = useState([])
  // const [productTypeoptions, setProductTypeOptions] = useState([])
  // const [productClassoptions, setProductClassOptions] = useState([])
  // const [productLineoptions, setProductLineOptions] = useState([])
  const [costComponentoptions, setCostComponentOptions] = useState([])
  // const [uomOptions, setUOMOptions] = useState([])
  const [groupCodeOptions, setGroupCodeOptions] = useState([])
  const [warehouseOptions, setWarehouseOptions] = useState([])

  const RejectReasonChange = (e) => {
    setRejectReason(e.target.value)
  }

  const ViewImage = () => {
    setImageViewModal(!imageViewModal)
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
        `${testUrl}/v1/mdm/warehouse/search`,
        {
          idSearchTerm: PendingRequest.warehouseId
            ? PendingRequest.warehouseId
            : '',
          descSearchTerm: PendingRequest.warehouseName
            ? PendingRequest.warehouseName
            : '',
        },
        Cookie
      )
      let warehouse = response?.data?.data || []

      const uniqueOptions = new Map()
      warehouse.forEach((record) => {
        if (!uniqueOptions.has(record.description)) {
          uniqueOptions.set(record.description, {
            // Description: `${record.id} - ${record.description}`,
            value: record.description,
            id: record.id,
          })
        }
      })

      setRequestDependencies({
        ...Requestdependencies,
        warehouses: warehouse,
      })

      setWarehouseOptions([...uniqueOptions.values()])
    }
    fetchDependencies()
  }, [PendingRequest.warehouseName])

  const ValueChange = (field, value) => {
    setPendingRequest((prevItem) => ({
      ...prevItem,
      [field]: value,
      generatedDescription: `${prevItem?.productClass} ${prevItem?.productLine} ${prevItem.specifications}`,
    }))
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
  }

  const showApprovalConfirmation = () => {
    const fieldErrors = {}
    if (!PendingRequest.warehouseName) {
      fieldErrors.warehouseName = 'Warehouse required'
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
    const fieldErrors = {}
    if (!PendingRequest.warehouseName) {
      fieldErrors.warehouseName = 'Warehouse required'
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return false
    }
    try {
      const reqbody = {
        ...PendingRequest,
        currentLevel: 'Live',
        status: 'Draft',
      }
      console.log(reqbody)
      setLoading(true)
      const Cookie = CookiesData()
      const response = await axios.put(
        `${testUrl}/v1/mdm/purchase-item/update`,
        reqbody,
        Cookie
      )
      console.log(response.data)

      setPendingRequest({})
      setErpRequestModal(false)
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
  }

  const RejectItemRequest = async () => {
    if (rejectReason) {
      try {
        const reqbody = {
          ...PendingRequest,
          status: 'Declined',
          currentLevel: 'L0',
          comments: [
            ...PendingRequest.comments,
            {
              txt: rejectReason,
              level: 'L4',
            },
          ],
        }
        setLoading(true)
        const Cookie = CookiesData()
        const response = await axios.put(
          `${testUrl}/v1/mdm/purchase-item/update`,
          reqbody,
          Cookie
        )
        console.log(response.data)
        setPendingRequest({})
        setErpRequestModal(false)
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
                <label>Site Code</label>
                <StyledDependencies
                  type='text'
                  value={PendingRequest.siteId}
                  disabled
                />
              </Container>
              <Container>
                <label>Site Description *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.site}
                  placeholder='Select Project'
                  disabled
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
                {errors.site && <ErrorMessage>{errors.site}</ErrorMessage>}
              </Container>
              <Container>
                <label>Requester *</label>
                <INPUT
                  type='text'
                  allowClear
                  placeholder='Enter Your Name'
                  disabled
                  value={PendingRequest.requester}
                  onChange={(e) => {
                    ValueChange('requester', e.target.value)
                  }}
                />
                {errors.requester && (
                  <ErrorMessage>{errors.requester}</ErrorMessage>
                )}
              </Container>
              <Container>
                <label>Requester Code</label>
                <StyledDependencies
                  type='text'
                  value={PendingRequest.requesterId}
                  disabled
                />
              </Container>
              <Container>
                <label>Phone Number *</label>
                <INPUT
                  type='tel'
                  allowClear
                  placeholder='Enter Phone Number'
                  value={PendingRequest.phoneNumber}
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
              {PendingRequest.itemImg && (
                <UploadContainer>
                  <CiImageOn className='img' onClick={ViewImage} />
                </UploadContainer>
              )}
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
                value={PendingRequest.requirementDesc}
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
                <label>Item Group Code</label>
                <StyledDependencies
                  type='text'
                  value={PendingRequest.itemGroupId}
                  disabled
                />
              </Container>
              <Container>
                <label>Item Group</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.itemGroup}
                  placeholder='Enter Item Group'
                  disabled
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>
              <Container>
                <label>Product Type Code</label>
                <StyledDependencies
                  type='text'
                  value={PendingRequest.productTypeId}
                  disabled
                />
              </Container>
              <Container>
                <label>Product Type</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.productType}
                  placeholder='Enter Product Type'
                  disabled
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>
              <Container>
                <label>Product Class Code</label>
                <StyledDependencies
                  type='text'
                  value={PendingRequest.productClassId}
                  disabled
                />
              </Container>
              <Container>
                <label>Product Class</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.productClass}
                  // readOnly={true}
                  placeholder='Enter Product Class'
                  // options={productClassoptions}
                  disabled
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>
              <Container>
                <label>Product Line Code</label>
                <StyledDependencies
                  type='text'
                  value={PendingRequest.productLineId}
                  disabled
                />
              </Container>
              <Container>
                <label>Product Line</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.productLine}
                  // readOnly={true}
                  placeholder='Enter Product Line'
                  // options={productLineoptions}
                  disabled
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
                  value={PendingRequest.specifications}
                  disabled
                />
              </Container>
              <Container>
                <label>Generated Description</label>
                <StyledDependencies
                  type='text'
                  placeholder='Generated Description'
                  value={PendingRequest.generatedDescription}
                  disabled
                />
              </Container>

              {/* <Container>
                <label>Standard Description</label>
                <Input
                  type='text'
                  placeholder='Standard Description'
                  // value={PendingRequest.shortdesc}
                />
              </Container> */}
              <Container>
                <label>Unit Code</label>
                <StyledDependencies
                  type='text'
                  value={PendingRequest.uom}
                  disabled
                />
              </Container>
              <Container>
                <label>Unit Of Measurement *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.uom}
                  // readOnly={true}
                  placeholder='Enter Item Group'
                  disabled
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
                  value={PendingRequest.purchasePrice}
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
                <div className='textCount'>{`${PendingRequest.detailedDescription?.length} / 150`}</div>
                <INPUT
                  type='text'
                  placeholder='Detailed Description'
                  value={PendingRequest.detailedDescription}
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
                <label>HSN Code</label>
                <INPUT
                  type='text'
                  allowClear
                  maxLength={8}
                  disabled
                  placeholder='Enter HSN Code'
                  value={PendingRequest.hsnCode}
                  onChange={(e) => {
                    ValueChange('hsnCode', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Cost Component Code</label>
                <StyledDependencies
                  type='text'
                  value={PendingRequest.materialCostComponentId}
                  disabled
                />
              </Container>
              <Container>
                <label>Cost Component</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.materialCostComponent}
                  // readOnly={true}
                  placeholder='Material Cost Component'
                  disabled
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                />
              </Container>
              <Container>
                <label>Group Code</label>
                <StyledDependencies
                  type='text'
                  value={PendingRequest.groupCodeId}
                  disabled
                />
              </Container>
              <Container>
                <label>Group Name</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.groupCode}
                  // readOnly={true}
                  placeholder='Group Name'
                  disabled
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
                  value={PendingRequest.currency}
                  disabled
                  onChange={(e) => {
                    ValueChange('currency', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Purchase Unit</label>
                <INPUT
                  placeholder='Purchase Unit'
                  type='text'
                  value={PendingRequest.purchaseUnit}
                  disabled
                />
              </Container>
              <Container>
                <label>Purchase Price Unit</label>
                <INPUT
                  placeholder='Purchase Price Unit'
                  type='text'
                  value={PendingRequest.purchasePriceUnit}
                  disabled
                />
              </Container>
              <Container>
                <label>Purchase Price Group</label>
                <INPUT
                  placeholder='Purchase Price Group'
                  type='text'
                  value={PendingRequest.purchasePriceGroup}
                  disabled
                />
              </Container>
              <Container>
                <label>Purchase Statistical Group</label>
                <INPUT
                  placeholder='Purchase Statistical Group'
                  value={PendingRequest.purchaseStatisticalGroup}
                  disabled
                  type='text'
                />
              </Container>
              <Container>
                <label>Item Valuation Group</label>
                <Select
                  value={PendingRequest.itemValuationGroup}
                  onChange={(value) => {
                    ValueChange('itemValuationGroup', value)
                    ValueChange('itemValuationGroupId', value)
                  }}
                  placeholder='Select Item Valuation Group'
                >
                  <Option value='MAUC'>MAUC</Option>
                </Select>
              </Container>
              <Container>
                <label>Warehouse Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.warehouseId}
                  disabled
                  // readOnly={true}
                  placeholder='Select Warehouse'
                  options={warehouseOptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  // onSearch={ItemGroupDescriptionSearch}
                  onChange={(value) => {
                    ValueChange('warehouseName', value)
                  }}
                  onBlur={() => {
                    const OptionValue = warehouseOptions.find(
                      (option) => option.value === PendingRequest.warehouseName
                    )
                    if (OptionValue) {
                      ValueChange('warehouseId', OptionValue.id)
                    } else {
                      ValueChange('warehouseName', '')
                      ValueChange('warehouseId', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                  // onFocus={(e) => FieldFocas('Item Group', 'item-group')}
                />
              </Container>
              <Container>
                <label>Warehouse *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.warehouseName}
                  disabled
                  placeholder='Select Warehouse'
                  options={warehouseOptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  // onSearch={ItemGroupDescriptionSearch}
                  // onChange={(value) => {
                  //   ValueChange('warehouseName', value)
                  // }}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('warehouseName', '')
                      ValueChange('warehouseId', '')
                    } else {
                      ValueChange('warehouseName', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = warehouseOptions.find(
                      (option) => option.value === value
                    )
                    if (selectedOption) {
                      ValueChange('warehouseId', selectedOption.id)
                    } else {
                      ValueChange('warehouseName', '')
                      ValueChange('warehouseId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = warehouseOptions.find(
                      (option) => option.value === PendingRequest.warehouseName
                    )
                    if (OptionValue) {
                      ValueChange('warehouseId', OptionValue.id)
                    } else {
                      ValueChange('warehouseName', '')
                      ValueChange('warehouseId', '')
                    }
                  }}
                  popupMatchSelectWidth={true}
                  popupClassName='auto-complete-dropdown'
                  maxTagCount={10}
                  // onFocus={(e) => FieldFocas('Item Group', 'item-group')}
                />
                {errors.warehouseName && (
                  <ErrorMessage>{errors.warehouseName}</ErrorMessage>
                )}
              </Container>
              <Container>
                <label>Order Horizon</label>
                <INPUT
                  placeholder='Order Horizon'
                  type='text'
                  value={PendingRequest.orderHorizon}
                  onChange={(e) => {
                    ValueChange('orderHorizon', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Inherit Project Peg *</label>
                <Select
                  value={PendingRequest.inheritProjectPeg}
                  onChange={(value) => ValueChange('inheritProjectPeg', value)}
                  placeholder='Select Inherit Project Peg'
                >
                  <Option value='yes'>Yes</Option>
                  <Option value='no'>No</Option>
                </Select>
              </Container>
              <Container>
                <label>Project Order System *</label>
                <Select
                  value={PendingRequest.projectOrderSystem}
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
                <label>Peg PRP Warehouse Order *</label>
                <Select
                  value={PendingRequest.pegPRPWarehouseOrder}
                  onChange={(value) =>
                    ValueChange('pegPRPWarehouseOrder', value)
                  }
                  placeholder='Select Peg PRP Warehouse Order'
                >
                  <Option value='yes'>Yes</Option>
                  <Option value='no'>No</Option>
                </Select>
              </Container>
              <Container>
                <label>Operation Cost Component</label>
                <INPUT
                  placeholder='Operation Cost Component'
                  value={PendingRequest.operationalCostComponentId}
                  disabled
                  type='text'
                />
              </Container>
              <Container>
                <label>Surcharge Cost Component</label>
                <INPUT
                  placeholder='Surcharge Cost Component'
                  value={PendingRequest.surchargeCostComponentId}
                  disabled
                  type='text'
                />
              </Container>
            </GridContainer>
          </Section>
        </UserForm>
        <ButtonContainer>
          <button
            className='reject'
            onClick={showRejectConfirmation}
            disabled={imageViewModal}
          >
            Reject
          </button>
          <button
            className='submit'
            onClick={ApproveItemRequest}
            disabled={imageViewModal}
          >
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
          <button
            className='cancel'
            onClick={cancelRejectConfirmation}
            disabled={imageViewModal}
          >
            Cancel
          </button>
          <button
            className='reject'
            onClick={RejectItemRequest}
            disabled={imageViewModal}
          >
            Reject
          </button>
        </ConfirmationButton>
      </CustomModal>
      <CustomModal open={imageViewModal} width='60%' height='60%'>
        <ImageViewerContainer>
          <SelectedImage src={PendingRequest.itemImg} />
          <ImageActions>
            <button className='cancel' onClick={ViewImage}>
              Cancel
            </button>
          </ImageActions>
        </ImageViewerContainer>
      </CustomModal>
    </>
  )
}

export default ErpItemRequest

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
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin: 0rem 1rem 1rem 1rem;
  @media screen and (min-width: 1550px) {
    grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
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
  margin: 0 0.6rem;
  color: red;
  font-size: 0.7rem;
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
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid #514b82;
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

const UploadContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  gap: 0.7rem;
  .img {
    font-size: 1.8rem;
    margin-top: 0.5rem;
    cursor: pointer;
  }
`

const ImageViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    height: 0.5rem;
    width: 0.5rem;
  }
`

const ImageActions = styled.div`
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
`
const SelectedImage = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
`
