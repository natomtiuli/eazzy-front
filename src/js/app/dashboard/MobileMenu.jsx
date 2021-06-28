import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Link} from "react-router-dom";
import Login from '../auth/Login';
import Register from '../auth/Register';
import Cart from '../cart/Cart';

export default function ({setMobileMenu}) {
  const userContext = useContext(UserContext);
  const [exitAnimation, setExitAnimation] = useState(0);
  const [loginComponent, setLoginComponent] = useState(false);
  const [registerComponent, setRegisterComponent] = useState(false);
  const [cartComponent, setCartComponent] = useState(false);
  return (
    <div 
      className='mobile-menu-component black position-fixed'
      exitanimation={exitAnimation}
      onAnimationEnd={() => {
        exitAnimation === 1 && setMobileMenu(false)
      }}  
    >
      <div className='main-padding'>
        <div className='divider'>
          <button 
            className='back'
            onClick={()=>setExitAnimation(1)}
          >
            <i className="fas fa-arrow-left large" />
          </button>
        </div>
        <button 
          className='navigation-btn big bold d-block mb-2'
          onClick={()=>setCartComponent(true)}
        >
          <i className="fas fa-shopping-cart mr-2" />Cart
        </button>
        {
          userContext.user ?
          (
            <div>
              logged in!
              <Link
                className='navigation-btn big bold d-block mb-2'
                to="/logout"
              >
                <i className="fas fa-sign-out-alt mr-2" />
                Log out
              </Link>
              {
                userContext.hasRole(['System Administrator', 'Administrator']) 
                ?
                <div>
                  admin !
                </div>
                : ''
              }
            </div>
          )
          :
          (<>
            <button 
              className='navigation-btn big bold d-block mb-2'
              onClick={()=>setLoginComponent(true)}
            >
              <i className="fas fa-sign-in-alt mr-2" />
              Log in
            </button>
            <button 
              className='navigation-btn big bold d-block mb-2'
              onClick={()=>setRegisterComponent(true)}
            >
              <i className="fas fa-utensils mr-2" />
              Register
            </button>
          </>)
        }
      </div>
      {
        loginComponent === true && <Login setLoginComponent={setLoginComponent} />
      }
      {
        registerComponent === true && <Register setRegisterComponent={setRegisterComponent} />
      }
      {
        cartComponent === true && <Cart setCartComponent={setCartComponent} />
      }
    </div>
  )
}