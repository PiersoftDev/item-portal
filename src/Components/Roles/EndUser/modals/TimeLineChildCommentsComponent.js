import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

function TimeLineChildCommentsComponent({
  author,
  commentType,
  date,
  field,
  txt,
  level,
}) {
  let dateFormatValue = dayjs(date).format('MMMM D, YYYY')
  let timeFormatValue = dayjs(date).format('HH:mm')

  const dateOfCommit = `${dateFormatValue} at ${timeFormatValue}`

  let authorMsg = `${author} ${commentType} at level ${level}`

  return (
    <Wrapper>
      <div className="event-header">
        <div className="event-author-header">
          <span className="event-author">{authorMsg} </span>
        </div>

        <div className="event-time">{dateOfCommit}</div>
      </div>

      <div className="cmt-msg">{txt}</div>

      {/* <ul className="event-body-container">
        {actions.map((action, index) => {
          return <li key={index}>{action}</li>
        })}
      </ul> */}
    </Wrapper>
  )
}

export default TimeLineChildCommentsComponent

const Wrapper = styled.div`
  /* .event-header {
    display: flex;
    align-items: baseline;
    gap: 0.2rem;
  } */

  .event-author-header {
  }

  .event-author {
    font-weight: 600;
    font-size: 1rem;
    color: black;
  }

  .event-time {
    color: #627d98;
    font-size: 0.7rem;
    font-weight: 500;
    margin-top: -0.3rem;
  }

  .event-body-container {
    margin-left: -0.5rem;
  }

  .cmt-msg {
    font-weight: 500;
    color: #102a43;
    font-size: 0.9rem;
    margin-top: 0.2rem;
  }
`
