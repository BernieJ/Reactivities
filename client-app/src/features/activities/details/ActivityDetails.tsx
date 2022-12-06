import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'

interface Props {}

const ActivityDetails = observer(({}: Props) => {
  const { activityStore } = useStore()

  const {
    selectedActivity: activity,
    openForm,
    cancelSelectedActivity,
  } = activityStore

  if (!activity) return <LoadingComponent />

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>{activity.date}</Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup>
          <Button
            onClick={() => openForm(activity.id)}
            basic
            color="blue"
            content="edit"
          />
          <Button
            onClick={cancelSelectedActivity}
            basic
            color="blue"
            content="Cancel"
          />
        </ButtonGroup>
      </Card.Content>
    </Card>
  )
})

export default ActivityDetails
