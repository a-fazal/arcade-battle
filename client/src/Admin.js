import React, { Component } from "react";
import { Link } from "react-router-dom";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
      active: []
    }
    this.fetchActiveUsers = this.fetchActiveUsers.bind(this);
    this.fetchPendingUsers = this.fetchPendingUsers.bind(this);
    this.acceptPendingUser = this.acceptPendingUser.bind(this);
    this.denyPendingUser = this.denyPendingUser.bind(this);
    this.banUser = this.banUser.bind(this);
    this.reinstateUser = this.reinstateUser.bind(this);
    this.logout = this.logout.bind(this);
 }

  componentDidMount() {
    this.fetchPendingUsers();
    this.fetchActiveUsers();
  }
  
  logout() {
    this.props.history.push('/');
  }

  fetchActiveUsers() {
    // BACKEND CALL

    const data = [
        {
          username: "Alec",
          id: 5,
          banned: false
        },
        {
          username: "Anusha",
          id: 8,
          banned: false
        },
        {
          username: "Sophia",
          id: 13,
          banned: false
        }
      ]
    this.setState({active: data});
  }
  
  fetchPendingUsers() {
    // BACKEND CALL

    const data = [
        {
          username: "gibdalf",
          id: 102
        },
        {
          username: "dude",
          id: 104
        },
        {
          username: "skrrrr",
          id: 108
        },
        {
          username: "brapbrap",
          id: 126
        }
      ]
    this.setState({pending: data});
  }
  
  acceptPendingUser(id) {
    // MODIFY BACK END
    return (function() {
      let i, idx;
      for(i = 0; i < this.state.pending.length; i++){
        if(this.state.pending[i].id === id){
          idx = i;
        }
      }
      
      const user = this.state.pending[idx];
      user.banned = false;
      const active = this.state.active;
      active.push(user);
      
      this.setState({pending: this.state.pending.filter(elem => elem.id !== id)});
      this.setState({active: active});
    }).bind(this);
  }
  
  denyPendingUser(id) {
    // MODIFY BACK END
    return (function() {
      this.setState({pending: this.state.pending.filter(elem => elem.id !== id)});
    }).bind(this);
  }
  
  banUser(id) {
    // MODIFY BACK END
    return (function(e) {
      e.preventDefault();
      const active = this.state.active;
      active.forEach(function(user) {
        if (user.id === id) {
          user.banned = true;
        }
      });
      this.setState({active: active});
    }).bind(this);
  }
  
  reinstateUser(id) {
    // MODIFY BACKEND
    return (function(e) {
      e.preventDefault();
      const active = this.state.active;
      active.forEach(function(user) {
        if (user.id === id) {
          user.banned = false;
        }
      });
      this.setState({active: active});
    }).bind(this);
  }
  
  render() {
    return (
      <div id="admin-dashboard">
        <button className="logout" onClick={this.logout}>
          <i className="fas fa-chevron-left" />LOGOUT
        </button>
        <div id="pending-registrations">
          <div className="text-center game-title">
            PENDING USER REGISTRATIONS
        </div>
          {this.state.pending.map(user =>
            <div className="pending-user">
              <span className="user-name">
                {user.username}
              </span>
              <button className="deny-user" onClick={this.denyPendingUser(user.id)}>DENY</button>
              <button className="accept-user" onClick={this.acceptPendingUser(user.id)}>ACCEPT</button>
            </div>)}
        </div>
        <div id="user-management">
          <div className="text-center game-title">
            ACTIVE USERS
          </div>
          {this.state.active.map(user =>
            <Link to={"/user/" + user.id}>
              <div className="active-user">
                <div className="user-description">
                  <div className="text-center">{user.username}</div>
                </div>
                <div className="user-avatar"></div>
                <div className="user-buttons-container text-center">
                  {user.banned ?
                    <button className="reinstate-user" onClick={this.reinstateUser(user.id)}>REINSTATE</button>
                    : <button className="ban-user" onClick={this.banUser(user.id)}>BAN</button>}
                </div>
                {user.banned && <div className="user-banned">BANNED</div>}
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  }

}

export default Admin;
