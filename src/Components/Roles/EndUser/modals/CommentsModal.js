import { Modal } from 'antd'
import React from 'react'

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

  return (
    <Modal
      title="Comments Modal"
      open={openComments}
      onCancel={handleCancel}
      footer={null}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default CommentsModal
