import { observer } from 'mobx-react-lite'
import { Header, Button, Container, Tab, Grid } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store'
import ProfileEditForm from './form/ProfileEditForm'

interface Props {
  profile: Profile
}

export default observer(function ProfileAbout({ profile }: Props) {
  const { profileStore } = useStore()
  const { toggleEditMode, editMode, isCurrentUser } = profileStore

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header as="h2">Profile {profile.displayName}</Header>
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? 'Cancel' : 'Edit profile'}
              onClick={() => toggleEditMode()}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {!editMode && (
            <Container fluid>
              <p style={{ whiteSpace: 'pre-wrap' }}>{profile.bio}</p>
            </Container>
          )}
          {editMode && <ProfileEditForm toggleEditMode={toggleEditMode} />}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
})
