import React from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <NavLink to="/timeline" className="nav-link">Timeline</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link">Profile</NavLink>
            </li>
          </ul>

          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <span className="nav-link cursor-pointer" onClick={this.props.logOut}>Logout</span>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;