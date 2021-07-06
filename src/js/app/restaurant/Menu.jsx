import React, { useState } from 'react';
import { useEffect } from 'react';
import Item from './Item';
import axios from 'axios';
import { useParams } from 'react-router';

export default function () {
  const [expandItem, setExpandItem] = useState(-1);
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [menus, setMenus] = useState([]);
  const [tenant, setTenant] = useState({})
  
  const { id } = useParams();
  const { tableId } = useParams();

  let lastMenuItemIndex = 0;

  const FetchMenus = () => {
    axios.get(`https://localhost:44353/v1/menu`, {
      params: {
        TenantId: id
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
    axios.get(`https://localhost:44353/v1/restaurant/${id}`, {
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
      <div className='rest-img-wrapper'>
        <div className='img-wrapper mb-3 rest-img position-relative'>
          <img className="absolute-center" style={{width:'622px', height:'210px'}} src="https://htmsports.com/wp-content/uploads/2020/12/kfchd2-600x200.jpg" /*{tenant.imageUrl}*/ alt="restaurant image"></img>
        </div>
      </div>
      <div className='category-buttons mb-3 hide-scrollbar d-flex'>
      {
        menus.map((item, index) => {
          return (
            <button
              key={index}
              className={`category-btn sm ${currentCategory === index ? 'selected' : ''}`}
              onClick={() => currentCategory === index ? setCurrentCategory(-1) : setCurrentCategory(index)}
            >
              {item.name}
            </button>
          )
        })
      }
      </div>

        <div className='menu'>
          {
            menus.map((item, index) => {
              return (
                <div className={`category mt-3 ml-2 mr-2 ${currentCategory === index || currentCategory === -1 ? '': 'd-none'}`} key={index}>
                  <button
                    className='category-header d-flex align-items-center justify-content-between full-width white mb-2'>
                    {item.name}
                    <i className="fas fa-sort-down" />
                  </button>
                  {
                    item.menuItems.map((menuItem) => {
                      { lastMenuItemIndex++ }
                      return (
                        <div className='outer-div menuitem-rounded mt-2' key={lastMenuItemIndex}>
                          <Item item={menuItem} index={lastMenuItemIndex} expandItem={expandItem} setExpandItem={setExpandItem} tableId={tableId} />
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
  )
}