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

class ShowServerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      error: null
    };
  }

  componentDidMount() {
    const header = ApiTools.getDefaultHeader();
    const state = this.state;
    axios.get(AppConstants.API_SERVER_SETTINGS, {headers: header})
      .then(res => {
        state.error = null;
        this.setState(state);
        this.setState({ settings: res.data});
      })
      .catch((error) => {
        state.error = "An error occured getting settings (" + String(error) + ")";
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
                Server Settings
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_SETTINGS}><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Back to Settings</Link></p>
              <dl>
                <dt>Hostname:</dt>
                <dd>{this.state.settings.hostname}</dd>
                <dt>Server Timezone:</dt>
                <dd>{this.state.settings.serverTimezone}</dd>
              </dl>
              <Link to={AppConstants.PATH_SETTINGS_SERVER_EDIT} className="btn btn-success">Edit</Link>&nbsp;
            </div>
          </div>
        </div>
      </Layout>
    );
  }

}

export default ShowServerSettings;
