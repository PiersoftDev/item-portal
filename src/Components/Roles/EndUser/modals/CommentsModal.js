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

  let { comments } = selectedRecord || []

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
        {comments?.length === 0 ? (
          <div>No comments </div>
        ) : (
          <Timeline
            items={comments.map((item) => {
              return {
                children: <TimeLineChildCommentsComponent {...item} />,
              }
            })}
          />
        )}
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
