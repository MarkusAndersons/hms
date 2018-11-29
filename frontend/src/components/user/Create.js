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
import axios from 'axios';
import { Link } from 'react-router-dom';
import AppConstants from '../../AppConstants';
import * as ApiTools from '../../services/ApiTools';
import * as FormatTools from '../../services/FormatTools';
import Layout from '../Layout';

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      surname: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      permissions: {
        isServerAdmin: false,
        canModifyUsers: false,
        canDeleteData: false
      },
      validField: {
        firstName: true,
        surname: true,
        phone: true,
        email: true,
        username: true,
        password: true
      },
      error: null
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    FormatTools.validateUserData(this.state.firstName, this.state.surname, this.state.phone, this.state.email, this.state.username, this.state.password, this);
  }

  onPermissionChange = (e) => {
    const state = this.state
    state.permissions[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { firstName, surname, phone, email, username, password } = this.state;
    const { isServerAdmin, canModifyUsers, canDeleteData } = this.state.permissions;
    // Validate data
    const valid = FormatTools.validateUserData(firstName, surname, phone, email, username, password, this);
    if (!valid) {
      return;
    }

    const header = ApiTools.getDefaultHeader();
    const state = this.state;
    axios.post(AppConstants.API_USERS_CREATE, { firstName, surname, phone, email, username, password, isServerAdmin, canModifyUsers, canDeleteData }, {headers: header})
      .then((result) => {
        state.error = null;
        this.setState(state);
        this.props.history.push(AppConstants.PATH_USER_INDEX);
      }).catch((error) => {
        state.error = "An error occured creating user (" + String(error) + ")";
        this.setState(state);
      });
  }

  render() {
    const { firstName, surname, phone, email, username, password } = this.state;
    const { isServerAdmin, canModifyUsers, canDeleteData } = this.state.permissions;
    return (
      <Layout componentIndex={AppConstants.COMPONENT_USERS} error={this.state.error}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Create User
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_USER_INDEX}><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> User List</Link></p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="username">Username:</label>
                  <input type="text" className={"form-control" + (this.state.validField.username ? "" : " is-invalid")} name="username" value={username} onChange={this.onChange} placeholder="Username" />
                  <div className="invalid-feedback">
                    Please enter a username.
                  </div>
                </div>
                <div className="form-group">
                  <label for="password">Password:</label>
                  <input type="password" className={"form-control" + (this.state.validField.password ? "" : " is-invalid")} name="password" value={password} onChange={this.onChange} placeholder="Password" />
                  <div className="invalid-feedback">
                    Please enter a password.
                  </div>
                </div>
                <div className="form-group">
                  <label for="firstName">First Name:</label>
                  <input type="text" className={"form-control" + (this.state.validField.firstName ? "" : " is-invalid")} name="firstName" value={firstName} onChange={this.onChange} placeholder="First Name" />
                  <div className="invalid-feedback">
                    Please enter a first name.
                  </div>
                </div>
                <div className="form-group">
                  <label for="surname">Surname:</label>
                  <input type="text" className={"form-control" + (this.state.validField.surname ? "" : " is-invalid")} name="surname" value={surname} onChange={this.onChange} placeholder="Surname" />
                  <div className="invalid-feedback">
                    Please enter a surname.
                  </div>
                </div>
                <div className="form-group">
                  <label for="phone">Phone:</label>
                  <input type="text" className={"form-control" + (this.state.validField.phone ? "" : " is-invalid")} name="phone" value={phone} onChange={this.onChange} placeholder="Phone Number" />
                  <div className="invalid-feedback">
                    Please enter a phone number.
                  </div>
                </div>
                <div className="form-group">
                  <label for="email">Email:</label>
                  <input type="email" className={"form-control" + (this.state.validField.email ? "" : " is-invalid")} name="email" value={email} onChange={this.onChange} placeholder="Email Address" />
                  <div className="invalid-feedback">
                    Please enter an email address.
                  </div>
                </div>
                <div className="form-check form-check-inline">
                  <label for="isServerAdmin">Server Admin:</label>
                  <input type="checkbox" className="form-control" name="isServerAdmin" checked={isServerAdmin} onChange={this.onPermissionChange} />
                </div>
                <div className="form-check form-check-inline">
                  <label for="canModifyUsers">Can Modify Users:</label>
                  <input type="checkbox" className="form-control" name="canModifyUsers" checked={canModifyUsers} onChange={this.onPermissionChange} />
                </div>
                <div className="form-check form-check-inline">
                  <label for="canDeleteData">Can Delete Data:</label>
                  <input type="checkbox" className="form-control" name="canDeleteData" checked={canDeleteData} onChange={this.onPermissionChange} />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-default">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default CreateUser;
