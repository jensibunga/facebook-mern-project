import React from 'react';
import axios from 'axios';

import PostForm from './PostForm';
import PostList from './PostList';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';



class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      user: null,
      loading: true,

    }

    this.handlePostFormSubmit = this.handlePostFormSubmit.bind(this);
    this.refreshTimeline = this.refreshTimeline.bind(this);
     this.handleLogOut=  this.handleLogOut.bind(this);
  }

  handlePostFormSubmit() {
    this.getPostsFromExpress();
  }

  refreshTimeline() {
    this.getPostsFromExpress();
  }

  getPostsFromExpress() {
    let _this = this;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`)
      .then(function (response) {
        //console.log('in componentdidmount response', response);
        _this.setState({ posts: response.data }) // update the state with all the posts
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getPostsFromExpress();

    let _this = this;

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/current_user`)
      .then(function (response) {
        if (response.data.error) {
          _this.setState({ loading: false })
        } else {
          _this.setState({ user: response.data, loading: false })
         // console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleLogOut(){
    let _this= this;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`)
    .then(function (response){
      _this.setState({user : null})
      //console.log(response);
    })
    .catch(function (error){
      console.log(error);
    })
  }

  render() {


    //console.log(this.props);
    if (this.state.loading) { //situation 1:loading the user
      return <p>Loading your user information, please be patient</p>
    } else if (!this.state.user) { // situation 2 ;loading is finished, but not logged in
      return <Redirect to="/" />
    } else { //situation3 :loading finished, user is logged in , so show timeline
      //console.log(this.state);
      return (

        <div>
          <Nav logOut={this.handleLogOut}/>
          
          <div className="container p-5">
            <h5> Timeline</h5>
            {this.state.user && this.state.user.firstname &&
              <h6>Welcome, {this.state.user.firstname}</h6>}

            <PostForm formHasBeenSubmittedAndSavedInDatabase={this.handlePostFormSubmit} 
                      user={this.state.user}/>
            <PostList posts={this.state.posts} 
                      refreshTimeline={this.refreshTimeline} 
                      user={this.state.user}/>
          </div>
        </div>
      )
    }
  }
}

export default Timeline;