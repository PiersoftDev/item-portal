import React from 'react'
import styled from 'styled-components'

const JSONDiff = ({ original, updated, type }) => {
  const keys = new Set([...Object.keys(original), ...Object.keys(updated)])

  return (
    <Pre>
      {Array.from(keys).map((key) => {
        const originalValue = original[key]
        const updatedValue = updated[key]
        const isDifferent = originalValue === updatedValue

        return (
          <DiffContainer
            key={key}
            isNew={type === 'new' && isDifferent}
            isExist={type === 'existing' && isDifferent}
          >
            <Key>{key} :</Key>
            {type === 'new' && (
              <ExistingValue isDifferent={isDifferent}>
                {updatedValue !== undefined ? updatedValue.toString() : 'N/A'}
              </ExistingValue>
            )}
            {type === 'existing' && (
              <NewValue isDifferent={isDifferent}>
                {originalValue !== undefined ? originalValue.toString() : 'N/A'}
              </NewValue>
            )}
          </DiffContainer>
        )
      })}
    </Pre>
  )
}

const Pre = styled.pre`
  font-family: monospace;
`

const DiffContainer = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
`

const Key = styled.strong`
  margin-right: 10px;
`

const NewValue = styled.span`
  background-color: ${({ isDifferent }) =>
    isDifferent ? '#FFFAB7' : 'transparent'};
  padding: 0.1rem 0.3rem;
  border-radius: 5px;
  white-space: wrap;
`

const ExistingValue = styled.span`
  background-color: ${({ isDifferent }) =>
    isDifferent ? '#FFFAB7' : 'transparent'};
  padding: 0.1rem 0.3rem;
  border-radius: 5px;
  white-space: wrap;
`

export default JSONDiff
