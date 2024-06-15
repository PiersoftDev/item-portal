import { Modal } from 'antd'
import React from 'react'

function SimilarItemsModal({
  openSimilarItems,
  setOpenSimilarItems,
  selectedRecord,
  setSelectedRecord,
}) {
  const handleCancel = () => {
    setOpenSimilarItems(false)
    setSelectedRecord(null)
  }

  return (
    <Modal
      title="Similar Items Modal"
      open={openSimilarItems}
      onCancel={handleCancel}
      footer={null}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default SimilarItemsModal
