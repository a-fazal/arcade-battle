import React, { Component } from "react";
import avatar from "./avatar.jpeg";

class Profile extends Component {
  constructor(props) {
    super(props);
    // BACK END STATES
    this.state = {
      name: 'user',
      password: 'user'
    }
    this.changePassword = this.changePassword.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  changePassword(e) {
    e.preventDefault();
    // MODIFY BACK END
    const oldPass = document.querySelector('#oldPass').value;
    const newPass = document.querySelector('#newPass').value;
    if ((oldPass.length > 0 || newPass.length > 0) && oldPass === this.state.password) {
      alert('Succesfully changed password!');
    } else {
      if (oldPass.length === 0 || newPass.length === 0){
        alert('Invalid password');
      } else {
        alert('Incorrect old password, unable to change');
      }
    }
  }

  changeName(e) {
    e.preventDefault();
    // MODIFY BACK END
    const inputtedName = document.querySelector('#nameInput').value;
    if (inputtedName.length > 0) {
      alert('Succesfully changed name!');
      this.setState({name: inputtedName});
    } else {
      alert('Not a valid name');
    }
  }

  render() {

    return (
      <div className="container">
      <div className="row">
	      	<div className="col-sm">
	      		<div className="username-container">
	      			<span className="green" id="userName"><h2>{this.state.name}</h2></span>
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
      			<input type="text" className="form-control" id="nameInput" placeholder="Enter username"/>
      			<br/>
      			</form>
            <button type="button" className="btn btn-primary" id="change-name-btn" onClick={this.changeName}>Submit</button>
      		</div>

      		<div className="col-2">
      		</div>

      		<div className="col-5 profile-changes">
      			<span class="profile-changes-header">Change password</span>
      			<form>
      			Old password<br/>
      			<input type="text" className="form-control" id="oldPass" placeholder="Enter old password"/>
      			<br/>
      			New password<br/>
      			<input type="text" className="form-control" id="newPass" placeholder="Enter new password"/>
      			<br />
      			</form>
            <button type="button" className="btn btn-primary" id="change-password-btn" onClick={this.changePassword}>Submit</button>
      		</div>
      	</div>
      </div>
    );
  }
}

export default Profile;
