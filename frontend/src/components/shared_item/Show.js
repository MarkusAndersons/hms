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
import * as FormatTools from '../../services/FormatTools';
import Layout from '../Layout';

class ShowItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
  }

  componentDidMount() {
    const header = ApiTools.getDefaultHeader();
    axios.get(AppConstants.API_ITEMS_ITEM + '/' + this.props.match.params.id, {headers: header})
      .then(res => {
        this.setState({ item: res.data});
      });
  }

  delete = (id) => {
    const header = ApiTools.getDefaultHeader();
    axios.delete(AppConstants.API_ITEMS_ITEM + '/' + id, {headers: header})
      .then((result) => {
        this.props.history.push(AppConstants.PATH_ITEM_INDEX)
      });
  }

  render() {
    return (
      <Layout componentIndex={AppConstants.COMPONENT_ITEMS}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Item Details
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_ITEM_INDEX}><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Item List </Link></p>
              <dl>
                <dt>Name:</dt>
                <dd>{this.state.item.name}</dd>
                <dt>Price:</dt>
                <dd>{FormatTools.formatPrice(this.state.item.price)}</dd>
                <dt>Notes:</dt>
                <dd>{this.state.item.notes}</dd>
                <dt>Ownership:</dt>
                <dd>{FormatTools.formatOwnership(this.state.item.ownership, this.state.item.price, "Percentage Owned")}</dd>
              </dl>
              <Link to={AppConstants.PATH_ITEM_EDIT + '/' + this.state.item.id} className="btn btn-success">Edit</Link>&nbsp;
              <button onClick={this.delete.bind(this, this.state.item.id)}
                      className="btn btn-danger">Delete
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

}

export default ShowItem;
