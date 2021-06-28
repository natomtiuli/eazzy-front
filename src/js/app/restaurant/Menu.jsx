import React, {useState} from 'react';
import Item from './Item';

export default function () {
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [expandItem, setExpandItem] = useState(-1);
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
      <div className='promos mb-3 hide-scrollbar d-flex'>
        {
          promos.map((item, index) => {
            return(
              <div className='promo-item position-relative' key={index}>
                <div className='img-wrapper position-relative'>
                  <img className='absolute-center' src={item.picture} alt="food" />
                </div>
                <p className='mb-0 bold white full-width text-center absolute-center big promo-item-comment'>
                  {item.comment}
                </p>
              </div>
            )
          })
        }
        <div className='padded' />
      </div>
      <div className='category-buttons mb-3 white hide-scrollbar d-flex'>
        {
          categories.map((item, index) => {
            return(
              <button 
                key={index} 
                className={`category-btn sm ${currentCategory === index ? 'selected' : ''}`}
                onClick={()=>setCurrentCategory(index)}
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
                return(
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