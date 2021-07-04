import React, {useState, useEffect} from 'react';
import AddUserCard from './AddUserCard';
import UserCardList from './UserCardList';

export default function({setUserCardComponent}) {
  const [exitAnimation, setExitAnimation] = useState(0);
  const [openComponent, setOpenComponent] = useState('list');

  return (
    <div 
    className='mobile-menu-component black position-fixed'
    exitanimation={exitAnimation}
    onAnimationEnd={() => {
      exitAnimation === 1 && setUserCardComponent(false)
    }}  
    >
          <button 
            className='back ml-3'
            onClick={()=>setExitAnimation(1)}
          >
            <i className="fas fa-arrow-left large" />
          </button>

        <div className='add-contact container py-4'>
        <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse show">
            <ul className="navbar-nav mr-auto">
                <li className={`nav-item rounded mb-3 ${openComponent==='list' ? 'btn-primary active' : 'btn-info'}`} onClick={()=>setOpenComponent('list')}>
                    <a className="nav-link text-dark ml-3" href="#">Cards</a>
                </li>
                <li className={`nav-item rounded mb-3 ${openComponent==='add' ? 'btn-primary active' : 'btn-info'}`} onClick={()=>setOpenComponent('add')}>
                    <a className="nav-link text-dark ml-3" href="#">Add Card</a>
                </li>
            </ul>
            </div>
        </nav>
        {openComponent === 'list' && <UserCardList />}

        {openComponent === 'add' && <AddUserCard />}
        </div>
    </div>
  )
}