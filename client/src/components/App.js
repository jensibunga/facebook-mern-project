import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
// import Login from './Login';
import Timeline from './Timeline';
//import RegisterValidation from './RegisterValidation';
import Profile from './Profile';
import EditProfile from './EditProfile';


class App extends React.Component {

  render() {
    return (
<Router>
  <Switch>
  <Route exact path="/" component={Home}/>
  <Route exact path="/timeline" component={Timeline}/>
  <Route exact path="/profile" component={Profile}/>
  <Route exact path="/profile/edit" component={EditProfile} />

  

  </Switch>
  </Router>

    )
  }
}

export default App;