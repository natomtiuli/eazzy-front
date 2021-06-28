import React, {useContext, useEffect, useState} from 'react';
import {CartContext} from '../../contexts/CartContext';

export default function ({item, index, expandItem, setExpandItem}) {
  const cart = useContext(CartContext);
  const restaurantId = 0;
  const tableId = 0;
  const handleExpand = () => {
    (index === expandItem) ? setExpandItem(-1):setExpandItem(index);
  }

  const add = () => {
    cart.add(item.id, 1, item.price, restaurantId, tableId);
  };

  const remove = () => {
    if (cart.cart[item.id] && cart.cart[item.id]["quantity"] > 0 ) {
      cart.remove(item.id, 1, item.price);
    }
  };

  return (
    <>
    <div className={`item d-flex position-relative ${expandItem===index ? 'expanded' : ''}`}>
      <div 
        className='img-wrapper position-absolute'
        onClick={()=>handleExpand()}  
      >
        <img className='absolute-center' src={item.picture} alt="picture" />
      </div>
      <div className='item-description position-relative'>
        <h4 className='medium bold mb-1 '>
          {item.name}
        </h4>
        <p 
          className='sm'
          onClick={()=>handleExpand()}
        >
          {
            item.description.length >= 80 && expandItem !== index ? item.description.slice(0,80) + '...' : item.description
            
          }
        </p>  
        <p className='price'>
          {item.price} &#8382;
        </p>
        <div className='buttons position-absolute d-flex align-items-center medium'>
          <button className='remove' onClick={remove}>
            <i className="fas fa-minus" />
          </button>
          <button className='add' onClick={add}>
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
    </div>
    {
      cart.cart && cart.cart[item.id] && cart.cart[item.id]["quantity"] ?
      <div className='added-item white d-flex align-items-center full-width'>
        <div className='amount mr-1'>
          {cart.cart && cart.cart[item.id] && cart.cart[item.id]["quantity"]} x
        </div>
        <div className='name mr-auto'>
          {item.name}
        </div>
        <div className='amount-price'>
          { cart.cart && cart.cart[item.id] && cart.cart[item.id]["quantity"]*item.price } &#8382;
        </div>
      </div>
      : ''
    }
    </>
  )
}