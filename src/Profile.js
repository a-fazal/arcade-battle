import React, { Component } from "react";
import avatar from "./avatar.jpeg";

class Profile extends Component {
  render() {

    return (
      <div className="container">
      <div className="row">
	      	<div className="col-sm">
	      		<div className="username-container">
	      			<span className="green"><h2>User</h2></span>
	      		</div>
	      	</div>
      	</div>

      	<div className="row">
      		<div className="col-sm">
      			<div className="avatar-container">
	      			<img className="avatar" src={avatar} />
	      		</div>
	      		<button type="button" className="btn btn-primary" id="change-icon">Change avatar</button>
	      	</div>
      	</div>
      </div>
    );
  }
}

export default Profile;
