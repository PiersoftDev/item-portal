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

function EachHierarchyComponent({ column }) {
  const [search, setSearch] = useState('')

  let filteredNames = names.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (name) => {
    setSearch(name)
  }

  return (
    <Wrapper>
      <div className="category-header">
        {/* <div className="catgeory-header-title">{column}</div> */}
        <Input
          placeholder={`Search ${column}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="category-body">
        <div className="filtered-values">
          {filteredNames.map((name) => {
            let isActive = name === search

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

export default EachHierarchyComponent

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
