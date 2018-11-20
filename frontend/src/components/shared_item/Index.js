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

class IndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const header = ApiTools.getDefaultHeader();
    axios.get(AppConstants.API_ITEMS_LIST, {headers: header})
      .then(res => {
        this.setState({ items: res.data });
      });
  }

  listOwners(ownership) {
    let data = [];
    Object.keys(ownership).forEach((key) => {
      data.push([key, ownership[key]])
    });
    let names = "";
    let idx = 0;
    for (let owner of data) {
      names += owner[1].ownerName + "(" + owner[1].percentage.toFixed(0) + "%)";
      if (idx < data.length - 1) {
        names += ", ";
      }
      idx++;
    }
    return (
      names
    );
  }

  render() {
    return (
      <Layout componentIndex={AppConstants.COMPONENT_ITEMS}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Item List
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_ITEM_CREATE}><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Create New Item</Link></p>
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Notes</th>
                    <th>Owners</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map(i =>
                    <tr key={i.id}>
                      <td><Link to={AppConstants.PATH_ITEM_SHOW + '/' + i.id}>{i.name}</Link></td>
                      <td>{FormatTools.formatPrice(i.price)}</td>
                      <td>{i.notes}</td>
                      <td>{this.listOwners(i.ownership)}</td>
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

export default IndexItem;
