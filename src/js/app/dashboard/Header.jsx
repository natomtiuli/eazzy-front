import React, { useState } from 'react';
import MobileMenu from './MobileMenu';
import Cart from '../cart/Cart';

export default function () {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartComponent, setCartComponent] = useState(false);

  return (
    <div className='header-component full-width'>
      <div className='main-padding'>
        <div className='d-flex align-items-center justify-content-between'>
          <h2 className='big logo white mb-0'>
            <a href="/" className="text-white" style={{ textDecoration: `none` }}>EAZZY</a>
          </h2>
          <div className='d-flex align-items-center'>
            <button
              className='cart-btn mr-3'
              onClick={() => setCartComponent(true)}
            >
              <i className="fas fa-shopping-cart mr-2" />
            </button>
            <button
              className='burger-btn'
              onClick={() => setMobileMenu(true)}
            >
              <div />
              <div />
              <div />
            </button>
          </div>
        </div>
      </div>
      {
        mobileMenu && <MobileMenu setMobileMenu={setMobileMenu} />
      }
      {
        cartComponent === true && <Cart setCartComponent={setCartComponent} />
      }
    </div>
  )
}