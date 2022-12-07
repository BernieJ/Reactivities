import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import NavBar from './navbar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import Homepage from '../home/HomePage'
import ActivityForm from '../../features/activities/form/ActivityForm'
import { Route, useLocation } from 'react-router-dom'
import ActivityDetails from '../../features/activities/details/ActivityDetails'

const App = observer(() => {
  const location = useLocation()

  return (
    <Fragment>
      <Route exact path="/" component={Homepage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={['/createActivity', '/manage/:id']}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </Fragment>
  )
})

export default App
