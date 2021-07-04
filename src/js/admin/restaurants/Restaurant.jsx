import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from "../../contexts/UserContext";
import AddRestaurant from './AddRestaurant';
import RestaurantList from './RestaurantList';

export default function() {
  const [openComponent, setOpenComponent] = useState('list');
  const userContext = useContext(UserContext);
  return (
    <div className='add-contact container py-4'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item rounded ${openComponent==='list' ? 'btn-primary active' : ''}`} onClick={()=>setOpenComponent('list')}>
              <a className="nav-link ml-3" href="#">რესტორნები</a>
            </li>
            {
              userContext.hasRole(['System Administrator']) &&
              <li className={`nav-item rounded ${openComponent==='add' ? 'btn-primary active' : ''}`} onClick={()=>setOpenComponent('add')}>
                <a className="nav-link ml-3" href="#">დამატება</a>
              </li>
            }
          </ul>
        </div>
      </nav>
      {openComponent === 'add' && <AddRestaurant />}
      
      {openComponent === 'list' && <RestaurantList />}
    </div>
  )
}