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
import * as FormatTools from '../../services/FormatTools';
import Layout from '../Layout';

class CreateItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      notes: '',
      price: '',
      owners: {},
      users: [],
      validField: {
        name: true,
        notes: true,
        price: true,
        ownership: true
      },
      error: null
    };
  }

  componentDidMount() {
    const header = ApiTools.getDefaultHeader();
    let state = this.state;
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

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    FormatTools.validateItemData(this.state.name, this.state.price, this.state.owners, this);
  }

  onOwnershipChange = (e) => {
    const state = this.state
    state["owners"][e.target.name.substr(0, e.target.name.length - 11)] = Number(e.target.value);
    this.setState(state);
    FormatTools.validateItemData(this.state.name, this.state.price, this.state.owners, this);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, price, notes, owners } = this.state;
    // Validate data
    const valid = FormatTools.validateItemData(this.state.name, this.state.price, this.state.owners, this);
    if (!valid) {
      return;
    }

    const header = ApiTools.getDefaultHeader();
    const state = this.state;
    axios.post(AppConstants.API_ITEMS_CREATE, { name, price, notes, owners }, {headers: header})
      .then((result) => {
        state.error = null;
        this.setState(state);
        this.props.history.push(AppConstants.PATH_ITEM_INDEX)
      })
      .catch((error) => {
        state.error = "An error occured creating item (" + String(error) + ")";
        this.setState(state);
      });
  }

  render() {
    const { name, notes, price, owners } = this.state;
    return (
      <Layout componentIndex={AppConstants.COMPONENT_ITEMS} error={this.state.error}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Create Shared Item
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_ITEM_INDEX}><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Item List</Link></p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Item Name:</label>
                  <input type="text" className={"form-control" + (this.state.validField.name ? "" : " is-invalid")} name="name" value={name} onChange={this.onChange} placeholder="Item Name" />
                  <div className="invalid-feedback">
                    Please enter an item name.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input type="number" step="any" className={"form-control" + (this.state.validField.price ? "" : " is-invalid")} name="price" value={price} onChange={this.onChange} placeholder="Price" />
                  <div className="invalid-feedback">
                    Please enter a price for the item.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Notes:</label>
                  <textarea type="text" className="form-control" name="notes" value={notes} onChange={this.onChange} placeholder="Notes" />
                </div>
                <div>
                  <label>Ownership Percentages:</label>
                  {this.state.users.map(u =>
                    <div key={u.id} className="form-group row">
                      <label htmlFor={u.id + "_percentage"} className="col-sm-2 col-form-label">{u.name}</label>
                      <div className="col-sm-10">
                        <input type="number" step="any" className={"form-control" + (this.state.validField.ownership ? "" : " is-invalid")} name={u.id + "_percentage"} value={owners[u.id]} onChange={this.onOwnershipChange} placeholder="%" />
                        <div className="row invalid-feedback">
                          All percentages must add to 100%.
                        </div>
                      </div>
                    </div>
                  )}
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

export default CreateItem;
