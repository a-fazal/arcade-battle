import React, { Component } from "react";
import avatar from "./avatar.jpeg";

class Profile extends Component {
  constructor(props) {
    super(props);
    // BACK END STATES
    this.state = {
      data: null
    }
    this.changePassword = this.changePassword.bind(this);
    this.changeName = this.changeName.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
  }

  componentDidMount(){
    this.fetchUserInfo();
  }

  fetchUserInfo(){
    fetch('/user').then((response) => {
      if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          return response.json();
      }
    }).then((json) => {
      this.setState({username: json.username, password: json.password, uri: json.uri});
    }).catch((error) => {
      alert(error.message);
    })
  }

  changePassword(e) {
    e.preventDefault();
    const oldPass = document.querySelector('#oldPass').value;
    const newPass = document.querySelector('#newPass').value;
    const confirmPass = document.querySelector('#confirmPass').value;
    if (oldPass.length > 0 && newPass.length > 0 && confirmPass.length > 0) {
      if (oldPass === this.state.password && newPass === confirmPass && newPass === this.state.password) {
        alert('You cannot use the old password.');
      } else if (oldPass === this.state.password && newPass === confirmPass && newPass !== this.state.password) {
        alert('Succesfully changed your password!');
        this.setState({password: newPass});
      } else if (oldPass !== this.state.password) {
        alert("Your old password doesn't match.");
      } else if (confirmPass !== newPass) {
        alert("Confirm your new password again.");
      }
    } else {
      if (oldPass.length === 0){
        alert('Enter your old password.');
      } else if (newPass.length === 0) {
        alert('Enter your new password.');
      } else if (confirmPass.length === 0) {
        alert('Confirm your new password.');
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
    const data = {username: this.state.username, uri: this.state.uri, password: this.state.username};
    if (!data) {
      return (<div>LOADING</div>);
    }
    return (
      <div className="container">
      <div className="row">
	      	<div className="col-sm">
	      		<div className="username-container">
	      			<span className="green" id="userName"><h2>{data.username}</h2></span>
	      		</div>
	      	</div>
      	</div>

      	<div className="row">
      		<div className="col-sm">
      			<div className="avatar-container">
	      			<img className="avatar" src={data.uri} />	      		
            </div>
	      		<button type="button" className="btn btn-primary" id="change-icon">Change avatar</button>
	      	</div>

      	</div>

      	<div className="row">
      		<div className="col-5 profile-changes">
      			<span className="profile-changes-header">Change username</span>
      			<form>
            <br />
      			New username<br/>
      			<input type="text" className="form-control" id="nameInput" placeholder="Enter username" name="newName"/>
      			<br/>
      			</form>
            <button type="button" className="btn btn-primary" id="change-name-btn" onClick={this.changeName}>Submit</button>
      		</div>

      		<div className="col-2">
      		</div>

      		<div className="col-5 profile-changes">
      			<span className="profile-changes-header">Change password</span>
      			<form>
      			Old password<br/>
      			<input type="text" className="form-control" id="oldPass" placeholder="Enter old password"/>
      			<br/>
      			New password<br/>
      			<input type="text" className="form-control" id="newPass" placeholder="Enter new password" name="newPass"/>
      			<br />
            Confirm new password<br />
            <input type="text" className="form-control" id="confirmPass" placeholder="Confirm password"/>
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
