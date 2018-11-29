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
import Layout from '../Layout';

class EditSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      timezones: [],
      validField: {
        hostname: true
      },
      error: null
    };
  }

  componentDidMount() {
    const header = ApiTools.getDefaultHeader();
    axios.get(AppConstants.API_SERVER_SETTINGS, {headers: header})
      .then(res => {
        const state = this.state;
        let data = res.data;
        state.error = null;
        state.settings = data;
        this.setState(state);
      })
      .catch((error) => {
        const state = this.state;
        state.error = "An error occured getting settings (" + String(error) + ")";
        this.setState(state);
      });
    axios.get(AppConstants.API_SETTINGS_LIST_TIMEZONES, {headers: header})
      .then(res => {
        const state = this.state;
        state.error = null;
        state.timezones = res.data
        this.setState(state);
      })
      .catch((error) => {
        const state = this.state;
        state.error = "An error occured getting timezones (" + String(error) + ")";
        this.setState(state);
      });
  }

  onChange = (e) => {
    const state = this.state.settings;
    state[e.target.name] = e.target.value;
    this.setState({ settings: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { hostname, serverTimezone } = this.state.settings;
    const state = this.state;
    const header = ApiTools.getDefaultHeader();
    axios.put(AppConstants.API_SERVER_SETTINGS, { hostname, serverTimezone }, {headers: header})
      .then((result) => {
        state.error = null;
        this.setState(state);
        this.props.history.push(AppConstants.PATH_SETTINGS_SERVER_SHOW)
      })
      .catch((error) => {
        state.error = "An error occured editing server settings (" + String(error) + ")";
        this.setState(state);
      });
  }

  render() {
    console.log(this.state);
    return (
      <Layout componentIndex={AppConstants.COMPONENT_ITEMS} error={this.state.error}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Edit Item
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_SETTINGS_SERVER_SHOW}><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Show Settings</Link></p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="hostname">Hostname:</label>
                  <input type="text" className={"form-control" + (this.state.validField.hostname ? "" : " is-invalid")} name="name" value={this.state.settings.hostname} onChange={this.onChange} placeholder="http://localhost:8080" />
                  <div className="invalid-feedback">
                    Please enter a valid hostname.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="serverTimezone">Server Timezone:</label>
                  <select value={this.state.settings.serverTimezone} onChange={this.onChange}>
                    {this.state.timezones.map(t =>
                      <option value={t} key={t}>{t}</option>
                    )}
                  </select>
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

export default EditSettings;
