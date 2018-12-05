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
import {Link} from "react-router-dom";
import AppConstants from '../../AppConstants';
import * as ApiTools from '../../services/ApiTools'
import Layout from '../Layout';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      newPassword: '',
      error: ''
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.setState({
      username: this.state.username,
      password: '',
      newPassword: ''
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  resetPassword() {
    this.setState({
      username: this.state.username,
      password: '',
      newPassword: ''
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password, newPassword } = this.state;
    const state = this.state;
    const header = ApiTools.getDefaultHeader();
    axios.post(AppConstants.API_CHANGE_PASSWORD, { username, password, newPassword }, {headers: header})
      .then((result) => {
        console.log(result);
        state.error = null;
        this.setState(state);
        this.props.history.push(AppConstants.PATH_SETTINGS);
      })
      .catch((error) => {
        let err = "An error occured resetting password (" + String(error) + ")";
        if (error.response) {
          err = err + ". " + error.response.data.message;
        }
        state.error = err
        this.setState(state);
      });
  }

  render() {
    const { username, password, newPassword } = this.state;
    return (
      <Layout componentIndex={null} error={this.state.error}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Change Password
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_SETTINGS}><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Back to Settings</Link></p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input type="text" className="form-control" name="username" value={username} onChange={this.onChange} placeholder="Username" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Current Password:</label>
                  <input type="password" className="form-control" name="password" value={password} onChange={this.onChange} placeholder="Current Password" />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password:</label>
                  <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={this.onChange} placeholder="New Password" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ChangePassword;
