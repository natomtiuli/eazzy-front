import React, {useState, useEffect} from 'react';
import AddUserCard from './AddUserCard';
import UserCardList from './UserCardList';

export default function({setUserCardComponent}) {
  const [exitAnimation, setExitAnimation] = useState(0);
  const [addCard, setAddCard] = useState(false);
  const [openComponent, setOpenComponent] = useState('list');

  return (
    <>
      <div 
        className='card-component black position-fixed hide-scrollbar'
        exitanimation={exitAnimation}
        onAnimationEnd={() => {
          exitAnimation === 1 && setUserCardComponent(false)
        }}  
      >
        <div className='main-padding'>
          <div className='divider'>
            <button 
              className='back ml-3'
              onClick={()=>setExitAnimation(1)}
            >
              <i className="fas fa-arrow-left large" />
            </button>
          </div>
          <h3 className='mb-3'>
            <i className="far fa-credit-card mr-2"></i>
            My Cards
          </h3>
          <UserCardList />
          <li className="btn my-2 btn-outline-dark big bold d-block mb-2" onClick={()=>setAddCard(true)}>
            <i className="fas fa-plus-circle mr-2"></i>
            Add New Card
          </li>
        </div>
      </div>
      {
        addCard === true && <AddUserCard setAddCard={setAddCard} />
      }
    </>
  )
}