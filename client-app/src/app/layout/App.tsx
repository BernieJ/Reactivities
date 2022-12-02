import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import axios from 'axios';
import { Activity } from '../models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities,  setActvities] = useState<Activity[]>([]);

  useEffect(()=> {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
    setActvities(response.data);
    });
  },[]);

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard activities={activities}></ActivityDashboard>
      </Container>

    </Fragment>
  );
}

export default App;
