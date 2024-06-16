import { Input } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'

const names = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eva',
  'Frank',
  'Grace',
  'Hannah',
  'Isaac',
  'Jack',
  'Karen',
  'Liam',
  'Mona',
  'Nathan',
  'Olivia',
  'Paul',
  'Quincy',
  'Rachel',
  'Sam',
  'Tina',
  'Uma',
  'Victor',
  'Wendy',
  'Xander',
  'Yara',
  'Zane',
  'Amy',
  'Brian',
  'Clara',
  'Daniel',
  'Elena',
  'Felix',
  'Georgia',
  'Harry',
  'Ivy',
  'Jacob',
  'Kate',
  'Leo',
  'Mia',
  'Noah',
  'Oscar',
  'Penny',
  'Quinn',
  'Ruby',
  'Steve',
  'Tara',
  'Ursula',
  'Vincent',
  'Willow',
  'Xenia',
]

const ITEM_COLUMN = 'ITEM'
const ITEM_GROUP_COLUMN = 'ITEM GROUP'
const PRODUCT_TYPE_COLUMN = 'PRODUCT TYPE'
const PRODUCT_CLASS_COLUMN = 'PRODUCT CLASS'
const PRODUCT_LINE_COLUMN = 'PRODUCT LINE'

const stateTobeChangedTo = {
  [ITEM_COLUMN]: {
    isSelected: true,
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

function ItemGroupColumn({ multiColumnState, setMultiColumnState }) {
  //   const [search, setSearch] = useState('')

  //   let filteredNames = names.filter((name) =>
  //     name.toLowerCase().includes(search.toLowerCase())
  //   )

  //   const handleSelect = (name) => {
  //     setSearch(name)

  //     let newMultiColumnState = { ...stateTobeChangedTo }
  //     newMultiColumnState[ITEM_GROUP_COLUMN] = {
  //       isSelected: true,
  //     }

  //     setMultiColumnState(newMultiColumnState)
  //   }

  //   const handleSearch = (e) => {
  //     setSearch(e.target.value)
  //     if (multiColumnState[ITEM_GROUP_COLUMN].isSelected) {
  //       let newMultiColumnState = { ...stateTobeChangedTo }
  //       newMultiColumnState[ITEM_GROUP_COLUMN] = {
  //         isSelected: false,
  //       }

  //       setMultiColumnState(newMultiColumnState)
  //     }
  //   }

  const [selected, setSelected] = useState(null)

  const handleSelect = (name) => {
    if (selected === name) {
      setSelected(null)
      let newMultiColumnState = { ...stateTobeChangedTo }
      setMultiColumnState(newMultiColumnState)
    } else {
      setSelected(name)

      let newMultiColumnState = { ...stateTobeChangedTo }
      newMultiColumnState[ITEM_GROUP_COLUMN] = {
        isSelected: true,
        value: name,
      }

      setMultiColumnState(newMultiColumnState)
    }
  }
  return (
    <Wrapper>
      <div className="category-header">
        <div className="catgeory-header-title">{ITEM_GROUP_COLUMN}</div>
        {/* <Input
          placeholder={`Search Item Group`}
          value={search}
          onChange={handleSearch}
        /> */}
      </div>
      <div className="category-body">
        <div className="filtered-values">
          {names.map((name) => {
            let isActive = name === selected

            return (
              <div
                className={isActive ? 'each-name active' : 'each-name'}
                onClick={() => handleSelect(name)}
              >
                {name}
              </div>
            )
          })}
        </div>
      </div>
    </Wrapper>
  )
}

export default ItemGroupColumn

const Wrapper = styled.div`
  border: 1px solid grey;
  border-radius: 0.5rem;

  .category-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid #bcccdc;
  }

  .catgeory-header-title {
    font-weight: bold;
    text-align: center;
  }

  .category-body {
    padding: 0.5rem;
    overflow-y: auto;
    max-height: 60vh;
  }

  .filtered-values {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;
    margin-top: 1rem;
  }

  .each-name {
    padding: 0.25rem 0.5rem;
    border: 1px solid #bcccdc;
    border-radius: 0.5rem;
    text-align: center;
    cursor: pointer;

    &:hover {
      border: 1px solid #1890ff;
    }
  }

  .active {
    background-color: #1890ff;
    color: white;
  }
`
