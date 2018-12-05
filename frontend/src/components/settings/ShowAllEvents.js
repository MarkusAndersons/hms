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

class ShowAllEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      error: null
    };
  }

  componentDidMount() {
    const state = this.state;
    const header = ApiTools.getDefaultHeader();
    axios.get(AppConstants.API_LIST_EVENTS, {headers: header})
      .then(res => {
        state.error = null;
        this.setState(state);
        this.setState({ events: res.data });
      })
      .catch((error) => {
        state.error = "An error occured getting events (" + String(error) + ")";
        this.setState(state);
      });
  }

  render() {
    return (
      <Layout componentIndex={null} error={this.state.error}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Event List
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_SETTINGS}><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Back to Settings</Link></p>
              <p>(Note: some interactions may not be visible if they occur while the server setting for "Archiving All Events" is not true)</p>
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Event Time (UTC)</th>
                    <th>User</th>
                    <th>Request Path</th>
                    <th>Request HTTP Method</th>
                    <th>Stored Data</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.events.map(e =>
                    <tr key={e.id}>
                      <td>{e.eventTime}</td>
                      <td>{e.username}</td>
                      <td>{e.requestPath}</td>
                      <td>{e.requestHttpMethod}</td>
                      <td>{e.storedData}</td>
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

export default ShowAllEvents;
