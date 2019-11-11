import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

// The connect() function connects a React component to a Redux store.
// the first parentheses contains the function Alert that we want to use to transform
// 'Passwords do not match' msg or props.
// the second parentheses contains the container that we want to connect to the redux.
// What the connect methods subscribes the Register component to any changes in redux store updates.
// And whenever that occurs our setAlert event is invoked and the result is passed as a prop to
// to Register component.
export default connect(mapStateToProps)(Alert);
