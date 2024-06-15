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

const TimeLineListChildComponent = ({
  actions,
  author,
  commitId,
  commitDate,
}) => {
  return (
    <Wrapper>
      <div className="event-header">
        <div className="event-author">
          <div>{author} updated the record</div>
        </div>
        <div className="event-time">
          <div>{commitDate}</div>
        </div>
      </div>

      <ul className="event-body-container">
        {actions.map((action, index) => {
          let { propertyName, left, right } = action

          left = typeof left === 'boolean' ? left.toString() : left

          right = typeof right === 'boolean' ? right.toString() : right

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

          return <li>{action}</li>

          return (
            <li key={index} className="updated-event-action">
              <span> Updated </span>
              <span className="updated-property">{propertyName} </span>
              <span>from</span>
              <Tag style={actionColors['deleted']}>{left}</Tag>
              <span>to</span>
              <Tag style={actionColors['created']}>{right}</Tag>

              {/* {`Updated the  ${propertyName}  from  ${left} to ${right} `} */}
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}
export default TimeLineListChildComponent

const Wrapper = styled.div``
