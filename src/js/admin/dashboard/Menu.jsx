import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Link, NavLink} from "react-router-dom";

export default function () {
  const userContext = useContext(UserContext);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/admin" className="brand-link">
        <span className="brand-text font-weight-light">Admin</span>
      </Link>

      <div className="sidebar">
        <div className="border-bottom border-info d-flex mb-3 mt-3 pb-3">
          <a className="d-block">ადმინისტრატორი: {userContext.user.firstName} {userContext.user.lastName}</a>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
              data-accordion="false">

            <li className="nav-item">
              <NavLink exact to="/admin" className="nav-link" activeClassName="active">
                <i className="nav-icon fas fa-home"/>
                <p className='fs-15'>
                  მთავარი
                </p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/admin/restaurant" className="nav-link" activeClassName="active">
                <i className="nav-icon fas fa-briefcase" />
                <p className='fs-15'>
                  რესტორნები
                </p>
              </NavLink>
            </li>
            {
              userContext.user &&  userContext.hasRole(['System Administrator']) ?
              <>

              </>
              : userContext.user && userContext.hasRole(['Administrator']) ?
              <>
                <li className="nav-item">
                  <NavLink exact to="/admin/menu" className="nav-link" activeClassName="active">
                    <i className="nav-icon fas fa-utensils" />
                    <p className='fs-15'>
                      მენიუ
                    </p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/admin/category" className="nav-link" activeClassName="active">
                    <i className="nav-icon fas fa-utensils" />
                    <p className='fs-15'>
                      კატეგორიები
                    </p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/admin/menuitem" className="nav-link" activeClassName="active">
                    <i className="nav-icon fas fa-utensils" />
                    <p className='fs-15'>
                      პროდუქტი
                    </p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/admin/tables" className="nav-link" activeClassName="active">
                    <i className="nav-icon fas fa-table"/>
                    <p className='fs-15'>
                      მაგიდები
                    </p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/admin/orders" className="nav-link" activeClassName="active">
                    <i className="nav-icon fas fa-star"/>
                    <p className='fs-15'>
                      შეკვეთები
                    </p>
                  </NavLink>
                </li>
              </>
              :
              ''
            }

           
          </ul>
        </nav>
      </div>
    </aside>
  )
}
