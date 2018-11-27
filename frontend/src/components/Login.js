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
import AppConstants from '../AppConstants';
import AuthService from '../services/AuthService';
import Layout from './Layout';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  componentWillMount() {
    if (AuthService.isAuthenticated()) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.setState({
      username: this.state.username,
      password: ''
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
      password: ''
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    axios.post(AppConstants.API_LOGIN, { username, password })
      .then((result) => {
        const token = result.data.token;
        if (token) {
          AuthService.storeToken(username, token);
        } else {
          // TODO
        }
        this.resetPassword();
        this.setState({error: ''});
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          this.setState({error: "Incorrect Credentials!" });
        }
        this.resetPassword();
        this.props.history.push(AppConstants.PATH_LOGIN);
      });
  }

  render() {
    const { username, password } = this.state;
    return (
      <Layout componentIndex={null} error={this.state.error}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Login
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input type="text" className="form-control" name="username" value={username} onChange={this.onChange} placeholder="Username" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" />
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

export default Login;
