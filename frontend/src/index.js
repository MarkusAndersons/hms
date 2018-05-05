import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
// import EditUser from './components/user/Edit';
// import CreateUser from './components/user/Create';
import ShowUser from './components/user/Show';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App} />
      {/*<Route path='/user/edit/:id' component={EditUser} />*/}
      {/*<Route path='/user/create' component={CreateUser} />*/}
      <Route path='/user/show/:id' component={ShowUser} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
