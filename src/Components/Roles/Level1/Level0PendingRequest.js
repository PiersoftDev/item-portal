import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AutoComplete, Checkbox, Input, Modal, Select, message } from 'antd'
import { useStates } from '../../../utils/StateProvider'
import axios from 'axios'
import CustomModal from '../../Global/CustomModal'

const { Option } = Select

const Level0ItemRequest = () => {
  const {
    errors,
    endUserRequestList,
    // setEndUserRequestList,
    PendingRequest,
    setPendingRequest,
    Requestdependencies,
    setRequestDependencies,
    setLevel1RequestModal,
    setErrors,
  } = useStates()

  const [loading, setLoading] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [rejectReasonModal, setRejectReasonModal] = useState(false)
  const [projectoptions, setProjectOptions] = useState([])
  const [employeeOptions, setEmployeeOptions] = useState([])
  const [itemgroupoptions, setItemGroupOptions] = useState([])
  const [productTypeoptions, setProductTypeOptions] = useState([])
  const [productClassoptions, setProductClassOptions] = useState([])
  const [productLineoptions, setProductLineOptions] = useState([])
  const [costComponentoptions, setCostComponentOptions] = useState([])
  const [uomOptions, setUOMOptions] = useState([])
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
        `https://mdm.p360.build/v1/mdm/project/search`,
        {
          idSearchTerm: PendingRequest.siteId ? PendingRequest.siteId : '',
          descSearchTerm: PendingRequest.site ? PendingRequest.site : '',
        },
        Cookie
      )
      let project = response?.data?.data || []
      setRequestDependencies({
        ...Requestdependencies,
        projects: project,
      })

      const uniqueOptions = new Map()
      project.forEach((record) => {
        if (!uniqueOptions.has(record.description)) {
          uniqueOptions.set(record.description, {
            value: record.description,
            id: record.id,
          })
        }
      })
      setProjectOptions([...uniqueOptions.values()])
    }
    fetchDependencies()
  }, [PendingRequest.site, PendingRequest.siteId])

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const Cookie = CookiesData()
        const response = await axios.post(
          'https://mdm.p360.build/v1/mdm/employee/search/0/50',
          {
            idSearchTerm: PendingRequest.requesterId
              ? PendingRequest.requesterId
              : '',
            descSearchTerm: PendingRequest.requester
              ? PendingRequest.requester
              : '',
          },
          Cookie
        )
        const empData = response?.data?.data || []

        // Create a map to ensure unique entries
        const uniqueOptions = new Map()
        empData.forEach((record) => {
          if (!uniqueOptions.has(record.description)) {
            uniqueOptions.set(record.description, {
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
  }, [PendingRequest.requester, PendingRequest.requesterId])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (PendingRequest.itemType) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `https://mdm.p360.build/v1/mdm/product-link/item-group/${PendingRequest.itemType}`,
          {
            idSearchTerm: PendingRequest.itemGroupId
              ? PendingRequest.itemGroupId
              : '',
            descSearchTerm: PendingRequest.itemGroup
              ? PendingRequest.itemGroup
              : '',
          },
          Cookie
        )
        let itemGroup = response?.data?.data || []
        setRequestDependencies({
          ...Requestdependencies,
          itemGroups: itemGroup,
        })

        const uniqueOptions = new Map()
        itemGroup.forEach((record) => {
          if (!uniqueOptions.has(record.description)) {
            uniqueOptions.set(record.description, {
              value: record.description,
              id: record.id,
            })
          }
        })
        setItemGroupOptions([...uniqueOptions.values()])
      }
    }

    fetchDependencies()
  }, [PendingRequest.itemGroup])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (PendingRequest.itemGroupId) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `https://mdm.p360.build/v1/mdm/product-link/product-type/${PendingRequest.itemGroupId}`,
          {
            idSearchTerm: PendingRequest.productTypeId
              ? PendingRequest.productTypeId
              : '',
            descSearchTerm: PendingRequest.productType
              ? PendingRequest.productType
              : '',
          },
          Cookie
        )
        let productType = response?.data?.data || []
        setRequestDependencies({
          ...Requestdependencies,
          productTypes: productType,
        })

        const uniqueOptions = new Map()
        productType.forEach((record) => {
          if (!uniqueOptions.has(record.description)) {
            uniqueOptions.set(record.description, {
              value: record.description,
              id: record.id,
            })
          }
        })
        setProductTypeOptions([...uniqueOptions.values()])
      }
    }

    fetchDependencies()
  }, [
    PendingRequest.productType,
    PendingRequest.itemGroup,
    PendingRequest.itemGroupId,
  ])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (PendingRequest.productTypeId) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `https://mdm.p360.build/v1/mdm/product-link/product-class/${PendingRequest.productTypeId}`,
          {
            idSearchTerm: PendingRequest.productClassId
              ? PendingRequest.productClassId
              : '',
            descSearchTerm: PendingRequest.productClass
              ? PendingRequest.productClass
              : '',
          },
          Cookie
        )
        let productClass = response?.data?.data || []
        setRequestDependencies({
          ...Requestdependencies,
          productClasses: productClass,
        })

        const uniqueOptions = new Map()
        productClass.forEach((record) => {
          if (!uniqueOptions.has(record.description)) {
            uniqueOptions.set(record.description, {
              value: record.description,
              id: record.id,
            })
          }
        })
        setProductClassOptions([...uniqueOptions.values()])
      }
    }

    fetchDependencies()
  }, [
    PendingRequest.productClass,
    PendingRequest.productTypeId,
    PendingRequest.productType,
  ])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (PendingRequest.productClassId) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `https://mdm.p360.build/v1/mdm/product-link/product-line/${PendingRequest.productClassId}`,
          {
            idSearchTerm: PendingRequest.productLineId
              ? PendingRequest.productLineId
              : '',
            descSearchTerm: PendingRequest.productLine
              ? PendingRequest.productLine
              : '',
          },
          Cookie
        )
        let productLine = response?.data?.data || []
        setRequestDependencies({
          ...Requestdependencies,
          productLines: productLine,
        })

        const uniqueOptions = new Map()
        productLine.forEach((record) => {
          if (!uniqueOptions.has(record.description)) {
            uniqueOptions.set(record.description, {
              value: record.description,
              id: record.id,
            })
          }
        })
        setProductLineOptions([...uniqueOptions.values()])
      }
    }

    fetchDependencies()
  }, [
    PendingRequest.productLine,
    PendingRequest.productClassId,
    PendingRequest.productClass,
  ])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/uom/search`,
        {
          idSearchTerm: PendingRequest.uom ? PendingRequest.uom : '',
          descSearchTerm: PendingRequest.uomDesc ? PendingRequest.uomDesc : '',
        },
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
  }, [PendingRequest.uomDesc])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/cost-component/fetch-by-cost-component-type/material`,
        {
          idSearchTerm: PendingRequest.materialCostComponentId
            ? PendingRequest.materialCostComponentId
            : '',
          descSearchTerm: PendingRequest.materialCostComponent
            ? PendingRequest.materialCostComponent
            : '',
        },
        Cookie
      )
      let costComponent = response?.data?.data || []
      setRequestDependencies({
        ...Requestdependencies,
        costComponents: costComponent,
      })

      const uniqueOptions = new Map()
      costComponent.forEach((record) => {
        if (!uniqueOptions.has(record.costComponentDescription)) {
          uniqueOptions.set(record.costComponentDescription, {
            value: record.costComponentDescription,
            id: record.costComponentId,
          })
        }
      })
      setCostComponentOptions([...uniqueOptions.values()])
    }
    fetchDependencies()
  }, [PendingRequest.materialCostComponent])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/group-code/search`,
        {
          idSearchTerm: PendingRequest.groupCodeId
            ? PendingRequest.groupCodeId
            : '',
          descSearchTerm: PendingRequest.groupCode
            ? PendingRequest.groupCode
            : '',
        },
        Cookie
      )
      let groupCode = response?.data?.data || []
      setRequestDependencies({
        ...Requestdependencies,
        groupCodes: groupCode,
      })

      const uniqueOptions = new Map()
      groupCode.forEach((record) => {
        if (!uniqueOptions.has(record.groupName)) {
          uniqueOptions.set(record.groupName, {
            value: record.groupName,
            id: record.groupCode,
          })
        }
      })
      setGroupCodeOptions([...uniqueOptions.values()])
    }
    fetchDependencies()
  }, [PendingRequest.groupCode])

  const ValueChange = (field, value) => {
    setPendingRequest((prevItem) => ({
      ...prevItem,
      [field]: value,
      generatedDescription: `${prevItem?.productClass} ${prevItem?.productLine} ${prevItem.specifications}`,
    }))
    if (
      !PendingRequest.productClass &&
      !PendingRequest.productLine &&
      !PendingRequest.specifications
    ) {
      setPendingRequest((prevItem) => ({
        ...prevItem,
        generatedDescription: '',
        detailedDescription: '',
      }))
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
  }

  const showApprovalConfirmation = () => {
    const fieldErrors = {}
    if (!PendingRequest.site) {
      fieldErrors.site = 'Site required'
    }
    if (!PendingRequest.requester) {
      fieldErrors.requester = 'Requester required'
    }
    if (!PendingRequest.phoneNumber) {
      fieldErrors.phoneNumber = 'Phone Number required'
    }
    if (!PendingRequest.requirementDesc) {
      fieldErrors.requirementDesc = 'Requirement Description required'
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
    try {
      const reqbody = {
        ...PendingRequest,
        status: 'Pending',
        currentLevel: 'L1',
      }
      console.log(reqbody)
      setLoading(true)
      const Cookie = CookiesData()
      const response = await axios.put(
        'https://mdm.p360.build/v1/mdm/purchase-item/update',
        reqbody,
        Cookie
      )
      console.log(response.data)
      // const updatedList = endUserRequestList.map((record) =>
      //   record.id === response.data.data.id
      //     ? { ...record, ...response.data.data }
      //     : record
      // )
      // console.log(updatedList)
      // setEndUserRequestList(updatedList)
      window.location.reload()
      setPendingRequest({})
      setLevel1RequestModal(false)
      // setEndUserRequestList(
      //   endUserRequestList.map((record) =>
      //     record.id === response.data.data.id
      //       ? { ...record, ...response.data.data }
      //       : record
      //   )
      // )
      console.log(endUserRequestList)
      // setEndUserRequestList(updatedList)
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

  //   const RejectItemRequest = async () => {
  //     if (rejectReason) {
  //       try {
  //         const reqbody = {
  //           ...PendingRequest,
  //           status: 'Declined',
  //           currentLevel: 'L0',
  //           comments: [
  //             ...PendingRequest.comments,
  //             {
  //               txt: rejectReason,
  //               level: PendingRequest.currentLevel,
  //             },
  //           ],
  //         }
  //         setLoading(true)
  //         const Cookie = CookiesData()
  //         const response = await axios.put(
  //           'https://mdm.p360.build/v1/mdm/purchase-item/update',
  //           reqbody,
  //           Cookie
  //         )
  //         console.log(response.data)
  //         setPendingRequest({})
  //         setLevel1RequestModal(false)
  //         window.location.reload()
  //         cancelRejectConfirmation()
  //         // setEndUserRequestList([...endUserRequestList, response.data.data])
  //       } catch (err) {
  //         console.log(err)
  //         message.error('Submission failed')
  //         throw err
  //       } finally {
  //         setLoading(false)
  //       }
  //     } else {
  //       message.warning('Please Enter Reject Reason')
  //     }
  //   }

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
                <label>Site Code *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.siteId}
                  // readOnly={true}
                  placeholder='Select Project Code'
                  options={projectoptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  // onSearch={ItemGroupDescriptionSearch}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('site', '')
                      ValueChange('siteId', '')
                    } else {
                      ValueChange('siteId', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = projectoptions.find(
                      (option) => option.id === value
                    )
                    if (selectedOption) {
                      ValueChange('site', selectedOption.value)
                    } else {
                      ValueChange('site', '')
                      ValueChange('siteId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = projectoptions.find(
                      (option) => option.id === PendingRequest.siteId
                    )
                    if (OptionValue) {
                      ValueChange('site', OptionValue.value)
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
                <label>Site Description *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.site}
                  // readOnly={true}
                  placeholder='Select Project'
                  options={projectoptions.map((option) => ({
                    label: option.value,
                    value: option.value,
                  }))}
                  // onSearch={ItemGroupDescriptionSearch}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('site', '')
                      ValueChange('siteId', '')
                    } else {
                      ValueChange('site', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = projectoptions.find(
                      (option) => option.value === value
                    )
                    if (selectedOption) {
                      ValueChange('siteId', selectedOption.id)
                    } else {
                      ValueChange('site', '')
                      ValueChange('siteId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = projectoptions.find(
                      (option) => option.value === PendingRequest.site
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
                <label>Requester Code *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.requesterId}
                  // readOnly={true}
                  placeholder='Select Employee Code'
                  options={employeeOptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('requester', '')
                      ValueChange('requesterId', '')
                    } else {
                      ValueChange('requesterId', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = employeeOptions.find(
                      (option) => option.id === value
                    )
                    if (selectedOption) {
                      ValueChange('requester', selectedOption.value)
                    } else {
                      ValueChange('requester', '')
                      ValueChange('requesterId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = employeeOptions.find(
                      (option) => option.id === PendingRequest.requesterId
                    )
                    if (OptionValue) {
                      ValueChange('requester', OptionValue.value)
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
                <label>Requester *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.requester}
                  // readOnly={true}
                  placeholder='Select Employee'
                  options={employeeOptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  // disabled
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('requester', '')
                      ValueChange('requesterId', '')
                    } else {
                      ValueChange('requester', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = employeeOptions.find(
                      (option) => option.value === value
                    )
                    if (selectedOption) {
                      ValueChange('requesterId', selectedOption.id)
                    } else {
                      ValueChange('requester', '')
                      ValueChange('requesterId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = employeeOptions.find(
                      (option) => option.value === PendingRequest.requester
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
                  value={PendingRequest.phoneNumber}
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
                value={PendingRequest.requirementDesc}
                rows={3}
                allowClear
                onChange={(e) => {
                  if (!e.target.value.startsWith(' ')) {
                    ValueChange('requirementDesc', e.target.value)
                  }
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
                  value={PendingRequest.itemType}
                  onChange={(value) => ValueChange('itemType', value)}
                  placeholder='Select Item Type'
                >
                  {/* <option value='' selected disabled>
                    Select Item Type
                  </option> */}
                  <Option value='purchase'>Purchase</Option>
                </Select>
              </Container>
              <Container>
                <label>Item Group Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.itemGroupId}
                  // readOnly={true}
                  placeholder='Select Item Group Code'
                  options={itemgroupoptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled={PendingRequest.productType}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('itemGroup', '')
                      ValueChange('itemGroupId', '')
                    } else {
                      ValueChange('itemGroupId', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = itemgroupoptions.find(
                      (option) => option.id === value
                    )
                    if (selectedOption) {
                      ValueChange('itemGroup', selectedOption.value)
                    } else {
                      ValueChange('itemGroup', '')
                      ValueChange('itemGroupId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = itemgroupoptions.find(
                      (option) => option.id === PendingRequest.itemGroupId
                    )
                    if (OptionValue) {
                      ValueChange('itemGroup', OptionValue.value)
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
                <label>Item Group</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.itemGroup}
                  // readOnly={true}
                  placeholder='Enter Item Group'
                  options={itemgroupoptions.map((option) => ({
                    label: option.value,
                    value: option.value,
                  }))}
                  disabled={PendingRequest.productType}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('itemGroup', '')
                      ValueChange('itemGroupId', '')
                    } else {
                      ValueChange('itemGroup', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = itemgroupoptions.find(
                      (option) => option.value === value
                    )
                    if (selectedOption) {
                      ValueChange('itemGroupId', selectedOption.id)
                    } else {
                      ValueChange('itemGroup', '')
                      ValueChange('itemGroupId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = itemgroupoptions.find(
                      (option) => option.value === PendingRequest.itemGroup
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
                <label>Product Type Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.productTypeId}
                  // readOnly={true}
                  placeholder='Select Product Type Code'
                  options={productTypeoptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled={
                    PendingRequest.productClass || !PendingRequest.itemGroup
                  }
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('productType', '')
                      ValueChange('productTypeId', '')
                    } else {
                      ValueChange('productTypeId', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = productTypeoptions.find(
                      (option) => option.id === value
                    )
                    if (selectedOption) {
                      ValueChange('productType', selectedOption.value)
                    } else {
                      ValueChange('productType', '')
                      ValueChange('productTypeId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = productTypeoptions.find(
                      (option) => option.id === PendingRequest.productTypeId
                    )
                    if (OptionValue) {
                      ValueChange('productType', OptionValue.value)
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
                <label>Product Type</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.productType}
                  // readOnly={true}
                  placeholder='Enter Product Type'
                  options={productTypeoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  disabled={
                    PendingRequest.productClass || !PendingRequest.itemGroup
                  }
                  // onChange={(value) => {
                  //   ValueChange('productType', value)
                  // }}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('productType', '')
                      ValueChange('productTypeId', '')
                    } else {
                      ValueChange('productType', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = productTypeoptions.find(
                      (option) => option.value === value
                    )
                    if (selectedOption) {
                      ValueChange('productTypeId', selectedOption.id)
                    } else {
                      ValueChange('productType', '')
                      ValueChange('productTypeId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = productTypeoptions.find(
                      (option) => option.value === PendingRequest.productType
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
                <label>Product Class Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.productClassId}
                  // readOnly={true}
                  placeholder='Select Product Class Code'
                  options={productClassoptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled={
                    PendingRequest.productLine || !PendingRequest.productType
                  }
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('productClassId', '')
                      ValueChange('productClass', '')
                      ValueChange(
                        'detailedDescription',
                        `${PendingRequest.productLine}  ${PendingRequest.specifications}`
                      )
                    } else {
                      ValueChange('productClassId', value)
                      ValueChange(
                        'detailedDescription',
                        `${PendingRequest.productClass} ${PendingRequest.productLine}  ${PendingRequest.specifications}`
                      )
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = productClassoptions.find(
                      (option) => option.id === value
                    )
                    if (selectedOption) {
                      ValueChange('productClass', selectedOption.value)
                    } else {
                      ValueChange('productClass', '')
                      ValueChange('productClassId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = productClassoptions.find(
                      (option) => option.id === PendingRequest.productClassId
                    )
                    if (OptionValue) {
                      ValueChange('productClass', OptionValue.value)
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
                <label>Product Class</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.productClass}
                  // readOnly={true}
                  placeholder='Enter Product Class'
                  options={productClassoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  disabled={
                    PendingRequest.productLine || !PendingRequest.productType
                  }
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('productClassId', '')
                      ValueChange('productClass', '')
                      ValueChange(
                        'detailedDescription',
                        `${PendingRequest.productLine}  ${PendingRequest.specifications}`
                      )
                    } else {
                      ValueChange('productClass', value)
                      ValueChange(
                        'detailedDescription',
                        `${value} ${PendingRequest.productLine}  ${PendingRequest.specifications}`
                      )
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = productClassoptions.find(
                      (option) => option.value === value
                    )
                    if (selectedOption) {
                      ValueChange('productClassId', selectedOption.id)
                    } else {
                      ValueChange('productClass', '')
                      ValueChange('productClassId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = productClassoptions.find(
                      (option) => option.value === PendingRequest.productClass
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
                <label>Product Line Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.productLineId}
                  // readOnly={true}
                  placeholder='Select Product Line Code'
                  options={productLineoptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled={!PendingRequest.productClass}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('productLineId', '')
                      ValueChange('productLine', '')
                      ValueChange(
                        'detailedDescription',
                        `${PendingRequest.productClass} ${PendingRequest.specifications}`
                      )
                    } else {
                      ValueChange('productLineId', value)
                      ValueChange(
                        'detailedDescription',
                        `${PendingRequest.productClass} ${PendingRequest.productLine} ${PendingRequest.specifications}`
                      )
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = productLineoptions.find(
                      (option) => option.id === value
                    )
                    if (selectedOption) {
                      ValueChange('productLine', selectedOption.value)
                    } else {
                      ValueChange('productLine', '')
                      ValueChange('productLineId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = productLineoptions.find(
                      (option) => option.id === PendingRequest.productLineId
                    )
                    if (OptionValue) {
                      ValueChange('productLine', OptionValue.value)
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
                <label>Product Line</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.productLine}
                  // readOnly={true}
                  placeholder='Enter Product Line'
                  options={productLineoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  disabled={!PendingRequest.productClass}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('productLineId', '')
                      ValueChange('productLine', '')
                      ValueChange(
                        'detailedDescription',
                        `${PendingRequest.productClass} ${PendingRequest.specifications}`
                      )
                    } else {
                      ValueChange('productLine', value)
                      ValueChange(
                        'detailedDescription',
                        `${PendingRequest.productLine} ${value} ${PendingRequest.specifications}`
                      )
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = productLineoptions.find(
                      (option) => option.value === value
                    )
                    if (selectedOption) {
                      ValueChange('productLineId', selectedOption.id)
                    } else {
                      ValueChange('productLine', '')
                      ValueChange('productLineId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = productLineoptions.find(
                      (option) => option.value === PendingRequest.productLine
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
                  value={PendingRequest.specifications}
                  onChange={(e) => {
                    ValueChange('specifications', e.target.value)
                    ValueChange(
                      'detailedDescription',
                      `${PendingRequest.productClass} ${PendingRequest.productLine} ${e.target.value}`
                    )
                  }}
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
              <Container>
                <label>Unit Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.uom}
                  // readOnly={true}
                  placeholder='Select Unit Code'
                  options={uomOptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('uomDesc', '')
                      ValueChange('uom', '')
                      ValueChange('uomId', '')
                      ValueChange('purchaseUnit', '')
                      ValueChange('purchasePriceUnit', '')
                    } else {
                      ValueChange('uom', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = uomOptions.find(
                      (option) => option.id === value
                    )
                    if (selectedOption) {
                      ValueChange('uomDesc', selectedOption.value)
                      ValueChange('uomId', selectedOption.uomId)
                      ValueChange('purchaseUnit', selectedOption.id)
                      ValueChange('purchasePriceUnit', selectedOption.id)
                      ValueChange('purchaseUnitId', selectedOption.uomId)
                      ValueChange('purchasePriceUnitId', selectedOption.uomId)
                    } else {
                      ValueChange('uomDesc', '')
                      ValueChange('uom', '')
                      ValueChange('uomId', '')
                      ValueChange('purchaseUnit', '')
                      ValueChange('purchasePriceUnit', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = uomOptions.find(
                      (option) => option.id === PendingRequest.uom
                    )
                    if (OptionValue) {
                      ValueChange('uomId', OptionValue.uomId)
                      ValueChange('uomDesc', OptionValue.value)
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
                <label>Unit Of Measurement</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.uomDesc}
                  // readOnly={true}
                  placeholder='Enter Unit of Measurement'
                  options={uomOptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('uomDesc', '')
                      ValueChange('uom', '')
                      ValueChange('uomId', '')
                      ValueChange('purchaseUnit', '')
                      ValueChange('purchasePriceUnit', '')
                    } else {
                      ValueChange('uomDesc', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = uomOptions.find(
                      (option) => option.value === value
                    )
                    if (selectedOption) {
                      ValueChange('uom', selectedOption.id)
                      ValueChange('uomId', selectedOption.uomId)
                      ValueChange('purchaseUnit', selectedOption.id)
                      ValueChange('purchasePriceUnit', selectedOption.id)
                      ValueChange('purchaseUnitId', selectedOption.uomId)
                      ValueChange('purchasePriceUnitId', selectedOption.uomId)
                    } else {
                      ValueChange('uomDesc', '')
                      ValueChange('uom', '')
                      ValueChange('uomId', '')
                      ValueChange('purchaseUnit', '')
                      ValueChange('purchasePriceUnit', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = uomOptions.find(
                      (option) => option.value === PendingRequest.uomDesc
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
                  value={PendingRequest.purchasePrice}
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
                  allowClear
                  value={PendingRequest.materialCostComponentId}
                  // readOnly={true}
                  placeholder='Material Cost Component Code'
                  options={costComponentoptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled
                  onChange={(value) => {
                    ValueChange('materialCostComponentId', value)
                  }}
                  onBlur={() => {
                    const OptionValue = costComponentoptions?.find(
                      (option) =>
                        option.id === PendingRequest.materialCostComponentId
                    )
                    if (OptionValue) {
                      ValueChange('materialCostComponent', OptionValue.value)
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
                <label>Cost Component</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.materialCostComponent}
                  // readOnly={true}
                  placeholder='Material Cost Component'
                  options={costComponentoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('materialCostComponent', '')
                      ValueChange('materialCostComponentId', '')
                    } else {
                      ValueChange('materialCostComponent', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = costComponentoptions.find(
                      (option) => option.value === value
                    )
                    if (selectedOption) {
                      ValueChange('materialCostComponentId', selectedOption.id)
                    } else {
                      ValueChange('materialCostComponent', '')
                      ValueChange('materialCostComponentId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = costComponentoptions?.find(
                      (option) =>
                        option.value === PendingRequest.materialCostComponent
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
                  value={PendingRequest.groupCodeId}
                  // readOnly={true}
                  placeholder='Select Group Code'
                  options={groupCodeOptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled
                  onChange={(value) => {
                    ValueChange('groupCodeId', value)
                  }}
                  onBlur={() => {
                    const OptionValue = groupCodeOptions.find(
                      (option) => option.id === PendingRequest.groupCodeId
                    )
                    if (OptionValue) {
                      ValueChange('groupCode', OptionValue.value)
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
                <label>Group Name</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={PendingRequest.groupCode}
                  // readOnly={true}
                  placeholder='Group Code'
                  options={groupCodeOptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  // onChange={(value) => {
                  //   ValueChange('groupCode', value)
                  // }}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('groupCode', '')
                      ValueChange('groupCodeId', '')
                    } else {
                      ValueChange('groupCode', value)
                    }
                  }}
                  onSelect={(value) => {
                    const selectedOption = groupCodeOptions.find(
                      (option) => option.value === value
                    )
                    if (selectedOption) {
                      ValueChange('groupCodeId', selectedOption.id)
                    } else {
                      ValueChange('groupCode', '')
                      ValueChange('groupCodeId', '')
                    }
                  }}
                  onBlur={() => {
                    const OptionValue = groupCodeOptions.find(
                      (option) => option.value === PendingRequest.groupCode
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
          {/* <button className='reject' onClick={showRejectConfirmation}>
            Reject
          </button> */}
          <button className='submit' onClick={showApprovalConfirmation}>
            Resubmit
          </button>
        </ButtonContainer>
      </Styles>
      {/* <CustomModal
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
        </Container> */}
      {/* <ConfirmationButton>
          <button className='cancel' onClick={cancelRejectConfirmation}>
            Cancel
          </button>
          <button className='reject' onClick={RejectItemRequest}>
            Reject
          </button>
        </ConfirmationButton> */}
      {/* </CustomModal> */}
    </>
  )
}

export default Level0ItemRequest

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
