import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import EditMenu from './EditMenu';
import axios from 'axios';

export default function() {
  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [editMode, setEditMode] = useState({
    id: '',
    open: false
  });

  const userContext = useContext(UserContext);
  
  const FetchMenus = () => {
    axios.get(`https://localhost:44353/v1/menu`,{
      params: {
        "PageIndex": currentPage,
        "PageSize": pageSize,
      }
    },{
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      },
    }).then(res => {
      console.log(res.data.data);
      setMenus(res.data.data);
      res.data.totalCount < pageSize ? setPagesAmount(1) : setPagesAmount(parseInt(res.data.totalCount/pageSize));
    });
  }

  const DeleteMenu = (i) => {
    axios.delete(`https://localhost:44353/v1/menu/${i}`, {}).then(res => {
      FetchMenus();
    })
  }

  useEffect(()=>{
    FetchMenus();
  },[]);

  return (
    <div>
      <ul className="list-group mb-4">
        {
          menus.map((item, index) => {
            return(
              <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                {item.name}
                <div>
                  <button 
                    className="btn btn-outline-info mr-2"
                    onClick={()=>setEditMode({
                      id: item.menuId,
                      open: true
                    })}
                  >
                    რედაქტირება
                  </button>
                  <button 
                    className='btn btn-outline-danger'
                    onClick={()=>DeleteMenu(item.menuId)}
                  >
                    წაშლა
                  </button>

                </div>
              </li>
            )
          })
        }
      </ul>
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={()=>currentPage !== 1 && setCurrentPage(currentPage-1)}>
            <span className="page-link">Previous</span>
          </li>
          {
          ()=> {
            for(let i = 1; i <= pagesAmount; ++i) {
              return (
                <div>
                  <li 
                    className={`page-item ${currentPage === i ? 'active' : ''}`} 
                    onClick={()=>setCurrentPage(i)}
                  >
                    <a className="page-link" href="#">{i}</a>
                  </li>
                </div>
              )
            }
          }}
          <li className={`page-item ${currentPage === pagesAmount ? 'disabled' : ''}`} onClick={()=>currentPage !== pagesAmount && setCurrentPage(currentPage+1)}>
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
      {
        editMode.open === true &&
        <EditMenu editMode={editMode} setEditMode={setEditMode} FetchMenus={FetchMenus} />
      }
    </div>
  )
}