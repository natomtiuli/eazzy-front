import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from "../../contexts/UserContext";
import EditRestaurant from './EditRestaurant';
import axios from 'axios';

export default function() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState();
  const [pageSize, setPageSize] = useState(10);

  const [editMode, setEditMode] = useState({
    id: '',
    open: false
  });

  const userContext = useContext(UserContext);
  
  const FetchRestaurants = () => {
    if(userContext.hasRole(['System Administrator'])) {
      axios.get(`https://localhost:44353/v1/restaurant/All`,{
        params: {
          "PageIndex": currentPage,
          "PageSize": pageSize
        }
      },{
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${userContext.accessToken}`
        },
      }).then(res => {
        setRestaurants(res.data.data);
        res.data.totalCount < pageSize ? setPagesAmount(1) : setPagesAmount(parseInt(res.data.totalCount/pageSize));
      });
    } else if (userContext.user && userContext.hasRole(['Administrator'])) {
      axios.get(`https://localhost:44353/v1/restaurant`, {}, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${userContext.accessToken}`
        },
      }).then(res => {
        console.log(res);
        var newArr = [];
        setRestaurants([...newArr, res.data]);
      });
    }
    
  }

  const DeleteRestaurant = (i) => {
    axios.delete(`https://localhost:44353/v1/restaurant/${i}`, {}).then(res => {
      FetchRestaurants();
    })
  }

  useEffect(()=>{
    FetchRestaurants();
  });

  return (
    <div>
      <ul className="list-group mb-4">
        {
          restaurants.map((item, index) => {
            return(
              <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                {item.name}
                <div>
                  {
                    userContext.user && userContext.hasRole(['Administrator']) ?
                      <button 
                        className="btn btn-outline-info mr-2"
                        onClick={()=>setEditMode({
                          id: item.id,
                          open: true
                        })}
                      >
                        რედაქტირება
                      </button>
                    :
                    userContext.user &&  userContext.hasRole(['System Administrator']) ?
                      <button 
                        className='btn btn-outline-danger'
                        onClick={()=>DeleteRestaurant(item.id)}
                      >
                        წაშლა
                      </button>
                    : ''
                    }
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
        <EditRestaurant editMode={editMode} setEditMode={setEditMode} FetchRestaurants={FetchRestaurants} />
      }
    </div>
  )
}