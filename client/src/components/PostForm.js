import React from 'react';
import axios from 'axios';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postMessage: "",
    }
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePostMessage(event) {

    this.setState({
      postMessage: event.target.value,
    })
  }

  handleSubmit(event) {
    let _this = this;
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/post`, {
      postMessage: this.state.postMessage,
      userId: this.props.user._id
  
    })
      .then(function (response) {
        _this.props.formHasBeenSubmittedAndSavedInDatabase(); //provided by the Timeline through props
        _this.setState({postMessage: ''})
          console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  render() {

  //  console.log('postform', this.props.user);
    return (

      <div className="p-4">
       

          

            <form onSubmit={this.handleSubmit} className="clearfix">

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Post a message</label>
                <textarea onChange={this.handlePostMessage} value={this.state.postMessage} className="form-control" id="exampleFormControlTextarea1" rows={3} />
              </div>
              <button type="submit" className="btn btn-primary float-right">Post Message</button>

            </form>



          </div>
      
    )
  }
}

export default PostForm;