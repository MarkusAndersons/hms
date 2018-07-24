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

class ShowUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get(AppConstants.API_USERS_USER + '/' + this.props.match.params.id)
        .then(res => {
          this.setState({ user: res.data});
        });
  }

  delete(id){
    axios.delete(AppConstants.API_USERS_USER + '/' + id)
        .then((result) => {
          this.props.history.push(AppConstants.PATH_USER_INDEX)
        });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              User Details
            </h3>
          </div>
          <div className="panel-body">
            <p><Link to={AppConstants.PATH_USER_INDEX}><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> User List </Link></p>
            <dl>
              <dt>Name:</dt>
              <dd>{this.state.user.name}</dd>
              <dt>Phone Number:</dt>
              <dd>{this.state.user.phone}</dd>
              <dt>Email Address:</dt>
              <dd>{this.state.user.email}</dd>
            </dl>
            <Link to={AppConstants.PATH_USER_EDIT + '/' + this.state.user.id} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.user.id)}
                    className="btn btn-danger">Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

}

export default ShowUser;