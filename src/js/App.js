import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Redirect} from 'react-router';
import Header from './app/dashboard/Header';
import Menu from './app/restaurant/Menu';

import Logout from './app/auth/Logout';
// import AdminRoute from './hooks/AdminRoute';
import {CartContextProvider} from './contexts/CartContext';
import { UserContextProvider } from './contexts/UserContext';

function App() {

  return (
    <UserContextProvider>
      <CartContextProvider>
        <Router>
          <div className="App">
            <Header />
              <Switch>
                <Route exact path='/' component={Menu} />
                <Route exact path='/logout' component={Logout} />

                <Redirect to='/'/>
              </Switch>
          </div>
        </Router>  
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
