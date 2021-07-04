import React, { useState } from 'react';
import Item from './Item';

export default function ({ restaurantId }) {
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [expandItem, setExpandItem] = useState(-1);
  const [search,setSearch] = useState('');
  
  let debounce = 0;
  const handleSearchChange = (e) => {
    clearTimeout(debounce);

    debounce = setTimeout(() => {
      setSearch(e.target.value);
    }, 700)
  }

  const categories = [
    'Cold Dishes',
    'Hot Dishes',
    'Cold Drinks',
    'Hot Drinks',
    'Alcohol',
    'Salad'
  ];

  const promos = [
    {
      picture: '/images/food1.jpg',
      comment: 'დღის სიახლე! -20%'
    },
    {
      picture: '/images/food2.jpg',
      comment: 'აქცია კომენტარი'
    }
  ];

  const items = [
    {
      id: '0',
      name: 'ტოსტი',
      description: 'აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა აღწერა  ',
      price: '10.00',
      picture: '/images/food2.jpg'
    },
    {
      id: '1',
      name: 'ფდსფდსფდ',
      description: 'აღწერა',
      price: '12.00',
      picture: '/images/food1.jpg'
    },
  ]

  return (
    <div className='menu-component'>
      <div style={{ width: '90%' }} className='ml-auto h-auto mr-auto input-group mb-3'>
        <input
          label='Search'
          name='search'
          className='form-control'
          placeholder="Search..."
          onChange={handleSearchChange}
        >
        </input>
        <div className="input-group-append">
          <div className="input-group-text">
            <span className={`fa fa-search`}></span>
          </div>
        </div>
      </div>
      <div className='category-buttons mb-3 white hide-scrollbar d-flex'>
        {
          categories.map((item, index) => {
            return (
              <button
                key={index}
                className={`category-btn sm ${currentCategory === index ? 'selected' : ''}`}
                onClick={() => setCurrentCategory(index)}
              >
                {item}
              </button>
            )
          })
        }
        <div className='padded' />
      </div>
      <div className='main-padding'>
        <div className='menu'>
          <div className='category'>
            <button
              className='category-header d-flex align-items-center justify-content-between full-width white mb-2'>
              ცომეული
              <i className="fas fa-sort-down" />
            </button>
            {
              items.map((item, index) => {
                return (
                  <div className='outer-div mb-2' key={index}>
                    <Item item={item} index={index} expandItem={expandItem} setExpandItem={setExpandItem} />
                  </div>
                )
              })
            }
          </div>
          <div className='category'>
            <button
              className='category-header d-flex align-items-center justify-content-between full-width white mb-2'>
              ცომეული
              <i className="fas fa-sort-down" />
            </button>
            {
              items.map((item, index) => {
                return (
                  <div className='outer-div mb-2' key={index}>
                    <Item item={item} index={index} expandItem={expandItem} setExpandItem={setExpandItem} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}