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
          <h3 className='mb-0'>
            My Cards
          </h3>
          <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse show">
            <ul className="navbar-nav mr-auto">
              <li className={`nav-item rounded mb-3 ${addCard === true ? 'btn-primary active' : 'btn-info'}`} onClick={()=>setAddCard(true)}>
                <a className="nav-link text-dark ml-3" href="#">Add Card</a>
              </li>
            </ul>
            </div>
          </nav>
          <UserCardList />

        </div>
      </div>
      {
        addCard === true && <AddUserCard setAddCard={setAddCard} />
      }
    </>
  )
}