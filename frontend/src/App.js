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
import './App.css';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faMoneyBill, faChair } from '@fortawesome/free-solid-svg-icons'
import AppConstants from './AppConstants';
import Layout from './components/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <div className="container">
            <div className="row main-menu">
              <div className="col-lg-4 col-md-6">
                <Link to={AppConstants.PATH_USER_INDEX} className="main-menu-selector">
                  <FontAwesomeIcon icon={faUsers} size="5x"/>
                  <br />
                  Users
                </Link>
              </div>
              <div className="col-lg-4 col-md-6">
                <Link to={AppConstants.PATH_ITEM_INDEX} className="main-menu-selector">
                  <FontAwesomeIcon icon={faChair} size="5x"/>
                  <br />
                  Items
                </Link>
              </div>
              <div className="col-lg-4 col-md-6">
                <Link to={AppConstants.PATH_RECURRING_PAYMENT_INDEX} className="main-menu-selector">
                  <FontAwesomeIcon icon={faMoneyBill} size="5x"/>
                  <br />
                  Recurring Payments
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default App;
