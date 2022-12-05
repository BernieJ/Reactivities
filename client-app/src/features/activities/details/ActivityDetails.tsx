import React from 'react';
import { Button, ButtonGroup, Card, Icon, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  activity: Activity,
  cancelSelectedActivity: () => void,
  openForm: (id: string) => void,
};

export default function ActivityDetails({activity, cancelSelectedActivity, openForm}: Props) {
    return (
        <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        {activity.date}
      </Card.Meta>
      <Card.Description>
        {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <ButtonGroup>
        <Button onClick={() => openForm(activity.id)} basic color='blue' content='edit' />
        <Button onClick={cancelSelectedActivity} basic color='blue' content='Cancel' />
      </ButtonGroup>
    </Card.Content>
  </Card>
    )
}