import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import EditTable from './EditTable';
import axios from 'axios';

export default function() {
  const [tables, setTables] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [editMode, setEditMode] = useState({
    id: '',
    open: false
  });

  const userContext = useContext(UserContext);
  
  const FetchTables = () => {
    axios.get(`https://localhost:44353/v1/restaurant/tables`,{
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
      setTables(res.data.data);
      res.data.totalCount < pageSize ? setPagesAmount(1) : setPagesAmount(parseInt(res.data.totalCount/pageSize));
    });
  }

  const DeleteTable = (i) => {
    axios.delete(`https://localhost:44353/v1/restaurant/tables/${i}`, {}).then(res => {
      FetchTables();
    })
  }

  useEffect(()=>{
    FetchTables();
  },[]);

  return (
    <div>
      <ul className="list-group mb-4">
        {
          tables.map((item, index) => {
            return(
              <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                {item.tableNumber}
                <div>
                  <button 
                    className="btn btn-outline-info mr-2"
                    onClick={()=>setEditMode({
                      id: item.id,
                      open: true
                    })}
                  >
                    რედაქტირება
                  </button>
                  <button 
                    className='btn btn-outline-danger'
                    onClick={()=>DeleteTable(item.id)}
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
        <EditTable editMode={editMode} setEditMode={setEditMode} FetchTables={FetchTables} />
      }
    </div>
  )
}