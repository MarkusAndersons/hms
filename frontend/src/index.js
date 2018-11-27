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

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import AppConstants from './AppConstants';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'bootstrap/js/dist/collapse';
import App from './App';
import IndexUser from './components/user/Index';
import EditUser from './components/user/Edit';
import CreateUser from './components/user/Create';
import ShowUser from './components/user/Show';
import ShowItem from './components/shared_item/Show';
import IndexItem from './components/shared_item/Index';
import Login from './components/Login';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';
import CreateItem from './components/shared_item/Create';
import EditItem from './components/shared_item/Edit';
import IndexPayment from './components/recurring_payment/Index';
import EditPayment from './components/recurring_payment/Edit';
import CreatePayment from './components/recurring_payment/Create';
import ShowPayment from './components/recurring_payment/Show';
import Settings from './components/settings/Settings';
import ChangePassword from './components/settings/ChangePassword';


ReactDOM.render(
  <BrowserRouter>
    <div>
      <PrivateRoute exact path='/' component={App} />
      <Route path={AppConstants.PATH_LOGIN} component={Login} />
      <Route path={AppConstants.PATH_LOGOUT} component={Logout} />
      <PrivateRoute path={AppConstants.PATH_SETTINGS} component={Settings} />
      <PrivateRoute path={AppConstants.PATH_SETTINGS_CHANGE_PASSWORD} component={ChangePassword} />
      <PrivateRoute path='/users/list' component={IndexUser} />
      <PrivateRoute path='/users/edit/:id' component={EditUser} />
      <PrivateRoute path='/users/create' component={CreateUser} />
      <PrivateRoute path='/users/show/:id' component={ShowUser} />
      <PrivateRoute path='/items/list' component={IndexItem} />
      <PrivateRoute path='/items/create' component={CreateItem} />
      <PrivateRoute path='/items/show/:id' component={ShowItem} />
      <PrivateRoute path='/items/edit/:id' component={EditItem} />
      <PrivateRoute path='/recurring_payments/list' component={IndexPayment} />
      <PrivateRoute path='/recurring_payments/create' component={CreatePayment} />
      <PrivateRoute path='/recurring_payments/show/:id' component={ShowPayment} />
      <PrivateRoute path='/recurring_payments/edit/:id' component={EditPayment} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
