import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

function TimeLineChildCommentsComponent({
  commentId,
  comment,
  author,
  commitDate,
}) {
  let date = dayjs(commitDate).format('MMMM D, YYYY')
  let time = dayjs(commitDate).format('HH:mm')

  const dateOfCommit = `${date} at ${time}`

  return (
    <Wrapper>
      <div className="event-header">
        <span className="event-author">{author}</span>
        <span className="event-time">{dateOfCommit}</span>
      </div>

      <div className="cmt-msg">{comment}</div>

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
  .event-header {
    display: flex;
    align-items: baseline;
    gap: 0.2rem;
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
  }

  .event-body-container {
    margin-left: -0.5rem;
  }

  .cmt-msg {
    font-weight: 500;
    color: #102a43;
    font-size: 0.9rem;
  }
`
