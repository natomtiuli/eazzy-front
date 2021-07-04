import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Redirect} from 'react-router';
import Header from './app/dashboard/Header';
import Menu from './app/restaurant/Menu';
import Restaurant from './app/restaurant/Restaurant'

import Logout from './app/auth/Logout';
import AdminRoute from './hooks/AdminRoute';
import {CartContextProvider} from './contexts/CartContext';
import { UserContextProvider } from './contexts/UserContext';

import AdminHome from './admin/dashboard/Home';
import AdminRestaurant from './admin/restaurants/Restaurant';
import AdminTables from './admin/tables/Tables';
import AdminMenu from './admin/menu/Menu';
import AdminCategory from './admin/menu/Category';
import AdminMenuItem from './admin/menu/MenuItem';
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

                <AdminRoute exact path='/admin' component={AdminHome} />
                <AdminRoute exact path='/admin/restaurant' component={AdminRestaurant} />
                <AdminRoute exact path='/admin/tables' component={AdminTables} />
                <AdminRoute exact path='/admin/menu' component={AdminMenu} />
                <AdminRoute exact path='/admin/category' component={AdminCategory} /> 
                <AdminRoute exact path='/admin/menuitem' component={AdminMenuItem} /> 
                <Redirect to='/'/>
              </Switch>
          </div>
        </Router>  
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
