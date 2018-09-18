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
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const header = ApiTools.getDefaultHeader();
    axios.get(AppConstants.API_USERS_USER + '/' + this.props.match.params.id, {headers: header})
      .then(res => {
        this.setState({ user: res.data});
      });
  }

  onChange = (e) => {
    const state = this.state.user
    state[e.target.name] = e.target.value;
    this.setState({ user: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { firstName, surname, phone, email } = this.state.user;

    const header = ApiTools.getDefaultHeader();
    axios.put(AppConstants.API_USERS_USER + '/' + this.props.match.params.id, { firstName, surname, phone, email }, {headers: header})
      .then((result) => {
        this.props.history.push(AppConstants.PATH_USER_SHOW + '/' + this.props.match.params.id)
      });
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Edit User
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_USER_SHOW + '/' + this.state.user.id}><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> User Details</Link></p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="firstName">First Name:</label>
                  <input type="text" className="form-control" name="firstName" value={this.state.user.firstName} onChange={this.onChange} placeholder="First Name" />
                </div>
                <div className="form-group">
                  <label for="surname">Surname:</label>
                  <input type="text" className="form-control" name="surname" value={this.state.user.surname} onChange={this.onChange} placeholder="Surname" />
                </div>
                <div className="form-group">
                  <label for="phone">Phone Number:</label>
                  <input type="text" className="form-control" name="phone" value={this.state.user.phone} onChange={this.onChange} placeholder="Phone Number" />
                </div>
                <div className="form-group">
                  <label for="email">Email:</label>
                  <input type="email" className="form-control" name="email" value={this.state.user.email} onChange={this.onChange} placeholder="Email Address" />
                </div>
                <button type="submit" className="btn btn-default">Update</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default EditUser;
