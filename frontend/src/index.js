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
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
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

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />
      <PrivateRoute path='/users/list' component={IndexUser} />
      <PrivateRoute path='/users/edit/:id' component={EditUser} />
      <PrivateRoute path='/users/create' component={CreateUser} />
      <PrivateRoute path='/users/show/:id' component={ShowUser} />
      <PrivateRoute path='/items/list' component={IndexItem} />
      <PrivateRoute path='/items/show/:id' component={ShowItem} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
