import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";

export default function () {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/admin" className="brand-link">
        <img src="/admin_assets/images/admin.png" alt="Admin Logo" className="brand-image img-circle elevation-3"
        width="33" height="33"/>
        <span className="brand-text font-weight-light">Admin</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex justify-content-center">
          <div className="info">
            <a className="d-block">ადმინისტრატორი</a>
          </div>
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


          </ul>
        </nav>
      </div>
    </aside>
  )
}
