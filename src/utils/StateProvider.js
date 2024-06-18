import React, { createContext, useContext, useState } from 'react'

const States = createContext()

const StateProvider = ({ children }) => {
  // Global States :
  const [userDetails, setuserDeails] = useState({})
  const [userRole, setUserRole] = useState('End User')
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [Requestdependencies, setRequestDependencies] = useState({
    projects: [],
    employees: [],
    itemGroups: [],
    productTypes: [],
    productClasses: [],
    productLine: [],
    costComponent: [],
    UOM: [],
    groupCodes: [],
    warehouses: [],
  })
  const [dependencies, setDependencies] = useState({
    itemGroups: [],
    productTypes: [],
    productClasses: [],
    productLine: [],
  })

  const [UserProfileOpen, setUserProfileOpen] = useState(false)

  const [similarItemsModal, setSimilarItemsModal] = useState(false)
  const [similarItem, setSimilarItem] = useState(null)

  //Login States :

  const [loginDetails, setLogingDetails] = useState({
    username: '',
    confirmationCode: '',
    session: '',
  })
  const [userIDError, setUserIDError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  //End User States :

  const [endUserRequestOpen, setEndUserRequestOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Submitted')
  const [itemStatusOpen, setItemStatusOpen] = useState(false)

  const InitialErrors = {
    site: '',
    requester: '',
    requesterId: '',
    phoneNumber: '',
    requirementDesc: '',
    itemGroup: '',
    productType: '',
    productClass: '',
    productLine: '',
    specifications: '',
    detailedDescription: '',
    uomDesc: '',
    purchasePrice: '',
    hsnCode: '',
    materialCostComponentId: '',
    materialCostComponent: '',
    groupCodeId: '',
    groupCode: '',
    warehouseName: '',
  }

  const InitialItem = {
    siteId: '',
    site: '',
    requesterId: '',
    requester: '',
    phoneNumber: '',
    requirementDesc: '',
    itemType: 'purchase',
    description: '',
    itemGroupId: '',
    itemGroup: '',
    productTypeId: '',
    productType: '',
    productClassId: '',
    productClass: '',
    productLineId: '',
    productLine: '',
    specifications: '',
    generatedDescription: '',
    detailedDescription: '',
    uomId: '',
    uom: '',
    uomDesc: '',
    purchaseUnitId: '',
    purchaseUnit: '',
    purchasePriceUnit: '',
    purchasePriceUnitId: '',
    purchasePrice: '1',
    hsnCode: '',
    materialCostComponentId: '',
    materialCostComponent: '',
    groupCodeId: '',
    groupCode: '',
    inheritProjectPeg: 'yes',
    currency: 'INR',
    purchasePriceGroupId: 'NA',
    purchasePriceGroup: 'Not Applicable',
    purchaseStatisticalGroupId: 'NA',
    purchaseStatisticalGroup: 'Not Applicable',
    warehouseId: '',
    warehouseName: '',
    orderHorizon: '1',
    itemValuationGroupId: 'MAUC',
    itemValuationGroup: 'MAUC',
    operationalCostComponentId: 'OPR',
    operationalCostComponent: 'Operation Cost',
    surchargeCostComponentId: 'SUR',
    surchargeCostComponent: 'Lumpsum Charges',
    projectOrderSystem: 'mnl',
    pegPRPWarehouseOrder: 'yes',
    status: 'Pending',
    currentLevel: 'L1',
    creatorId: userDetails.id,
    comments: [],
  }

  const [errors, setErrors] = useState(InitialErrors)
  const [newItem, setNewItem] = useState(InitialItem)

  const IntialSubConItem = {
    siteId: '',
    site: '',
    requesterId: '',
    requester: '',
    phoneNumber: '',
    requirementDesc: '',
    description: '',
    itemType: 'subcontracting',
    itemGroup: '',
    projectOrderSystem: 'mnl',
    pricePolicy: 'purchasePrice',
    groupCode: '',
    currency: 'INR',
    controlCode: '',
    controlFunction: 'costObject/controlCode',
    costComponent: '',
    commodityCode: '',
    costDetermination: 'quantity',
    inventoryUnit: '',
    timeUnit: '',
    purchasePrice: '1',
    purchasePriceGroup: 'NA',
    purchaseStatisticsGroup: 'NA',
    salesPrice: '1',
    salesPriceGroup: '',
    salesStatisticsGroup: '',
    registerProgress: 'yes',
    usedInSchedule: 'yes',
    billabale: 'yes',
    detailDescription: '',
  }

  const [subConItem, setSubConItem] = useState(IntialSubConItem)

  const [endUserRequestList, setEndUserRequestList] = useState([])

  //Level1 States :

  const [level1requestModal, setLevel1RequestModal] = useState(false)
  const [Level1PendingList, setLevel1PendingList] = useState([])
  const [PendingRequest, setPendingRequest] = useState({})

  //Level2 States :

  const [level2requestModal, setLevel2RequestModal] = useState(false)

  //Level3 States :

  const [level3requestModal, setLevel3RequestModal] = useState(false)
  const [erprequestModal, setErpRequestModal] = useState(false)

  const [liverequestModal, setLiveRequestModal] = useState(false)

  const [selectedRowKey, setSelectedRowKey] = useState(null)
  const [selectedRow, setSelectedRow] = useState()

  const [userZoomValue, setUserZoomValue] = useState('')
  const [userPreviewZoom, setUserPreviewZoom] = useState([])

  const [productCombinationModal, setProductCombinationModal] = useState(false)

  const [newCombinationopen, setNewCombinationOpen] = useState(false)

  const [productlinkList, setProductLinkList] = useState([])

  const IntialProductLink = {
    itemTypeId: '',
    itemType: 'purchase',
    itemGroupId: '',
    itemGroup: '',
    productTypeId: '',
    productType: '',
    productClassId: '',
    productClass: '',
    productLineId: '',
    productLine: '',
  }
  const [newProductLink, setNewProductLink] = useState(IntialProductLink)

  const IntialUser = {
    fullName: '',
    email: '',
    countryCode: '+91',
    mobileNumber: '',
    projects: [],
    roles: [],
  }
  const [createUser, setCreateUser] = useState(IntialUser)
  const [createUserModal, setCreateUserModal] = useState(false)

  const [itemListFilters, setItemListFilters] = useState({
    itemType: '',
    status: '',
    level: '',
    searchTerm: '',
  })

  const [itemListFilterModalopen, setItemListFilterModalopen] = useState(false)

  const [subConItemRequestModalopen, setSubConItemRequestModalopen] =
    useState(false)

  const [itemListLoading, setItemListLoading] = useState(false)

  const [itemListPage, setItemListPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(0)

  return (
    <States.Provider
      value={{
        userDetails,
        setuserDeails,
        loginDetails,
        setLogingDetails,
        userIDError,
        setUserIDError,
        passwordError,
        setPasswordError,
        UserProfileOpen,
        setUserProfileOpen,
        endUserRequestOpen,
        setEndUserRequestOpen,
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        itemStatusOpen,
        setItemStatusOpen,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
        errors,
        setErrors,
        newItem,
        setNewItem,
        InitialErrors,
        InitialItem,
        selectedRowKey,
        setSelectedRowKey,
        selectedRow,
        setSelectedRow,
        userPreviewZoom,
        setUserPreviewZoom,
        userZoomValue,
        setUserZoomValue,
        endUserRequestList,
        setEndUserRequestList,
        similarItemsModal,
        setSimilarItemsModal,
        similarItem,
        setSimilarItem,
        dependencies,
        setDependencies,
        level1requestModal,
        setLevel1RequestModal,
        productCombinationModal,
        setProductCombinationModal,
        newCombinationopen,
        setNewCombinationOpen,
        Level1PendingList,
        setLevel1PendingList,
        PendingRequest,
        setPendingRequest,
        productlinkList,
        setProductLinkList,
        newProductLink,
        setNewProductLink,
        IntialProductLink,
        Requestdependencies,
        setRequestDependencies,
        level2requestModal,
        setLevel2RequestModal,
        level3requestModal,
        setLevel3RequestModal,
        erprequestModal,
        setErpRequestModal,
        liverequestModal,
        setLiveRequestModal,
        createUserModal,
        setCreateUserModal,
        IntialUser,
        createUser,
        setCreateUser,
        itemListFilters,
        setItemListFilters,
        itemListFilterModalopen,
        setItemListFilterModalopen,
        subConItemRequestModalopen,
        setSubConItemRequestModalopen,
        subConItem,
        setSubConItem,
        IntialSubConItem,
        itemListLoading,
        setItemListLoading,
        itemListPage,
        setItemListPage,
        totalItemsCount,
        setTotalItemsCount,
      }}
    >
      {children}
    </States.Provider>
  )
}

export default StateProvider

const useStates = () => useContext(States)
export { useStates }
