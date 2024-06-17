import React, { useState } from 'react'
import styled from 'styled-components'
import EachHierarchyComponent from './hierarchyComponents/EachHierarchyComponent'
import ItemColumn from './hierarchyComponents/ItemColumn'
import ItemGroupColumn from './hierarchyComponents/ItemGroupColumn'
import ProductTypeColumn from './hierarchyComponents/ProductTypeColumn'
import ProductClass from './hierarchyComponents/ProductClass'
import ProductLine from './hierarchyComponents/ProductLine'

const ITEM_COLUMN = 'ITEM'
const ITEM_GROUP_COLUMN = 'ITEM GROUP'
const PRODUCT_TYPE_COLUMN = 'PRODUCT TYPE'
const PRODUCT_CLASS_COLUMN = 'PRODUCT CLASS'
const PRODUCT_LINE_COLUMN = 'PRODUCT LINE'

const intitialState = {
  [ITEM_COLUMN]: {
    isSelected: false,
  },
  [ITEM_GROUP_COLUMN]: {
    isSelected: false,
  },
  [PRODUCT_TYPE_COLUMN]: {
    isSelected: false,
  },
  [PRODUCT_CLASS_COLUMN]: {
    isSelected: false,
  },
  [PRODUCT_LINE_COLUMN]: {
    isSelected: false,
  },
}

function HierachyComponentsContainer() {
  const [multiColumnState, setMultiColumnState] = useState(intitialState)

  return (
    <Wrapper>
      <ItemColumn
        multiColumnState={multiColumnState}
        setMultiColumnState={setMultiColumnState}
      />
      {multiColumnState[ITEM_COLUMN].isSelected && (
        <ItemGroupColumn
          multiColumnState={multiColumnState}
          setMultiColumnState={setMultiColumnState}
        />
      )}
      {multiColumnState[ITEM_GROUP_COLUMN].isSelected && (
        <ProductTypeColumn
          multiColumnState={multiColumnState}
          setMultiColumnState={setMultiColumnState}
        />
      )}
      {multiColumnState[PRODUCT_TYPE_COLUMN].isSelected && (
        <ProductClass
          multiColumnState={multiColumnState}
          setMultiColumnState={setMultiColumnState}
        />
      )}
      {multiColumnState[PRODUCT_CLASS_COLUMN].isSelected && (
        <ProductLine
          multiColumnState={multiColumnState}
          setMultiColumnState={setMultiColumnState}
        />
      )}
    </Wrapper>
  )
}

export default HierachyComponentsContainer

const Wrapper = styled.div`
  height: 70vh;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  align-items: flex-start;
  gap: 2rem;
`
