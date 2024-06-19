import { Modal, Tag, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import TimeLineListChildComponent from './TimeLineListChildComponent'
import styled from 'styled-components'
import dayjs from 'dayjs'
import axios from 'axios'
import { useStates } from '../../../../utils/StateProvider'

function HistoryModal({
  openHistory,
  setOpenHistory,
  selectedRecord,
  setSelectedRecord,
}) {
  const [changeLogData, setChangeLogData] = useState([])

  const { testUrl } = useStates()

  const handleCancel = () => {
    setOpenHistory(false)
    setSelectedRecord(null)
  }

  const fetchChangeLogData = async () => {
    try {
      console.log(selectedRecord)
      const res = await axios.get(
        `${testUrl}/v1/mdm/purchase-item/audit/${selectedRecord?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )

      const changeLogList = processChangeLogResponseData(res?.data?.data || {})

      setChangeLogData(changeLogList)
    } catch (error) {
      console.log(error)
    }
  }

  function getFirstStringInSingleQuotes(str) {
    const regex = /'([^']*)'/
    const match = str.match(regex)
    return match ? match[1] : null
  }

  const processChangeLogResponseData = (data) => {
    const changeLogList = Object.keys(data)
      .reduce((acc, currCommitId) => {
        let commitData = data[currCommitId]
        let formattedCommitHistory = {}

        if (commitData?.length > 0) {
          let { commitId, author, commitDate, action } = commitData[0]
          formattedCommitHistory.commitId = commitId
          formattedCommitHistory.author = author
          formattedCommitHistory.commitDate = commitDate
          formattedCommitHistory.action = action
        }

        let isCreated = false
        let actions = commitData
          .filter(({ statusField }) => !statusField?.includes('Id'))
          .map(({ statusField, previousValue, currentValue }) => {
            if (!previousValue && !currentValue) {
              isCreated = true
            }

            return {
              statusField,
              previousValue,
              currentValue,
            }
          })

        if (isCreated) {
          formattedCommitHistory.action = 'IS_CREATED'
        }

        formattedCommitHistory.actions = actions
        acc.push(formattedCommitHistory)
        return acc
      }, [])
      .sort((a, b) => dayjs(a.commitDate).isBefore(dayjs(b.commitDate)))

    console.log(changeLogList)

    return changeLogList
  }

  useEffect(() => {
    fetchChangeLogData()
  }, [])

  const recordIdComponent = (
    <div>
      Commit history for the record :{' '}
      <Tag color='green'> {selectedRecord?.id}</Tag>
    </div>
  )

  return (
    <Modal
      title={recordIdComponent}
      open={openHistory}
      onCancel={handleCancel}
      footer={null}
      centered={true}
      destroyOnClose={true}
      width={'800px'}
    >
      <Wrapper>
        <Timeline
          items={changeLogData.map((item) => {
            return {
              children: <TimeLineListChildComponent {...item} />,
            }
          })}
        />
      </Wrapper>
    </Modal>
  )
}

export default HistoryModal

const Wrapper = styled.div`
  margin-top: 1rem;
  max-height: 80vh;
  overflow-y: auto;
`
