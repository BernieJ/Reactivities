import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities,  setActvities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(()=> {
    agent.Activities.list().then(response => {
      let activites : Activity[] = [];

      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activites.push(activity);
      });

    setActvities(activites);
    setLoading(false);
    });
  },[]);

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function hanldeFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);

    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActvities([...activities.filter(x => x.id !== activity.id), activity]) 
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActvities([...activities, {...activity}]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActvities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    
  }

  if(loading) return <LoadingComponent content='Loading app'/>


  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectedActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={hanldeFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>

    </Fragment>
  );
}

export default App;
