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
    this.changeMyPassword = this.changeMyPassword.bind(this);
    this.changeOtherPassword = this.changeOtherPassword.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeMyName = this.changeMyName.bind(this);
    this.changeOtherName = this.changeOtherName.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
  }

  componentDidMount(){
    this.fetchUserInfo();
  }

  fetchUserInfo(){
    if (this.props.match){
      const id = this.props.match.params.id;
      fetch(`/user/${id}`).then((response) => {
        if (response.status !== 200) {
            throw new Error(response.statusText);
          } else {
            return response.json();
        }
      }).then((json) => {
        this.setState({username: json.username, uri: json.uri});
      }).catch((error) => {
        alert(error.message);
      })
    } else {
      fetch('/user').then((response) => {
        if (response.status !== 200) {
            throw new Error(response.statusText);
          } else {
            return response.json();
        }
      }).then((json) => {
        this.setState({username: json.username, uri: json.uri});
      }).catch((error) => {
        alert(error.message);
      })
    }
  }

  changePassword(e) {
    e.preventDefault();
    const newPass = document.querySelector('#newPass').value;
    const confirmPass = document.querySelector('#confirmPass').value;
    if(this.props.match){
      this.changeOtherPassword(this.props.match.params.id, newPass, confirmPass);
    } else {
      const oldPass = document.querySelector('#oldPass').value;
      this.changeMyPassword(oldPass, newPass, confirmPass);
    }
  }
  
  changeMyPassword(oldPass, newPass, confirmPass){
    if (oldPass.length > 0 && newPass.length > 0 && confirmPass.length > 0) {
      fetch('/currentuser/updatepass', {
        method: "PATCH",
        body: JSON.stringify({oldPass, newPass, confirmPass}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if (response.status !== 200) {
          if(response.status == 400) {
            alert(response.body.msg);
          } else{
            throw new Error(response.statusText);
          }
        } else {
          return response.json();
        }})
      .then((user) => {
        alert("Successfully changed password!")
      }).catch((error) => {
        alert(error);
      })
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
  
  changeOtherPassword(id, newPass, confirmPass){
    if (newPass.length > 0 && confirmPass.length > 0) {
      fetch(`/user/${id}/updatepass`, {
        method: "PATCH",
        body: JSON.stringify({newPass, confirmPass}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if (response.status !== 200) {
          if(response.status == 400) {
            alert(response.body.msg);
          } else{
            throw new Error(response.statusText);
          }
        } else {
          return response.json();
        }})
      .then((user) => {
        alert("Successfully changed password!")
      }).catch((error) => {
        alert(error);
      })
    } else {
      if (newPass.length === 0) {
        alert('Enter your new password.');
      } else if (confirmPass.length === 0) {
        alert('Confirm your new password.');
      }
    }
  }

  changeName(e) {
    e.preventDefault();
    const inputtedName = document.querySelector('#nameInput').value;
    if(this.props.match){
      this.changeOtherName(this.props.match.params.id, inputtedName);
    } else {
      this.changeMyName(inputtedName);
    }
  }
  
  changeMyName(inputtedName){
    if (inputtedName.length > 0) {
      fetch('/currentuser/updatename', {
        method: "PATCH",
        body: JSON.stringify({newName: inputtedName}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }})
      .then((user) => {
        this.props.setUser(user.username)
        this.setState({username: user.username});
        alert("Successfully changed name!")
      }).catch((error) => {
        alert(error);
      })
    } else {
      alert('Not a valid name');
    }
  }
  
  changeOtherName(id, inputtedName){
    if (inputtedName.length > 0) {
      fetch(`/user/${id}/updatename`, {
        method: "PATCH",
        body: JSON.stringify({newName: inputtedName}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }})
      .then((user) => {
        this.setState({username: user.username});
        alert("Successfully changed name!")
      }).catch((error) => {
        alert(error);
      })
    } else {
      alert('Not a valid name');
    }
  }

  render() {
    const data = {username: this.state.username, uri: this.state.uri};
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
      			{this.props.user !== "admin" &&
              <>
      			<input type="text" className="form-control" id="oldPass" placeholder="Enter old password"/>
      			<br/>
      			</>
            }
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
