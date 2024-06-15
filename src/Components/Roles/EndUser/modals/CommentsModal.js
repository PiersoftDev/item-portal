import { Modal, Tag, Timeline } from 'antd'
import React from 'react'
import TimeLineChildCommentsComponent from './TimeLineChildCommentsComponent'
import styled from 'styled-components'

function CommentsModal({
  openComments,
  setOpenComments,
  selectedRecord,
  setSelectedRecord,
}) {
  const handleCancel = () => {
    setOpenComments(false)
    setSelectedRecord(null)
  }

  const comments = [
    {
      commentId: '1234',
      comment: 'Pls enter all the valid fields',
      author: 'Ramesh Ramathota',
      commitDate: '2024-06-15 11:21:36',
    },
    {
      commentId: '153',
      comment: 'Pls enter all the valid fields',
      author: 'Durga naga',
      commitDate: '2024-06-15 11:21:36',
    },
    {
      commentId: '111',
      comment: 'Pls enter all the valid fields',
      author: 'Ram',
      commitDate: '2024-06-15 11:21:36',
    },
    {
      commentId: '1234',
      comment: 'Pls enter all the valid fields',
      author: 'Krishna',
      commitDate: '2024-06-15 11:21:36',
    },
  ]

  const recordIdComponent = (
    <div>
      Comments for the record : <Tag color="green"> {selectedRecord?.id}</Tag>
    </div>
  )

  return (
    <Modal
      title={recordIdComponent}
      open={openComments}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose={true}
    >
      <Wrapper>
        <Timeline
          items={comments.map((item) => {
            return {
              children: <TimeLineChildCommentsComponent {...item} />,
            }
          })}
        />
      </Wrapper>
    </Modal>
  )
}

export default CommentsModal

const Wrapper = styled.div`
  margin-top: 1rem;
  max-height: 80vh;
  overflow-y: auto;
`
