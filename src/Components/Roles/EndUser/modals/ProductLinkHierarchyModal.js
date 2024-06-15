import { Modal } from 'antd'
import React from 'react'

function ProductLinkHierarchyModal({
  openProductLinkHierarchy,
  setOpenProductLinkHierarchy,
  selectedRecord,
  setSelectedRecord,
}) {
  const handleCancel = () => {
    setOpenProductLinkHierarchy(false)
    setSelectedRecord(null)
  }

  return (
    <Modal
      title="Product link Hierarchy  Modal"
      open={openProductLinkHierarchy}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose={true}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default ProductLinkHierarchyModal
