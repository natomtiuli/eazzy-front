import React, {useContext, useEffect, useState} from 'react';
// import {CartContext} from '../../contexts/CartContext';

export default function ({setCartComponent}) {
  // const cart = useContext(CartContext);
  const [exitAnimation, setExitAnimation] = useState(0);

  return (
    <div 
      className="cart-component position-fixed"
      exitanimation={exitAnimation}
      onAnimationEnd={() => {
        exitAnimation === 1 && setCartComponent(false)
      }}  
    >
      <div className="main-padding">
        <div className='divider d-flex align-items-center justify-content-between'>
          <button 
            className='back'
            onClick={()=>setExitAnimation(1)}
          >
            <i className="fas fa-arrow-left large" />
          </button>
          <h3 className='mb-0'>
            My Cart
          </h3>
        </div>
      </div>
    </div>
  )
}