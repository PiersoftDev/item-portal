import React from 'react'
import styled from 'styled-components'

import { message } from 'antd'
import { useStates } from '../../../utils/StateProvider'
import ZoomComponent from '../EndUser/UserFieldZoom'

const PreviewRequest = () => {
  const {
    zoomOpen,
    setZoomOpen,
    zoomHeader,
    setZoomHeader,
    errors,
    setErrors,
    newItem,
    setNewItem,
    InitialErrors,
    InitialItem,
    setRequestOpen,
  } = useStates()

  const ValueChange = (field, value) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      [field]: value,
      detaileddesc: `${prevItem.productclass} ${prevItem.productline} ${prevItem.specifications}`,
      shortdesc:
        `${prevItem.productclass} ${prevItem.productline} ${prevItem.specifications}`.substring(
          0,
          32
        ),
    }))
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
  }

  const FieldFocas = (title) => {
    setZoomHeader(title)
    setZoomOpen(true)
  }

  const CancelRequest = () => {
    setRequestOpen(false)
    setNewItem(InitialItem)
    setErrors(InitialErrors)
  }

  const SubmitItem = () => {
    const fieldErrors = {}
    if (!newItem.site) {
      fieldErrors.site = 'Site Description is required'
    }
    if (!newItem.requister) {
      fieldErrors.requister = 'Requester is required'
    }
    if (!newItem.number) {
      fieldErrors.number = 'Phone Number is required'
    }
    if (!newItem.requiredinfo) {
      fieldErrors.requiredinfo = 'Material Information is required'
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    console.log(newItem)
    setNewItem(InitialItem)
    setRequestOpen(false)
    message.success('Your Item has been Successfully Submitted')
  }

  return (
    <>
      <Styles>
        <UserForm>
          <Section>
            <SectionTitle>Contact Information</SectionTitle>
            <GridContainer>
              <Container>
                <label>Site Description *</label>
                <input
                  type='text'
                  placeholder='Enter Site Description'
                  value={newItem.site}
                  onChange={(e) => {
                    ValueChange('site', e.target.value)
                  }}
                />
                {errors.site && <ErrorMessage>{errors.site}</ErrorMessage>}
              </Container>
              <Container>
                <label>Requester *</label>
                <input
                  type='text'
                  placeholder='Enter Your Name'
                  value={newItem.requister}
                  onChange={(e) => {
                    ValueChange('requister', e.target.value)
                  }}
                />
                {errors.requester && (
                  <ErrorMessage>{errors.requister}</ErrorMessage>
                )}
              </Container>
              <Container>
                <label>Phone Number *</label>
                <input
                  type='tel'
                  placeholder='Enter Phone Number'
                  value={newItem.number}
                  maxLength={13}
                  onChange={(e) => {
                    ValueChange('number', e.target.value)
                  }}
                />
                {errors.number && <ErrorMessage>{errors.number}</ErrorMessage>}
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
                value={newItem.requiredinfo}
                rows={2}
                onChange={(e) => {
                  ValueChange('requiredinfo', e.target.value)
                }}
                style={{
                  margin: '0 4rem 0 1rem',
                  minHeight: '2rem',
                  maxHeight: '2rem',
                  minWidth: '95%',
                  maxWidth: '95%',
                }}
              />
              {errors.requiredinfo && (
                <ErrorMessage>{errors.requiredinfo}</ErrorMessage>
              )}
            </Container>
          </Section>
          <Section>
            <SectionTitle>Item Information</SectionTitle>
            <GridContainer>
              <Container>
                <label>Item Type *</label>
                <Select
                  value={newItem.itemtype}
                  onChange={(e) => ValueChange('itemtype', e.target.value)}
                >
                  <option value='' disabled selected hidden>
                    Choose an option
                  </option>
                  <option value='Purchase'>Purchase</option>
                  <option value='Cost'>Cost</option>
                  <option value='Manufactured'>Manufactured</option>
                  <option value='Subcontract Service'>
                    Subcontract Service
                  </option>
                </Select>
              </Container>
              <Container>
                <label>Item Group</label>
                <input
                  type='text'
                  readOnly={true}
                  placeholder='Enter Item Group'
                  onFocus={() => FieldFocas('Item Group')}
                  value={newItem.itemgroup}
                />
              </Container>
              <Container>
                <label>Product Type</label>
                <input
                  type='text'
                  placeholder='Enter Product Type'
                  // onFocus={() => FieldFocas('Product Types')}
                  value={newItem.producttype}
                  onChange={(e) => {
                    ValueChange('producttype', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Product Class</label>
                <input
                  type='text'
                  placeholder='Enter Product Class'
                  // onFocus={() => FieldFocas('Product Classes')}
                  value={newItem.productclass}
                  onChange={(e) => {
                    ValueChange('productclass', e.target.value)
                    ValueChange(
                      'detaileddesc',
                      `${newItem.productclass} ${newItem.productline} ${newItem.specifications}`
                    )
                  }}
                />
              </Container>
              <Container>
                <label>Product Line</label>
                <input
                  type='text'
                  placeholder='Enter Product Line'
                  value={newItem.productline}
                  onChange={(e) => {
                    ValueChange('productline', e.target.value)
                    ValueChange(
                      'detaileddesc',
                      `${newItem.productclass} ${newItem.productline} ${newItem.specifications}`
                    )
                  }}
                />
              </Container>

              <Container>
                <label>Specifications</label>
                <input
                  type='text'
                  placeholder='Enter specifications'
                  value={newItem.specifications}
                  onChange={(e) => {
                    ValueChange('specifications', e.target.value)
                    ValueChange(
                      'detaileddesc',
                      `${newItem.productclass} ${newItem.productline} ${newItem.specifications}`
                    )
                  }}
                />
              </Container>
              <Container>
                <label>Detailed Description</label>
                <input
                  type='text'
                  placeholder='Enter Description'
                  value={newItem.detaileddesc}
                  maxLength={155}
                  onChange={(e) => {
                    ValueChange('detaileddesc', e.target.value)
                  }}
                  // disabled
                />
              </Container>

              <Container>
                <label>Short Description (32 chars ) </label>
                <input
                  type='text'
                  placeholder='Enter Description'
                  value={newItem.shortdesc}
                  maxLength={32}
                  onChange={(e) => {
                    ValueChange('shortdesc', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Unit Of Measurement *</label>
                <input
                  readOnly={true}
                  type='text'
                  placeholder='Enter Unit Of Measurement'
                  onFocus={() => FieldFocas('Units')}
                  value={newItem.unit}
                  onChange={(e) => {
                    ValueChange('unit', e.target.value)
                  }}
                />
              </Container>
            </GridContainer>
          </Section>

          <Section>
            <SectionTitle>Additional Information</SectionTitle>
            <GridContainer>
              <Container>
                <label>HSN Code</label>
                <input
                  type='text'
                  placeholder='Enter HSN Code'
                  value={newItem.hsn}
                  onChange={(e) => {
                    ValueChange('hsn', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Cost Component</label>
                <input
                  type='text'
                  placeholder='Cost Component'
                  value={newItem.costcomponent}
                  onChange={(e) => {
                    ValueChange('hsn', e.target.value)
                  }}
                />
              </Container>
              <Container>
                <label>Attachment</label>
                <input
                  type='file'
                  onChange={(event) => {
                    const file = event.target.files[0]
                    ValueChange('attachment', file)
                  }}
                />
              </Container>
            </GridContainer>
          </Section>
        </UserForm>
        <ButtonContainer>
          <button className='cancel' onClick={CancelRequest}>
            Cancel
          </button>
          <button className='save'>Save As Draft</button>
          <button className='submit' onClick={SubmitItem}>
            Submit
          </button>
        </ButtonContainer>
      </Styles>
      <Zoom show={zoomOpen}>
        <h1>{zoomHeader}</h1>
        <ZoomComponent />
      </Zoom>
    </>
  )
}

export default PreviewRequest

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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`

const Container = styled.div`
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
  input {
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
    padding: 0.5rem;
    font-size: 0.7rem;
  }
  textarea,
  input:focus {
    outline: none;
  }
  input[type='file']::file-selector-button {
    display: none;
    cursor: pointer;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  top: 0rem;
  right: 2rem;
  z-index: 1000;
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
  margin: 0 0.6rem;
  color: red;
  font-size: 0.7rem;
`

const Zoom = styled.div`
  position: absolute;
  bottom: ${({ show }) => (show ? '0' : '-100%')};
  left: 0;
  width: 100%;
  height: 100%;
  background: #e6f3f8;
  transition: bottom 0.6s ease-in-out;

  h1 {
    margin-left: 3rem;
    color: #49619f;
    font-family: 'Open Sans', sans-serif;
    letter-spacing: 0.6px;
    font-size: 1.2rem;
    margin-top: 1rem;
  }
`
const Select = styled.select`
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
    Helvetica, Arial, sans-serif;
  padding: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  option {
    background-color: #f0f0f0;
    color: #333;
    cursor: pointer;
  }
`
