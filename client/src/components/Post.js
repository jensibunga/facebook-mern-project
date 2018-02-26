import React from 'react';
import CommentList from './CommentList';
import axios from 'axios';
import moment from 'moment';


class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editting: false,
      value: this.props.post.text,//copy from the props 1 time
      likes: this.props.post.likes,

    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let _this = this;
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/post/${this.props.post._id}/update`, { text: this.state.value })
      .then(function (response) {
        _this.setState({ editting: false })
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  handleEdit() {

    this.setState({ editting: true });

  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleDelete(event) {
    let _this = this;
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/post/${this.props.post._id}`)
      .then(function (response) {
        _this.props.refreshTimeline(); //call passed down function to notice parent components
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleLike(event) {
    let _this = this;
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/post/${this.props.post._id}/like`)
      .then(function (response) {
        _this.setState({ likes: response.data.likes })
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleShare() {
    let _this = this;
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/${this.props.post._id}/share`)
      .then(function (response) {
        _this.props.refreshTimeline();
        //console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    // console.log(this.state.likes);
    return (


      <div>


        {this.props.post.user.firstname} {this.props.post.user.lastname} -
        {moment(this.props.post.createdAt).format('MMMM Do YYYY')}
        {this.state.editting
          ?//if true
          <form onSubmit={this.handleSubmit}>
            <textarea onChange={this.handleChange} value={this.state.value} className="form-control" rows={2}></textarea>
            <button type="Submit">Update</button>
          </form>
          : //if false
          <div>
            {this.props.post.user._id !== this.props.user._id &&
              <div className="clearfix">
                <div className="float-right">
                  <button onClick={this.handleShare} className="btn btn-outline-primary">Share</button>
                </div>
              </div>
            }

            <p>{this.state.value}</p>
            {this.props.post.user._id === this.props.user._id &&
              <div>
                <button className="btn btn-outline-secondary" onClick={this.handleEdit}>Edit</button>
                <button className=" btn btn-outline-secondary" onClick={this.handleDelete}>Delete</button>
              </div>
            }
            <div className="clearfix">
              <div className="float-right">
                {this.state.likes && this.state.likes > 0 &&
                  <p>Likes: {this.state.likes}</p>}
                <div>
                  <button onClick={this.handleLike} className="btn btn-success">Like</button></div>

              </div>
            </div>
          </div>

        }
        <CommentList 
        postId={this.props.post._id} 
        userId={this.props.user._id}
          />
      </div>
    )
  }

}
export default Post;