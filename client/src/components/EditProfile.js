import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import Nav from './Nav';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',


      errors: null,


    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }





  handleSubmit(event) {
    event.preventDefault();
    let _this = this;
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/profile/edit`, {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,


    })
      .then(function (response) {
        console.log(response);
        if (response.data.errors) {


          _this.setState({ errors: response.data.errors })

        } else {
          _this.setState({ userUpdated: true })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  componentDidMount() {
   

    let _this = this;

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/current_user`)
      .then(function (response) {
        if (response.data.error) {
          _this.setState({ loading: false })
        } else {
          _this.setState({

            loading: false,
            username: response.data.username,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
          })
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {

    return (
      <div className="col-md">
        <Nav logOut={this.handleLogOut} />
            <form onSubmit={this.handleSubmit}>
              <h5> Edit Profile</h5>
              {this.state.userUpdated && <p className="text-success"> Your Profile is updated</p>}

              <div className="form-group">
                <label htmlFor="register-firstname">Username</label>
                <input type="text" className="form-control" id="register-username" onChange={this.handleInputChange} value={this.state.username} name="username" placeholder="Enter Username" />
                {this.state.errors && this.state.errors.username &&
                  <p className="text-danger">
                    {this.state.errors.username.msg}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="register-firstname">First Name</label>
                <input type="text" className="form-control" id="register-firstname" onChange={this.handleInputChange} value={this.state.firstname} name="firstname" placeholder="First Name" />
                {this.state.errors && this.state.errors.firstname &&
                  <p className="text-danger">
                    {this.state.errors.firstname.msg}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="register-lastname">Last Name</label>
                <input type="text" className="form-control" id="register-lastname" onChange={this.handleInputChange} value={this.state.lastname} name="lastname" placeholder="Last Name" />
                {this.state.errors && this.state.errors.lastname &&
                  <p className="text-danger">{this.state.errors.lastname.msg}</p>}
              </div>


              <div className="form-group">
                <label htmlFor="register-email">Email address</label>
                <input type="email" className="form-control" id="register-email" onChange={this.handleInputChange} value={this.state.email} name="email" placeholder="Enter email" />
                {this.state.errors && this.state.errors.email &&
                  <p className="text-danger">{this.state.errors.email.msg}</p>}
              </div>



              <button type="submit" className="btn btn-primary">Save</button>
              <Link to="/profile" className="btn btn-secondary">Back to profile</Link>
            </form>
          </div>
  
     

    )
  }
}

export default EditProfile