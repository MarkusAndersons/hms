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

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
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
    const state = this.state;
    axios.get(AppConstants.API_ITEMS_ITEM + '/' + this.props.match.params.id, {headers: header})
      .then(res => {
        let data = res.data;
        data.ownership = null;
        state.error = null;
        this.setState(state);
        this.setState({ item: data});
      })
      .catch((error) => {
        state.error = "An error occured getting item (" + String(error) + ")";
        this.setState(state);
      });
    axios.get(AppConstants.API_USERS_LIST, {headers: header})
      .then(res => {
        state.error = null;
        this.setState(state);
        this.setState({ users: res.data });
      })
      .catch((error) => {
        state.error = "An error occured getting item (" + String(error) + ")";
        this.setState(state);
      });
  }

  onChange = (e) => {
    const state = this.state.item;
    state[e.target.name] = e.target.value;
    this.setState({ item: state });
    FormatTools.validateItemData(this.state.item.name, this.state.item.price, this.state.item.owners, this);
  }

  onOwnershipChange = (e) => {
    const state = this.state;
    state.item["owners"][e.target.name.substr(0, e.target.name.length - 11)] = Number(e.target.value);
    this.setState(state);
    FormatTools.validateItemData(this.state.item.name, this.state.item.price, this.state.item.owners, this);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const valid = FormatTools.validateItemData(this.state.item.name, this.state.item.price, this.state.item.owners, this);
    if (!valid) {
      return;
    }
    const { name, notes, price, owners } = this.state.item;
    const state = this.state;
    const header = ApiTools.getDefaultHeader();
    axios.put(AppConstants.API_ITEMS_ITEM + '/' + this.props.match.params.id, { name, notes, price, owners }, {headers: header})
      .then((result) => {
        state.error = null;
        this.setState(state);
        this.props.history.push(AppConstants.PATH_ITEM_SHOW + '/' + this.props.match.params.id)
      })
      .catch((error) => {
        state.error = "An error occured editing item (" + String(error) + ")";
        this.setState(state);
      });
  }

  render() {
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
              <p><Link to={AppConstants.PATH_ITEM_SHOW + '/' + this.state.item.id}><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Item Details</Link></p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Item Name:</label>
                  <input type="text" className={"form-control" + (this.state.validField.name ? "" : " is-invalid")} name="name" value={this.state.item.name} onChange={this.onChange} placeholder="Item Name" />
                  <div className="invalid-feedback">
                    Please enter an item name.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input type="number" step="any" className={"form-control" + (this.state.validField.price ? "" : " is-invalid")} name="price" value={this.state.item.price} onChange={this.onChange} placeholder="Price" />
                  <div className="invalid-feedback">
                    Please enter a price for the item.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Notes:</label>
                  <textarea type="text" className="form-control" name="notes" value={this.state.item.notes} onChange={this.onChange} placeholder="Notes" />
                </div>
                <div>
                  <label>Ownership Percentages:</label>
                  {this.state.users.map(u =>
                    <div key={u.id} className="form-group row">
                      <label htmlFor={u.id + "_percentage"} className="col-sm-2 col-form-label">{u.name}</label>
                      <div className="col-sm-10">
                        <input type="number" step="any" className={"form-control" + (this.state.validField.ownership ? "" : " is-invalid")} name={u.id + "_percentage"} value={this.state.item.owners[u.id]} onChange={this.onOwnershipChange} placeholder="%" />
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

export default EditItem;
