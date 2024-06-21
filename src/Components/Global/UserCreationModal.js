import React, { useEffect, useState } from 'react'
import CustomModal from './CustomModal'
import styled from 'styled-components'
import { useStates } from '../../utils/StateProvider'
import { FaWindowClose } from 'react-icons/fa'
import axios from 'axios'
import { AutoComplete, Checkbox, Spin, Tag, message } from 'antd'
import { useNavigate } from 'react-router-dom'

const UserCreationModal = () => {
  const {
    createUserModal,
    setCreateUserModal,
    createUser,
    setCreateUser,
    IntialUser,
    Requestdependencies,
    setRequestDependencies,
    testUrl,
  } = useStates()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [projectoptions, setProjectOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedRoles, setSelectedRoles] = useState([])
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
  })

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
      try {
        const Cookie = CookiesData()
        const response = await axios.post(
          `${testUrl}/v1/mdm/project/search`,
          { searchTerm: inputValue ? inputValue : '' },
          Cookie
        )
        let Project = response?.data?.data || []
        setRequestDependencies({
          ...Requestdependencies,
          projects: Project,
        })

        const uniqueOptions = new Map()
        Project.forEach((record) => {
          if (!uniqueOptions.has(record.description)) {
            uniqueOptions.set(record.description, {
              Description: `${record.id} - ${record.description}`,
              value: record.description,
              id: record.id,
            })
          }
        })
        setProjectOptions([...uniqueOptions.values()])
      } catch (err) {
        if (
          err.message === 'Network Error' ||
          err.message === 'Request failed with status code 500'
        ) {
          navigate('/login')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('idToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('userDetails')
        }
      }
    }

    fetchDependencies()
  }, [inputValue])

  const CloseCreateUserModal = () => {
    setCreateUserModal(false)
    setCreateUser(IntialUser)
    setSelectedRoles([])
    setErrors({})
  }

  const ValueChange = (field, value) => {
    setCreateUser((prevItem) => ({
      ...prevItem,
      [field]: value,
    }))
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
  }
  const handleSelect = (value, option) => {
    if (!createUser.projects.some((project) => project.id === option.id)) {
      const newProjects = [
        ...createUser.projects,
        { id: option.id, description: option.value },
      ]
      setCreateUser((prev) => ({
        ...prev,
        projects: newProjects,
      }))
    }
    setInputValue('')
  }

  const handleInputChange = (value) => {
    setInputValue(value)
  }

  const handleClose = (removedProjectId) => {
    const newProjects = createUser.projects.filter(
      (project) => project.id !== removedProjectId
    )
    setCreateUser((prev) => ({
      ...prev,
      projects: newProjects,
    }))
  }

  const toggleRole = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  const handleSubmit = async () => {
    const fieldErrors = {}
    if (!createUser.fullName) {
      fieldErrors.fullName = 'Full Name required'
    }
    if (!createUser.email) {
      fieldErrors.email = 'Email required'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createUser.email)) {
      fieldErrors.email = 'Invalid Email'
    }

    if (!createUser.mobileNumber) {
      fieldErrors.mobileNumber = 'Number required'
    }
    if (createUser.roles.length === 0) {
      message.warning('Please Select Role')
      fieldErrors.roles = 'Roles required'
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return false
    }

    const updatedUser = {
      ...createUser,
      roles: selectedRoles,
    }
    try {
      setLoading(true)
      const response = await axios.post(
        `${testUrl}/v1/mdm/user/create`,
        updatedUser
      )
      console.log(response.data)
      console.log('Submitting user:', updatedUser)
      message.success('User Successfully created')
      setCreateUser(IntialUser)
      CloseCreateUserModal()
    } catch (err) {
      console.log(err)
      message.error('Something Went Wrong')
    } finally {
      setLoading(false)
    }
  }

  const ResetClick = () => {
    setCreateUser(IntialUser)
    setSelectedRoles([])
    setErrors({})
  }

  return (
    <div>
      <CustomModal open={createUserModal} width='330px' height='auto'>
        <UserContainer>
          <CreateUserTitleContainer>
            <CreateUserTitle>Create User</CreateUserTitle>
            <FaWindowClose
              onClick={CloseCreateUserModal}
              className='closeIcon'
            />
          </CreateUserTitleContainer>
          <UserForm>
            <FieldContainer>
              <FieldLabel>Full Name</FieldLabel>
              <Container>
                <Input
                  value={createUser.fullName}
                  onChange={(e) => {
                    ValueChange('fullName', e.target.value)
                  }}
                  type='text'
                  autoComplete='off'
                  placeholder='Enter Full Name'
                />
                {errors.fullName && (
                  <ErrorMessage>{errors.fullName}</ErrorMessage>
                )}
              </Container>
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Email</FieldLabel>
              <Container>
                <Input
                  type='text'
                  value={createUser.email}
                  onChange={(e) => {
                    ValueChange('email', e.target.value)
                  }}
                  autoComplete='off'
                  placeholder='Enter Email'
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </Container>
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Phone Number</FieldLabel>
              <Container>
                <CountryCodeInput
                  readOnly
                  type='text'
                  value={createUser.countryCode}
                  className='countryCode'
                />
                <Input
                  value={createUser.mobileNumber}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      ValueChange('mobileNumber', e.target.value)
                    }
                  }}
                  maxLength={10}
                  autoComplete='off'
                  type='text'
                  placeholder='Enter Phone Number'
                />
                {errors.mobileNumber && (
                  <ErrorMessage>{errors.mobileNumber}</ErrorMessage>
                )}
              </Container>
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Projects</FieldLabel>
              <ProjectOptionsContainer>
                <Container>
                  <StyledDependencies
                    value={inputValue}
                    onChange={handleInputChange}
                    onSelect={handleSelect}
                    // placeholder='Select Project'
                    options={projectoptions.map((option) => ({
                      label: option.Description,
                      value: option.value,
                      id: option.id,
                    }))}
                    popupMatchSelectWidth={true}
                    popupClassName='auto-complete-dropdown'
                    maxTagCount={10}
                  >
                    <Input placeholder='Select Project' />
                  </StyledDependencies>
                </Container>
                <TagContainer>
                  {createUser.projects.map((project) => (
                    <TAG
                      key={project.id}
                      closable
                      onClose={() => handleClose(project.id)}
                      style={{ marginBottom: 5 }}
                    >
                      {project.description}
                    </TAG>
                  ))}
                </TagContainer>
              </ProjectOptionsContainer>
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Roles</FieldLabel>
              <CheckBoxDiv>
                <CheckboxContainer>
                  <Checkbox
                    checked={selectedRoles.includes('Admin')}
                    onChange={() => toggleRole('Admin')}
                  />
                  <CheckboxLabel>Admin</CheckboxLabel>
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    checked={selectedRoles.includes('L0')}
                    onChange={() => toggleRole('L0')}
                  />
                  <CheckboxLabel>L0 (End User)</CheckboxLabel>
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    checked={selectedRoles.includes('L1')}
                    onChange={() => toggleRole('L1')}
                  />
                  <CheckboxLabel>L1 (Purchase)</CheckboxLabel>
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    checked={selectedRoles.includes('L2')}
                    onChange={() => toggleRole('L2')}
                  />
                  <CheckboxLabel>L2 (Taxation)</CheckboxLabel>
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    checked={selectedRoles.includes('L3')}
                    onChange={() => toggleRole('L3')}
                  />
                  <CheckboxLabel>L3 (PMD)</CheckboxLabel>
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    checked={selectedRoles.includes('L4')}
                    onChange={() => toggleRole('L4')}
                  />
                  <CheckboxLabel>L4 (ERP)</CheckboxLabel>
                </CheckboxContainer>
              </CheckBoxDiv>
            </FieldContainer>
          </UserForm>
          <ButtonContainer>
            <Button className='reset' onClick={ResetClick}>
              Reset
            </Button>
            <Button className='create' onClick={handleSubmit}>
              Create
            </Button>
          </ButtonContainer>
        </UserContainer>
        {loading && (
          <LoadingOverlay>
            <Spin size='large' />
          </LoadingOverlay>
        )}
      </CustomModal>
    </div>
  )
}

export default UserCreationModal

const UserContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  //   border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`
const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`

const CreateUserTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
  .closeIcon {
    cursor: pointer;
    font-size: 1rem;
  }
`
const CreateUserTitle = styled.div`
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: 500;
  color: #333;
`
const UserForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`
const FieldLabel = styled.div`
  font-size: 0.6rem;
  letter-spacing: 0.5px;
  color: #888;
`
const Container = styled.div`
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 0.2rem;
  width: 100%;
  overflow-y: hidden;
`
const Input = styled.input`
  width: 80%;
  border: none;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
    Helvetica, Arial, sans-serif;
  padding: 0.5rem;
  font-size: 0.6rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 0.6rem !important;
    letter-spacing: 0.5px;
    color: #999 !important;
  }
  &:onselect {
    background: transparent;
  }
`

const CountryCodeInput = styled.input`
  width: 10%;
  margin: 0 0.4rem;
  border: none;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
    Helvetica, Arial, sans-serif;
  padding: 0.2rem;
  font-size: 0.7rem;
  &:focus {
    outline: none;
  }
`

const StyledDependencies = styled(AutoComplete)`
  width: 100%;
  height: 30px;
  position: relative;
  .ant-input {
    border-radius: 0.5rem;
    font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.5px;
    &::placeholder {
      font-size: 0.6rem !important;
      letter-spacing: 0.5px;
    }
  }
  .ant-select {
    height: auto !important;
    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  }
  .ant-select-selector {
    border: none !important;
    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  }
  .ant-select-selection-placeholder {
    font-size: 0.6rem !important;
    letter-spacing: 0.5px;
    color: #999 !important;
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

const CheckBoxDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.6rem;
  flex-wrap: wrap;
`

const CheckboxContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
`
const CheckboxLabel = styled.div`
  font-size: 0.5rem !important;
  letter-spacing: 0.5px;
  color: #555 !important;
`

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  .reset {
    background: #eeeeee;
  }
  .create {
    background: #000;
    color: #fff;
  }
`
const Button = styled.button`
  font-size: 0.6rem !important;
  letter-spacing: 0.5px;
  padding: 0.3rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
`
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 80px;
  overflow-y: auto;
`
const TAG = styled(Tag)`
  font-size: 0.5rem !important;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  color: #222;
`

const ProjectOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const ErrorMessage = styled.p`
  color: red;
  font-size: 0.5rem;
  white-space: nowrap;
`
