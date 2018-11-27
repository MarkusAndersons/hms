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
import AppConstants from '../../AppConstants';
import Layout from '../Layout';

class Settings extends Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Settings
              </h3>
            </div>
            <div className="panel-body">
              <ul>
                <li><Link to={AppConstants.PATH_SETTINGS_CHANGE_PASSWORD}>Change Password</Link></li>
                <li><Link to={AppConstants.PATH_LOGOUT}>Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Settings;
