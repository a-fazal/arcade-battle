import React, { Component } from "react";

class Admin extends Component {
  render() {

    const data = {
      pending: [
        {
          username: "gibdalf"
        },
        {
          username: "lebronJames"
        },
        {
          username: "michaelJackson"
        },
        {
          username: "charlieSheen"
        }
      ],
      active: [
        {
          username: "Alec"
        },
        {
          username: "Anusha"
        },
        {
          username: "Sophia"
        },
        {
          username: "Alec"
        },
        {
          username: "Anusha"
        },
        {
          username: "Sophia"
        },
        {
          username: "Alec"
        },
        {
          username: "Anusha"
        },
        {
          username: "Sophia"
        }
      ]
    }

    return (
      <div id="admin-dashboard">
        <div id="pending-registrations">
          <div className="text-center game-title">
            PENDING USER REGISTRATIONS
        </div>
          {data.pending.map(user =>
            <div className="pending-user">
              <span className="user-name">
                {user.username}
              </span>
              <button className="deny-user">DENY</button>
              <button className="accept-user">ACCEPT</button>
            </div>)}
        </div>
        <div id="user-management">
          <div className="text-center game-title">
            ACTIVE USERS
          </div>
          {data.active.map(user =>
            <div className="active-user">
              <div className="user-description">
                <div className="text-center">{user.username}</div>
              </div>
              <div className="user-avatar"></div>
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default Admin;
