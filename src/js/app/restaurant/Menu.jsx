import React, { useState } from 'react';
import { useEffect } from 'react';
import Item from './Item';
import axios from 'axios';

export default function ({ restaurantId }) {
  const [expandItem, setExpandItem] = useState(-1);
  const [menus, setMenus] = useState([]);
  const [tenant, setTenant] = useState({})

  let lastMenuItemIndex = 0;

  const FetchMenus = () => {
    axios.get(`https://localhost:44353/v1/menu`, {
      params: {
        TenantId: restaurantId
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then(res => {
      console.log(res.data.data);
      setMenus(res.data.data);
    });
  }

  const FetchCurrentTenant = () => {
    axios.get(`https://localhost:44353/v1/restaurant/${restaurantId}`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then(res => {
      console.log(res.data);
      setTenant(res.data);
    });
  }

  const FetchMenuItemTypes = () => {
    axios.get(`https://localhost:44353/v1/menu/menuitemtypes`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then(res => {
      console.log(res.data.data);
      //setCategories(res.data.data);
    });
  }

  useEffect(() => {
    FetchMenus();
    FetchCurrentTenant();
  }, [])

  return (
    <div className='menu-component'>
      <div className='main-padding'>
        <img class="w-100 rounded mb-3" src={tenant.imageUrl} alt="restaurant image"></img>
        <div className='menu'>
          {
            menus.map((item, index) => {
              return (
                <div className='category' key={index}>
                  <button
                    className='category-header d-flex align-items-center justify-content-between full-width white mb-2'>
                    {item.name}
                    <i className="fas fa-sort-down" />
                  </button>
                  {
                    item.menuItems.map((menuItem) => {
                      { lastMenuItemIndex++ }
                      return (
                        <div className='outer-div mb-2' key={lastMenuItemIndex}>
                          <Item item={menuItem} index={lastMenuItemIndex} expandItem={expandItem} setExpandItem={setExpandItem} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}