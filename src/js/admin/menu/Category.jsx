import React, {useState, useEffect} from 'react';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';

export default function() {
  const [openComponent, setOpenComponent] = useState('list');

  return (
    <div className='add-contact container py-4'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${openComponent==='list' ? 'btn-primary active' : ''}`} onClick={()=>setOpenComponent('list')}>
              <a className="nav-link" href="#">კატეგორიები</a>
            </li>
            <li className={`nav-item ${openComponent==='add' ? 'btn-primary active' : ''}`} onClick={()=>setOpenComponent('add')}>
              <a className="nav-link" href="#">დამატება</a>
            </li>
          </ul>
        </div>
      </nav>
      {openComponent === 'add' && <AddCategory />}
      
      {openComponent === 'list' && <CategoryList />}
    </div>
  )
}