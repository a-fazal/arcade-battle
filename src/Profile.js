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
	      			<span className="user-bio">Hello I am new! I look forward to playing with everyone!</span>
	      		</div>
	      		<button type="button" className="btn btn-primary" id="change-icon">Change avatar</button>
	      	</div>

      	</div>

      	<div className="row">
      		<div className="col-5 profile-changes">
      			<span className="profile-changes-header">Change username</span>
      			<form>
      			New username<br/>
      			<input type="text" className="form-control" placeholder="Enter username"/>
      			<br/>
      			</form>
      		</div>

      		<div className="col-2">
      		</div>

      		<div className="col-5 profile-changes">
      			<span>Change password</span>
      			<form>
      			Old password<br/>
      			<input type="text" className="form-control" placeholder="Enter old password"/>
      			<br/>
      			New password<br/>
      			<input type="text" className="form-control" placeholder="Enter new password"/>
      			<br />
      			</form>
      		</div>
      	</div>
      </div>
    );
  }
}

export default Profile;
