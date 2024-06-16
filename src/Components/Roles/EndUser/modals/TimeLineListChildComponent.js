import { Row, Tag } from 'antd'
import dayjs from 'dayjs'
import { BsDot } from 'react-icons/bs'
import styled from 'styled-components'

const actionColors = {
  deleted: {
    color: '#842029',
    backgroundColor: '#f8d7da',
  },
  created: {
    color: '#0f5132',
    backgroundColor: '#d1e7dd',
  },
  updated: {
    color: 'var(--primary-700)',
    backgroundColor: 'var(--primary-200)',
  },
}

function camelCaseToProperString(camelCaseStr) {
  // Replace camel case with space and lowercase
  let properStr = camelCaseStr.replace(/([A-Z])/g, ' $1').toLowerCase()

  // Capitalize the first letter of the string
  properStr = properStr.charAt(0).toUpperCase() + properStr.slice(1)

  return properStr
}

const TimeLineListChildComponent = ({
  actions,
  author,
  commitId,
  commitDate,
  action,
}) => {
  let date = dayjs(commitDate).format('MMMM D, YYYY')
  let time = dayjs(commitDate).format('HH:mm')

  const dateOfCommit = `${date} at ${time}`

  return (
    <Wrapper>
      <div className="event-header">
        {action === 'IS_CREATED' ? (
          <div className="event-author">
            <span>{author}</span> created the record
          </div>
        ) : (
          <div className="event-author">
            <span>{author}</span> updated the record
          </div>
        )}

        <div className="event-time">
          <span>{dateOfCommit}</span>
        </div>
      </div>

      <ul className="event-body-container">
        {actions.map((act, index) => {
          let { previousValue: left, currentValue: right, statusField } = act

          left = typeof left === 'boolean' ? left.toString() : left

          right = typeof right === 'boolean' ? right.toString() : right

          let field = camelCaseToProperString(statusField)

          if (statusField.includes('id')) {
            return
          }

          if (!left && !right) {
            return
          }

          if (left && right) {
            return (
              <li key={index} className="updated-event-action">
                <span> Updated </span>
                <span className="updated-property">{field} </span>
                <span>from</span>{' '}
                <Tag style={actionColors['deleted']}>{left}</Tag>
                <span>to</span>{' '}
                <Tag style={actionColors['created']}>{right}</Tag>
                {/* {`Updated the  ${propertyName}  from  ${left} to ${right} `} */}
              </li>
            )
          }

          if (!left && right) {
            return (
              <li key={index} className="updated-event-action">
                <span> Added value for </span>
                <span className="updated-property">{field} </span>
                {/* <span>from</span>{' '}
                <Tag style={actionColors['deleted']}>{left}</Tag> */}
                <span>is</span>{' '}
                <Tag style={actionColors['created']}>{right}</Tag>
                {/* {`Updated the  ${propertyName}  from  ${left} to ${right} `} */}
              </li>
            )
          }

          //   if (propertyName === 'isDeleted') {
          //     return (
          //       <li key={index} className="deleted-event-action">
          //         <span>Deleted record with this</span>
          //         <Tag>id</Tag>
          //         <span>{`: ${id}`}</span>
          //       </li>
          //     )
          //   }

          //   if (left === null) {
          //     return (
          //       <li key={index}>
          //         <Tag>{propertyName}</Tag> :{` ${right}`}
          //       </li>
          //     )
          //   }

          return <li key={index}>{action}</li>

          //   return (
          //     <li key={index} className="updated-event-action">
          //       <span> Updated </span>
          //       <span className="updated-property">{propertyName} </span>
          //       <span>from</span>
          //       <Tag style={actionColors['deleted']}>{left}</Tag>
          //       <span>to</span>
          //       <Tag style={actionColors['created']}>{right}</Tag>

          //       {/* {`Updated the  ${propertyName}  from  ${left} to ${right} `} */}
          //     </li>
          //   )
        })}
      </ul>
    </Wrapper>
  )
}
export default TimeLineListChildComponent

const Wrapper = styled.div`
  .event-author {
    font-weight: 500;
    color: #102a43;
  }

  .event-author span {
    font-weight: 600;
    font-size: 1rem;
    color: black;
  }

  .event-time {
    color: #627d98;
    font-size: 0.7rem;
    margin-top: -0.2rem;
    font-weight: 500;
  }

  .event-body-container {
    margin-left: -0.5rem;
  }

  .updated-property {
    font-weight: 500;
  }
`
