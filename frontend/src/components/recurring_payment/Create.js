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
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class CreatePayment extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      notes: '',
      paymentAmount: 0.0,
      paymentDate: moment(),
      paymentCycleType: "Monthly",
      users: [],
      owners: {},
      daysFieldRequired: false,
      paymentDays: 0,
      validField: {
        name: true,
        notes: true,
        paymentAmount: true,
        ownership: true
      },
      focused: false
    };
  }

  componentDidMount() {
    const header = ApiTools.getDefaultHeader();
    axios.get(AppConstants.API_USERS_LIST, {headers: header})
      .then(res => {
        this.setState({ users: res.data });
      });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    state['daysFieldRequired'] = state.paymentCycleType !== "Monthly" && state.paymentCycleType !== "Yearly";
    this.setState(state);
    FormatTools.validateRecurringPaymentData(this.state.name, this.state.paymentAmount, this.state.owners, this);
  }

  onDateChange = (date) => {
    const state = this.state;
    state.paymentDate = date;
    this.setState(state);
  }

  onOwnershipChange = (e) => {
    const state = this.state
    state["owners"][e.target.name.substr(0, e.target.name.length - 11)] = Number(e.target.value);
    this.setState(state);
    FormatTools.validateRecurringPaymentData(this.state.name, this.state.paymentAmount, this.state.owners, this);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, paymentAmount, notes, owners, paymentCycleType, paymentDate } = this.state;
    const users = owners;
    // Validate data
    const valid = FormatTools.validateRecurringPaymentData(this.state.name, this.state.paymentAmount, this.state.owners, this);
    if (!valid) {
      return;
    }

    // Convert payment cycle to correct enum
    const paymentCycle = FormatTools.convertPaymentCycleTypeToRaw(paymentCycleType);

    const header = ApiTools.getDefaultHeader();
    const nextPaymentDate = paymentDate.format("YYYY-MM-DD")
    axios.post(AppConstants.API_PAYMENT_CREATE, { name, paymentAmount, notes, paymentCycle, nextPaymentDate, users }, {headers: header})
      .then((result) => {
        this.props.history.push(AppConstants.PATH_RECURRING_PAYMENT_INDEX)
      });
  }

  render() {
    const { name, notes, paymentAmount, paymentCycleType, paymentDays, daysFieldRequired, owners } = this.state;
    return (
      <Layout componentIndex={AppConstants.COMPONENT_PAYMENTS}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Create Recurring Payment
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_RECURRING_PAYMENT_INDEX}><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Recurring Payments List</Link></p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Payment Name:</label>
                  <input type="text" className={"form-control" + (this.state.validField.name ? "" : " is-invalid")} name="name" value={name} onChange={this.onChange} placeholder="Payment Name" />
                  <div className="invalid-feedback">
                    Please enter a name for the payment.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="paymentAmount">Payment Amount:</label>
                  <input type="number" step="any" className={"form-control" + (this.state.validField.paymentAmount ? "" : " is-invalid")} name="paymentAmount" value={paymentAmount} onChange={this.onChange} placeholder="Payment Amount" />
                  <div className="invalid-feedback">
                    Please enter a payment amount.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="paymentCycleType">Notes:</label>
                  <select className="form-control" name="paymentCycleType" value={paymentCycleType} onChange={this.onChange}>
                    <option>Monthly</option>
                    <option>Every X days</option>
                    <option>Yearly</option>
                  </select>
                </div>
                <div className="form-group">
                  {daysFieldRequired ? ([
                    <label htmlFor="paymentDays">Days Between Payments:</label>,
                    <input type="number" step="1" className={"form-control" + (this.state.validField.paymentAmount ? "" : " is-invalid")} name="paymentDays" value={paymentDays} onChange={this.onChange} placeholder="Payment Days" />,
                    <div className="invalid-feedback">
                      Please enter a valid number of days between payments.
                    </div>
                  ]) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="paymentDate">Next Payment Date:</label>
                  <SingleDatePicker
                    date={this.state.paymentDate}
                    onDateChange={date => this.onDateChange(date)}
                    focused={this.state.focused}
                    onFocusChange={({ focused }) => this.setState({ focused })}
                    id="paymentDate"
                    displayFormat="DD/MM/YYYY"
                  />
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

export default CreatePayment;
