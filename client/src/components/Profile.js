import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Nav from './Nav';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: null,
    }
    this.deleteUser = this.deleteUser.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);

  }

  deleteUser(event){
    event.preventDefault();
    
    let _this =this;
    
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/profile/delete`)
    .then(function (response) {
      _this.setState({user: null})
    })
    .catch(function (error) {
      console.log(error);
    })

}

componentDidMount() {
  let _this = this;
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/current_user`)
    .then(function (response) {
      console.log(response);
      if (response.data.error) {
        _this.setState({ loading: false })
      } else {
        _this.setState({ user: response.data, loading: false })
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}

  handleLogOut() {
    let _this = this;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`)
      .then(function (response) {
        _this.setState({ user: null })
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

render() {
  if (this.state.loading) {
    return <p>Loading your profile, please wait...</p>

  } else if (!this.state.user) {
    return <Redirect to="/" />

  } else {
    return (
      <div>
        <Nav logOut={this.handleLogOut} />

      <div className="container">

        <h3> Your Profile</h3>

          <div className="card" style={{ width: '40rem' }}>
            <div className="card-body">
              <h5 className="card-title">{this.state.user.username}</h5>
              <h6 className="card-subtitle mb-2 text-muted"> {this.state.user.firstname} {this.state.user.lastname}</h6>
              <p className="card-text">{this.state.user.email}</p>
              <Link to="/profile/edit" className="card-link">Edit</Link>
              <a href="" onClick={this.deleteUser} className="card-link">Delete</a>
            </div>
          </div>


        {/* <div className="card" style={{ width: '25rem' }}>
          <div className="card-body">
            <h5 className="card-title">{this.state.user.username}</h5>
            <p className="card-text"></p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{this.state.user.firstname}</li>
            <li className="list-group-item">{this.state.user.lastname}</li>
            <li className="list-group-item">{this.state.user.email}</li>
          </ul>
          <div className="card-body">
            <Link to="/profile/edit" className="card-link">Edit</Link>
            <a href="" onClick={this.deleteUser} className="card-link">Delete</a>
          </div> 
    </div>*/}
      </div>
      </div>
    )
  }
}
}

export default Profile;