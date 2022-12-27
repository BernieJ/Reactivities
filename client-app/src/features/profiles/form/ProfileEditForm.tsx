import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProfileFormValues } from '../../../app/models/profile'
import { useStore } from '../../../app/stores/store'
import * as Yup from 'yup'
import { Button, Form, Header, Segment } from 'semantic-ui-react'
import { Formik } from 'formik'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from '../../../app/common/form/MyTextArea'

interface Props {
  toggleEditMode: () => void
}
export default observer(function ProfileEditForm({ toggleEditMode }: Props) {
  const { profileStore } = useStore()

  const { profile, updateProfile, loading } = profileStore

  //const { username } = useParams<{ username: string }>()

  const [profileform, setProfileForm] = useState<ProfileFormValues>(
    new ProfileFormValues(profile!),
  )

  const validationSchema = Yup.object({
    displayName: Yup.string().required('The displayName is required'),
    bio: Yup.string(),
  })

  function handleFormSubmit(profileForm: ProfileFormValues) {
    updateProfile(profileForm).then(() => toggleEditMode())
  }

  return (
    <Segment clearing>
      <Header content="Profile details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={profileform}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="displayName" placeholder="Display Name" />

            <MyTextArea rows={3} placeholder="Bio" name="bio" />

            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              onClick={() => toggleEditMode()}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  )
})
