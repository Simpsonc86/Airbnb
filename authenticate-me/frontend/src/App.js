// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route,Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/AllSpots'
import SingleSpot from './components/SingleSpot'
import CreateSpot from "./components/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateFormModal from "./components/UpdateFormModal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && 
      <Switch>
        <Route exact path='/spots/new'>
          <CreateSpot/>
        </Route>
        <Route exact path='/spots/:spotId'>
          <SingleSpot/>
        </Route>
        <Route exact path='/current'>
          <ManageSpots/>
        </Route>
        <Route exact path='/update-spot/:spotId'>
          <UpdateFormModal/>
        </Route>
        <Route exact path='/'>
          <AllSpots/>
        </Route>
      </Switch>}
    </>
  );
}

export default App;