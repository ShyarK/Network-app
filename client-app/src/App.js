import React from 'react';
import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/Layout/alert';

function App() {
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
            </Switch>
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
