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

class IndexPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: []
    };
  }

  componentDidMount() {
    const header = ApiTools.getDefaultHeader();
    axios.get(AppConstants.API_PAYMENT_LIST, {headers: header})
      .then(res => {
        this.setState({ payments: res.data });
      });
  }

  render() {
    return (
      <Layout componentIndex={AppConstants.COMPONENT_PAYMENTS}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Item List
              </h3>
            </div>
            <div className="panel-body">
              <p><Link to={AppConstants.PATH_RECURRING_PAYMENT_CREATE}><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Create New Recurring Payment</Link></p>
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Payment Amount</th>
                    <th>Notes</th>
                    <th>Next Due</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.payments.map(p =>
                    <tr key={p.id}>
                      <td><Link to={AppConstants.PATH_RECURRING_PAYMENT_SHOW + '/' + p.id}>{p.name}</Link></td>
                      <td>{FormatTools.formatPrice(p.paymentAmount)}</td>
                      <td>{p.notes}</td>
                      <td>{FormatTools.formatDueDate(p.nextPaymentDate)}</td>
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

export default IndexPayment;
