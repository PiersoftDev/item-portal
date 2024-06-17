import { Modal } from 'antd'
import React from 'react'
import HierachyComponentsContainer from './HierachyComponentsContainer'

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
      centered={true}
      width="80vw"
    >
      <HierachyComponentsContainer />
    </Modal>
  )
}

export default ProductLinkHierarchyModal
