/*
 * Copyright 2018 Markus Andersons
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import AppConstants from '../AppConstants';
import AuthService from '../services/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

class Layout extends Component {
  navLinkClass(componentIndex) {
    if (componentIndex === this.props.componentIndex) return "nav-item active"
    return "nav-item";
  }

  displayError() {
    if (this.props.error) {
      return (
        <div class="alert alert-danger">
          {this.props.error}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Housemate Management System</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className={this.navLinkClass(AppConstants.COMPONENT_USERS)}>
                  <Link className="nav-link" to={AppConstants.PATH_USER_INDEX}>Users</Link>
                </li>
                <li className={this.navLinkClass(AppConstants.COMPONENT_ITEMS)}>
                  <Link className="nav-link" to={AppConstants.PATH_ITEM_INDEX}>Shared Items</Link>
                </li>
                <li className={this.navLinkClass(AppConstants.COMPONENT_PAYMENTS)}>
                  <Link className="nav-link" to={AppConstants.PATH_RECURRING_PAYMENT_INDEX}>Recurring Payments</Link>
                </li>
              </ul>
              <span className="navbar-text">
                <Link to={AppConstants.PATH_SETTINGS}>{AuthService.getUsername()} <FontAwesomeIcon icon={faCog} /></Link>
              </span>
            </div>
          </nav>
        </header>
        {this.displayError()}
        {this.props.children}
        <footer className="footer">
          <div className="container">
            &copy; {new Date().getFullYear()} <a href="https://markusandersons.com" target="_blank" rel="noopener noreferrer">Markus Andersons</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Layout;
