import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import OrderConfirmPopup from './OrderConfirmPopup';
import axios from 'axios';

export default function ({setCartComponent}) {
  const [orderConfirmPopup, setOrderConfirmPopup] = useState(false);
  const [cart, setCart] = useState();
  const [mapItems, setMapItems] = useState([]);
  const [exitAnimation, setExitAnimation] = useState(0);
  const userContext = useContext(UserContext)
  const sortedCartItems = {};

  function getDuplicateArrayElements(arr){
    var sorted_arr = arr.slice().sort((a, b) => (a.menuItemId > b.menuItemId) ? 1 : -1);
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] === sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }
  
  const FetchCart = async () => {
    await axios({ method:'get', url : "https://localhost:44353/v1/cart",
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      }
    }).then(res => {
      console.log('result:',res);
      setCart(res.data);

      let tmpArr = [];

      res.data.cartItems.forEach(item => {
        const foundItem = tmpArr.find(mItem => {
          return (mItem.menuItemId === item.menuItemId)
        });

        if (!foundItem) {
          tmpArr.push({...item, count: 1});
        } else {
          tmpArr = tmpArr.map(mItem => {
            if (mItem.menuItemId === foundItem.menuItemId) {
              mItem.count += 1;
            }

            return mItem;
          })
        }
      });

      setMapItems(tmpArr);
    });
  }
  
  useEffect(() => {
    FetchCart();
  }, [])
  
  const ClearCart = () => {
    axios.delete(`/v1/cart/clear`, {}, 
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      }
    })
    FetchCart();
  }

  const add = (id) => {
    axios.post(`https://localhost:44353/v1/cart`, {
      MenuItemId: id
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      }
    })
    FetchCart();
  };

  const remove = (id) => {
    axios.delete(`https://localhost:44353/v1/cart/${id}`, {}, 
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      }
    })
    FetchCart();
  };

  return (
    <div 
      className="cart-component hide-scrollbar position-fixed"
      exitanimation={exitAnimation}
      onAnimationEnd={() => {
        exitAnimation === 1 && setCartComponent(false)
      }}  
    >
      <div className="main-padding text-dark">
        <div className='divider d-flex align-items-center'>
          <button 
            className='back'
            onClick={()=>setExitAnimation(1)}
          >
            <i className="fas fa-arrow-left large" />
          </button>
        </div>
        <div className='d-flex align-items-center justify-content-between'>
          <h3 className='mb-0'>
            <i className="fas fa-shopping-cart mr-2" />My Cart
          </h3>
          <button className='btn btn-outline-dark'>
            <i className="fas fa-trash-alt mr-2" onClick={()=>ClearCart}/>
            Clear
          </button>
        </div>
      </div>
      <div className='my-3 p-3 bg-white rounded box-shadow'>
          {
            mapItems.map((item, index) => {
              return(
              <div key={index} className="cart-item-div media text-muted pt-3">
                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray d-flex align-items-center justify-content-between">
                  <img className="rounded" style={{width:'200px', height:'100px'}} src={`${item.imageUrl}`} alt="product"></img>
                  <div className='big'>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <strong className="text-gray-dark">{item.name}</strong>
                    </div>
                    <span className="d-block">{item.price} &#8382; x {item.count}</span>
                  </div>
                  <div>
                    <span className="badge badge-primary badge-pill">{item.price*item.count} &#8382;</span>
                    <div className='buttons justify-content-center d-flex align-items-center medium'>
                      <button className='remove'>
                        <i className="fas fa-minus" />
                      </button>
                      <button className='add' >
                        <i className="fas fa-plus" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )
            })
          }
        </div>
        <div className="main-padding">
          <button 
            type="button" 
            className="btn btn-primary btn-lg btn-block bg-purple"
            onClick={()=>setOrderConfirmPopup(true)}
          >Order</button>

        </div>
      {
        orderConfirmPopup === true && <OrderConfirmPopup cart={cart} setOrderConfirmPopup={setOrderConfirmPopup} setExitAnimation={setExitAnimation}/>
      }
    </div>
  )
}