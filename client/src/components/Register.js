import React from 'react';
import axios from 'axios';

class Register extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      birthdate: '',

      errors: null,

      registrationCompleted: false,
      
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let _this = this;
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname:this.state.lastname,
      email: this.state.email,
      password:this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
      //birthdate: this.state.birthdate

    })
      .then(function (response) {
        console.log(response);
        if(response.data.errors){

        
        _this.setState({errors: response.data.errors})

        }else {
          _this.setState({registrationCompleted: true})
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


  render() {

    return (
        <div className="col-md">
          {this.state.registrationCompleted
            ?
            <div>
              <p>Thank you for signing up.</p>
              <p>Please login...</p>
            </div>
            :
            <div>
            <form onSubmit={this.handleSubmit}>
              <h5> Register</h5>

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

              <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <input type="password" className="form-control" id="register-password" onChange={this.handleInputChange} value={this.state.password} name="password" placeholder="Password" />
                {this.state.errors && this.state.errors.password &&
                
                  <p className="text-danger">{this.state.errors.password.msg}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="register-password-confirmation">Password Confirmation</label>
                <input type="password" className="form-control" id="register-password-confirmation" onChange={this.handleInputChange} value={this.state.passwordConfirmation} name="passwordConfirmation" placeholder="Password" />
                {this.state.errors && this.state.errors.passwordConfirmation &&

                  <p className="text-danger">{this.state.errors.passwordConfirmation.msg}</p>}
              </div>

              {/* <div className="form-group">
                <label htmlFor="bday">Birth Date</label>
                <input type="date" className="form-control" id="birthdate" onChange={this.handleInputChange} value={this.state.birthdate} name="birthdate" />
                <span className="validity" />
              </div> */}
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>}
        </div>

    )
  }
}

export default Register;