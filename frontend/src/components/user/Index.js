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
import * as ApiTools from '../../services/ApiTools';
import Layout from '../Layout';

class IndexUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null
    };
  }

  componentDidMount() {
    const state = this.state;
    const header = ApiTools.getDefaultHeader();
    axios.get(AppConstants.API_USERS_LIST, {headers: header})
      .then(res => {
        state.error = null;
        this.setState(state);
        this.setState({ users: res.data });
      })
      .catch((error) => {
        state.error = "An error occured getting users (" + String(error) + ")";
        this.setState(state);
      });
  }

  render() {
    return (
      <Layout componentIndex={AppConstants.COMPONENT_USERS} error={this.state.error}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                User List
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_USER_CREATE}><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Create New User</Link></p>
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map(u =>
                    <tr key={u.id}>
                      <td><Link to={AppConstants.PATH_USER_SHOW + '/' + u.id}>{u.name}</Link></td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default IndexUser;
