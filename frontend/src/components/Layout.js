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

class Layout extends Component {
  navLinkClass(componentIndex) {
    if (componentIndex === this.props.componentIndex) return "nav-item active"
    return "nav-item";
  }

  render() {
    return (
      // <div className="App">
      <div>
        <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Housemate Management System</Link>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
            </div>
          </nav>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
