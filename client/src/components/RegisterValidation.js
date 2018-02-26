import React from 'react';

import axios from 'axios';



class RegisterValidation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      email: '',

      errors: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let _this = this;
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/validation`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      
    })
      .then(function (response) {
        console.log(response);
        if (response.data.errors) {
          _this.setState({
            errors: response.data.errors
          })
        }

      })
      .catch(function (error) {
        console.log(error)
      })

  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    }
    )

  }
  render() {
    console.log(this.state.errors);
    return (
      <div>
        <div className="container">
          <h5>Register</h5>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="register-firstname">First Name</label>
              <input type="text" className="form-control" id="register-firstname" onChange={this.handleInputChange} value={this.state.firstname} name="firstName" placeholder="First Name" />
                {this.state.errors && this.state.errors.firstName &&
                <p className="text-danger">{this.state.errors.firstName.msg}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="register-lastname">Last Name</label>
              <input type="text" className="form-control" id="register-lastname" onChange={this.handleInputChange} value={this.state.lastName} name="lastName" placeholder="Last Name" />
            {this.state.errors && this.state.errors.lastName &&
               <p className="text-danger">{this.state.errors.lastName.msg}</p>}
            </div>
              
            <div className="form-group">
              <label htmlFor="register-email">Email</label>
              <input type="text" className="form-control" id="register-password" onChange={this.handleInputChange} value={this.state.email} name="email" placeholder="Email" />
              {this.state.errors && this.state.errors.email &&
                <p className="text-danger">{this.state.errors.email.msg}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input type="text" className="form-control" id="register-password" onChange={this.handleInputChange} value={this.state.password} name="password" placeholder="Password" />
            {this.state.errors && this.state.errors.password &&
                <p className="text-danger">{this.state.errors.password.msg}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="register-password">Password Confirmation</label>
              <input type="text" className="form-control" id="register-password" onChange={this.handleInputChange} value={this.state.passwordConfirmation} name="passwordConfirmation" placeholder="Password Confirmation" />
              {this.state.errors && this.state.errors.passwordConfirmation &&
                <p className="text-danger">{this.state.errors.passwordConfirmation.msg}</p>}
            </div>

            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterValidation;