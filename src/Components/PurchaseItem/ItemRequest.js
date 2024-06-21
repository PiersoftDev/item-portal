import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { AutoComplete, Input, Select, Upload, message } from 'antd'
import { useStates } from '../../utils/StateProvider'
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons'
import { CiImageOn } from 'react-icons/ci'
import CustomModal from '../Global/CustomModal'

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
    userDetails,
    testUrl,
    imageViewModal,
    setImageViewModal,
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

  const [companySearchTerm, setCompanySearchTerm] = useState('7777')

  const [imgLoader, setImgLoader] = useState(false)

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
        `${testUrl}/v1/mdm/project/search`,
        {
          companySearchTerm: companySearchTerm,
          idSearchTerm: newItem.siteId ? newItem.siteId : '',
          descSearchTerm: newItem.site ? newItem.site : '',
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
  }, [newItem.site, newItem.siteId, companySearchTerm])

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const Cookie = CookiesData()
        const response = await axios.post(
          `${testUrl}/v1/mdm/employee/search/0/50`,
          {
            idSearchTerm: newItem.requesterId ? newItem.requesterId : '',
            descSearchTerm: newItem.requester ? newItem.requester : '',
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
  }, [newItem.requester, newItem.requesterId])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newItem.itemType) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `${testUrl}/v1/mdm/product-link/item-group/${newItem.itemType}`,
          {
            idSearchTerm: newItem.itemGroupId ? newItem.itemGroupId : '',
            descSearchTerm: newItem.itemGroup ? newItem.itemGroup : '',
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
  }, [newItem.itemGroup])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newItem.itemGroupId) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `${testUrl}/v1/mdm/product-link/product-type/${newItem.itemGroupId}`,
          {
            idSearchTerm: newItem.productTypeId ? newItem.productTypeId : '',
            descSearchTerm: newItem.productType ? newItem.productType : '',
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
  }, [newItem.productType, newItem.itemGroup, newItem.itemGroupId])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newItem.productTypeId) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `${testUrl}/v1/mdm/product-link/product-class/${newItem.productTypeId}`,
          {
            idSearchTerm: newItem.productClassId ? newItem.productClassId : '',
            descSearchTerm: newItem.productClass ? newItem.productClass : '',
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
  }, [newItem.productClass, newItem.productTypeId, newItem.productType])

  useEffect(() => {
    const fetchDependencies = async () => {
      if (newItem.productClassId) {
        const Cookie = CookiesData()
        const response = await axios.post(
          `${testUrl}/v1/mdm/product-link/product-line/${newItem.productClassId}`,
          {
            idSearchTerm: newItem.productLineId ? newItem.productLineId : '',
            descSearchTerm: newItem.productLine ? newItem.productLine : '',
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
  }, [newItem.productLine, newItem.productClassId, newItem.productClass])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `${testUrl}/v1/mdm/uom/search`,
        {
          idSearchTerm: newItem.uom ? newItem.uom : '',
          descSearchTerm: newItem.uomDesc ? newItem.uomDesc : '',
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
  }, [newItem.uomDesc])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `${testUrl}/v1/mdm/cost-component/fetch-by-cost-component-type/material`,
        {
          idSearchTerm: newItem.materialCostComponentId
            ? newItem.materialCostComponentId
            : '',
          descSearchTerm: newItem.materialCostComponent
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
  }, [newItem.materialCostComponent])

  useEffect(() => {
    const fetchDependencies = async () => {
      const Cookie = CookiesData()
      const response = await axios.post(
        `${testUrl}/v1/mdm/group-code/search`,
        {
          idSearchTerm: newItem.groupCodeId ? newItem.groupCodeId : '',
          descSearchTerm: newItem.groupCode ? newItem.groupCode : '',
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
  }, [newItem.groupCode])

  const CompanyChange = (value) => {
    setCompanySearchTerm(value)
  }

  const ValueChange = (field, value) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      [field]: value,
      generatedDescription: `${prevItem?.productClass} ${prevItem?.productLine} ${prevItem.specifications}`,
    }))
    if (
      !newItem.productClass &&
      !newItem.productLine &&
      !newItem.specifications
    ) {
      setNewItem((prevItem) => ({
        ...prevItem,
        generatedDescription: '',
        detailedDescription: '',
      }))
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
  }

  const ViewImage = () => {
    setImageViewModal(!imageViewModal)
  }

  const DeleteImage = () => {
    setImageViewModal(!imageViewModal)
    setNewItem((prevItem) => ({
      ...prevItem,
      itemImg: '',
    }))
    message.success('Attached Image Removed successfully')
  }

  const CancelRequest = () => {
    setEndUserRequestOpen(false)
    setNewItem(InitialItem)
    setErrors(InitialErrors)
    setCompanySearchTerm('7777')
  }

  const customRequest = async ({ file }) => {
    const accessToken = localStorage.getItem('accessToken')
    const formData = new FormData()
    formData.append('itemImage', file)
    try {
      setImgLoader(true)
      const response = await axios.post(
        `https://mdm.p360.build/v1/mdm/purchase-item/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setNewItem({ ...newItem, itemImg: response.data.data })
      message.success('File uploaded successfully')
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setImgLoader(false)
    }
  }

  const SubmitItem = async () => {
    const fieldErrors = {}
    if (!newItem.site) {
      fieldErrors.site = 'Site required'
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
        const reqbody = { ...newItem, creatorId: userDetails.id }
        const Cookie = CookiesData()
        setLoading(true)
        const response = await axios.post(
          `${testUrl}/v1/mdm/purchase-item/create`,
          reqbody,
          Cookie
        )
        console.log(response.data)
        setNewItem(InitialItem)
        setEndUserRequestOpen(false)
        setEndUserRequestList([response.data.data, ...endUserRequestList])
        message.success('Your Item has been Successfully Submitted')
        setCompanySearchTerm('7777')
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
                <label>Company</label>
                <Select value={companySearchTerm} onChange={CompanyChange}>
                  <Option value='7777'>7777</Option>
                  <Option value='9999'>9999</Option>
                </Select>
              </Container>
              <Container>
                <label>Site Code *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.siteId}
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
                      (option) => option.id === newItem.siteId
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
                  value={newItem.site}
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
                <label>Requester Code *</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.requesterId}
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
                      (option) => option.id === newItem.requesterId
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
                  value={newItem.requester}
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
              <UploadContainer>
                <Upload
                  showUploadList={false}
                  customRequest={({ file }) => customRequest({ file })}
                  maxCount={1}
                  value={newItem.itemImg}
                >
                  <UploadButton>
                    <UploadIcon />
                    {imgLoader && (
                      <ImageLoader>
                        <div className='loader' />
                      </ImageLoader>
                    )}
                  </UploadButton>
                </Upload>
                {newItem.itemImg && (
                  <CiImageOn className='img' onClick={ViewImage} />
                )}
                {/* <Image width={50} height={50} src={newItem.itemImg} /> */}
                {/* </CiImageOn> */}
              </UploadContainer>
              {/* {newItem.itemImg && (
                <SelectedImage>
                  <Image width={50} height={50} src={newItem.itemImg} />
                </SelectedImage>
              )} */}
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
                <label>Item Group Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.itemGroupId}
                  // readOnly={true}
                  placeholder='Select Item Group Code'
                  options={itemgroupoptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled={newItem.productType}
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
                      (option) => option.id === newItem.itemGroupId
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
                  value={newItem.itemGroup}
                  // readOnly={true}
                  placeholder='Enter Item Group'
                  options={itemgroupoptions.map((option) => ({
                    label: option.value,
                    value: option.value,
                  }))}
                  disabled={newItem.productType}
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
                <label>Product Type Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.productTypeId}
                  // readOnly={true}
                  placeholder='Select Product Type Code'
                  options={productTypeoptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled={newItem.productClass || !newItem.itemGroup}
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
                      (option) => option.id === newItem.productTypeId
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
                  value={newItem.productType}
                  // readOnly={true}
                  placeholder='Enter Product Type'
                  options={productTypeoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  disabled={newItem.productClass || !newItem.itemGroup}
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
                <label>Product Class Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.productClassId}
                  // readOnly={true}
                  placeholder='Select Product Class Code'
                  options={productClassoptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled={newItem.productLine || !newItem.productType}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('productClassId', '')
                      ValueChange('productClass', '')
                      ValueChange(
                        'detailedDescription',
                        `${newItem.productLine}  ${newItem.specifications}`
                      )
                    } else {
                      ValueChange('productClassId', value)
                      ValueChange(
                        'detailedDescription',
                        `${newItem.productClass} ${newItem.productLine}  ${newItem.specifications}`
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
                      (option) => option.id === newItem.productClassId
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
                  value={newItem.productClass}
                  // readOnly={true}
                  placeholder='Enter Product Class'
                  options={productClassoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  disabled={newItem.productLine || !newItem.productType}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('productClassId', '')
                      ValueChange('productClass', '')
                      ValueChange(
                        'detailedDescription',
                        `${newItem.productLine}  ${newItem.specifications}`
                      )
                    } else {
                      ValueChange('productClass', value)
                      ValueChange(
                        'detailedDescription',
                        `${value} ${newItem.productLine}  ${newItem.specifications}`
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
                <label>Product Line Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.productLineId}
                  // readOnly={true}
                  placeholder='Select Product Line Code'
                  options={productLineoptions.map((option) => ({
                    label: option.id,
                    value: option.id,
                  }))}
                  disabled={!newItem.productClass}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('productLineId', '')
                      ValueChange('productLine', '')
                      ValueChange(
                        'detailedDescription',
                        `${newItem.productClass} ${newItem.specifications}`
                      )
                    } else {
                      ValueChange('productLineId', value)
                      ValueChange(
                        'detailedDescription',
                        `${newItem.productClass} ${newItem.productLine} ${newItem.specifications}`
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
                      (option) => option.id === newItem.productLineId
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
                  value={newItem.productLine}
                  // readOnly={true}
                  placeholder='Enter Product Line'
                  options={productLineoptions.map((option) => ({
                    label: option.Description,
                    value: option.value,
                  }))}
                  disabled={!newItem.productClass}
                  onChange={(value) => {
                    if (value === undefined || value === '') {
                      ValueChange('productLineId', '')
                      ValueChange('productLine', '')
                      ValueChange(
                        'detailedDescription',
                        `${newItem.productClass} ${newItem.specifications}`
                      )
                    } else {
                      ValueChange('productLine', value)
                      ValueChange(
                        'detailedDescription',
                        `${newItem.productLine} ${value} ${newItem.specifications}`
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
                  maxLength={90}
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
                <label>Unit Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.uom}
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
                      (option) => option.id === newItem.uom
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
                  value={newItem.uomDesc}
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
                    if (!isNaN(e.target.value)) {
                      ValueChange('hsnCode', e.target.value)
                    }
                  }}
                />
              </Container>
              <Container>
                <label>Cost Component Code</label>
                <StyledDependencies
                  type='text'
                  allowClear
                  value={newItem.materialCostComponentId}
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
                      (option) => option.id === newItem.materialCostComponentId
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
                  value={newItem.materialCostComponent}
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
                  value={newItem.groupCodeId}
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
                      (option) => option.id === newItem.groupCodeId
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
                  value={newItem.groupCode}
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
      <CustomModal open={imageViewModal}>
        <SelectedImage src={newItem.itemImg} />
        <ImageActions>
          <button className='cancel' onClick={ViewImage}>
            Cancel
          </button>
          {/* <button className='save'>Save As Draft</button> */}
          <button className='delete' onClick={DeleteImage}>
            Delete Image
          </button>
        </ImageActions>
      </CustomModal>
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
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin: 0rem 1rem 1rem 1rem;
  @media screen and (min-width: 1550px) {
    grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
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
const UploadIcon = styled(UploadOutlined)`
  color: #49619f;
  font-size: 0.8rem;
`

const UploadButton = styled.button`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 5px;
  background: transparent;
  border: 1px solid #ccc;
  padding: 0.4rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 400 !important;
  letter-spacing: 0.5px;
  width: 100%;
  color: #ccc;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    border: 1px solid #49619f;
    color: #49619f;
  }
`

const SelectedImage = styled.img`
  width: 100%;
  height: 100%;
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

const ImageActions = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  bottom: 1rem;
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

  .delete {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    background: #d04848;
    color: #fff;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    opacity: 60%;
    transition: all 0.3s ease;
    &:hover {
      opacity: 100%;
    }
  }
`
const ImageLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  .loader {
    --r1: 154%;
    --r2: 68.5%;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 5px;
    background: radial-gradient(
        var(--r1) var(--r2) at top,
        #0000 79.5%,
        #269af2 80%
      ),
      radial-gradient(var(--r1) var(--r2) at bottom, #269af2 79.5%, #0000 80%),
      radial-gradient(var(--r1) var(--r2) at top, #0000 79.5%, #269af2 80%),
      #ccc;
    background-size: 50.5% 220%;
    background-position: -100% 0%, 0% 0%, 100% 0%;
    background-repeat: no-repeat;
    animation: l9 2s infinite linear;
  }
  @keyframes l9 {
    33% {
      background-position: 0% 33%, 100% 33%, 200% 33%;
    }
    66% {
      background-position: -100% 66%, 0% 66%, 100% 66%;
    }
    100% {
      background-position: 0% 100%, 100% 100%, 200% 100%;
    }
  }
`
