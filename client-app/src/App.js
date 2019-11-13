import React, { useEffect } from 'react';
import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/Layout/alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRout from './components/routing/PrivateRout';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <PrivateRout exact path="/dashboard" component={Dashboard} />
              <PrivateRout exact path="/create-profile" component={CreateProfile} />
              <PrivateRout exact path="/edit-profile" component={EditProfile} />
              <PrivateRout exact path="/add-experience" component={AddExperience} />
              <PrivateRout exact path="/add-education" component={AddEducation} />
            </Switch>
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
