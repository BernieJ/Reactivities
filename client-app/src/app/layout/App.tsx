import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import NavBar from './navbar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import Homepage from '../home/HomePage'
import ActivityForm from '../../features/activities/form/ActivityForm'
import { Route, useLocation, Redirect } from 'react-router-dom'
import ActivityDetails from '../../features/activities/details/ActivityDetails'
import TestErrors from '../../features/errors/TestErrors'
import { ToastContainer } from 'react-toastify'
import NotFound from '../../features/errors/NotFound'
import ServerError from '../../features/errors/ServerError'

const App = observer(() => {
  const location = useLocation()

  return (
    <Fragment>
      <Route exact path="/" component={Homepage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <ToastContainer
              position="bottom-right"
              hideProgressBar
              theme="colored"
            />
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route exact path="/errors" component={TestErrors} />
              <Route exact path="/not-found" component={NotFound} />
              <Route exact path="/server-error" component={ServerError} />
              {/* <Route path="*" render={() => <Redirect to="/not-found" />} /> */}
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
