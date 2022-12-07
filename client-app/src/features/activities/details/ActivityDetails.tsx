import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import { useParams, Link } from 'react-router-dom'

const ActivityDetails = observer(() => {
  const { activityStore } = useStore()

  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) loadActivity(id)
  }, [id, loadActivity])

  if (loadingInitial || !activity) return <LoadingComponent />

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
            as={Link}
            to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="edit"
          />
          <Button
            as={Link}
            to="/activites"
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
