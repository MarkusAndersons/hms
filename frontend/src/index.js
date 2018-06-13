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

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/users/list' component={IndexUser} />
      <Route path='/users/edit/:id' component={EditUser} />
      <Route path='/users/create' component={CreateUser} />
      <Route path='/users/show/:id' component={ShowUser} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
//registerServiceWorker();
//unregister();
