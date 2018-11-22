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

class ShowPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: {},
      error: null
    };
  }

  componentDidMount() {
    const header = ApiTools.getDefaultHeader();
    const state = this.state;
    axios.get(AppConstants.API_PAYMENT_PAYMENT + '/' + this.props.match.params.id, {headers: header})
      .then(res => {
        state.error = null;
        this.setState(state);
        this.setState({ payment: res.data});
      })
      .catch((error) => {
        state.error = "An error occured getting payment (" + String(error) + ")";
        this.setState(state);
      });
  }

  delete = (id) => {
    const header = ApiTools.getDefaultHeader();
    const state = this.state;
    axios.delete(AppConstants.API_PAYMENT_PAYMENT + '/' + id, {headers: header})
      .then((result) => {
        state.error = null;
        this.setState(state);
        this.props.history.push(AppConstants.PATH_RECURRING_PAYMENT_INDEX)
      })
      .catch((error) => {
        state.error = "An error occured deleting payment (" + String(error) + ")";
        this.setState(state);
      });
  }

  formatPaymentFrequency = (paymentCycle, paymentDays) => {
    if (paymentCycle != null) {
      if (paymentCycle === "FIXED_DAYS") {
        return "Every " + String(paymentDays) + " days"
      } else {
        return paymentCycle.toLowerCase().replace(/^\w/, c => c.toUpperCase());
      }
    }
    return null;
  }

  render() {
    return (
      <Layout componentIndex={AppConstants.COMPONENT_PAYMENTS} error={this.state.error}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Payment Details
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_RECURRING_PAYMENT_INDEX}><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Payments List </Link></p>
              <dl>
                <dt>Name:</dt>
                <dd>{this.state.payment.name}</dd>
                <dt>Payment Amount:</dt>
                <dd>{FormatTools.formatPrice(this.state.payment.paymentAmount)}</dd>
                <dt>Payment Next Due:</dt>
                <dd>{FormatTools.formatDueDate(this.state.payment.nextPaymentDate)}</dd>
                <dt>Notes:</dt>
                <dd>{this.state.payment.notes}</dd>
                <dt>Payment Frequency</dt>
                <dd>{this.formatPaymentFrequency(this.state.payment.paymentCycle, this.state.payment.paymentDays)}</dd>
                <dt>Ownership:</dt>
                <dd>{FormatTools.formatOwnership(this.state.payment.ownership, this.state.payment.paymentAmount, "Person Responsible")}</dd>
              </dl>
              <Link to={AppConstants.PATH_RECURRING_PAYMENT_EDIT + '/' + this.state.payment.id} className="btn btn-success">Edit</Link>&nbsp;
              <button onClick={this.delete.bind(this, this.state.payment.id)}
                      className="btn btn-danger">Delete
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ShowPayment;
