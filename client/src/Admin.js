import React, { Component } from "react";
import { Link } from "react-router-dom";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
      active: []
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.acceptPendingUser = this.acceptPendingUser.bind(this);
    this.denyPendingUser = this.denyPendingUser.bind(this);
    this.banUser = this.banUser.bind(this);
    this.reinstateUser = this.reinstateUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  logout() {
    this.props.history.push('/');
  }

  fetchUsers() {
    fetch('/allusers').then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    }).then((json) => {
      const active = json.filter(user => user.isPending === false);
      const pending = json.filter(user => user.isPending === true);
      this.setState({
        active: active,
        pending: pending
      });
    }).catch((err) => {
      alert(err.message)
    });
  }

  acceptPendingUser(id) {
    return (function () {
      fetch(`/user/${id}/accept`, { method: 'PATCH' }).then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      }).then((user) => {
        const active = this.state.active;
        active.push(user);

        this.setState({ pending: this.state.pending.filter(elem => elem._id !== id) });
        this.setState({ active: active });
      }).catch((err) => {
        alert(err.message)
      });
    }).bind(this);
  }

  denyPendingUser(id) {
    return (function () {
      fetch(`/user/${id}/deny`, { method: 'PATCH' }).then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          this.setState({ pending: this.state.pending.filter(elem => elem._id !== id) });
        }
      }).catch((err) => {
        alert(err.message)
      });
    }).bind(this);
  }

  banUser(id) {
    // MODIFY BACK END
    return (function (e) {
      e.preventDefault();
      const active = this.state.active;
      active.forEach(function (user) {
        if (user.id === id) {
          user.banned = true;
        }
      });
      this.setState({ active: active });
    }).bind(this);
  }

  reinstateUser(id) {
    // MODIFY BACKEND
    return (function (e) {
      e.preventDefault();
      const active = this.state.active;
      active.forEach(function (user) {
        if (user.id === id) {
          user.banned = false;
        }
      });
      this.setState({ active: active });
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
              <button className="deny-user" onClick={this.denyPendingUser(user._id)}>DENY</button>
              <button className="accept-user" onClick={this.acceptPendingUser(user._id)}>ACCEPT</button>
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
                    <button className="reinstate-user" onClick={this.reinstateUser(user._id)}>REINSTATE</button>
                    : <button className="ban-user" onClick={this.banUser(user._id)}>BAN</button>}
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
