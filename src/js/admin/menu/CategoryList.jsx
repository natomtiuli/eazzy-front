import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import EditCategory from './EditCategory';
import axios from 'axios';

export default function () {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [editMode, setEditMode] = useState({
    id: '',
    open: false
  });

  const userContext = useContext(UserContext);

  const FetchCategories = () => {
    axios.get(`https://localhost:44353/v1/menu/menuitemtypes`, {
      params: {
        "PageIndex": currentPage,
        "PageSize": pageSize,
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      },
    }).then(res => {
      console.log(res.data.data);
      setCategories(res.data.data);
      res.data.totalCount < pageSize ? setPagesAmount(1) : setPagesAmount(parseInt(res.data.totalCount / pageSize));
    });
  }

  const DeleteCategory = (i) => {
    axios.delete(`https://localhost:44353/v1/menu/menuitemtype/${i}`, {}).then(res => {
      FetchCategories();
    })
  }

  const handlePagination = () => {
    var length = 5;

    if (length > pagesAmount) length = pagesAmount;

    let start = currentPage - Math.floor(length / 2);
    start = Math.max(start, 1);
    start = Math.min(start, 1 + pagesAmount - length);

    var pages = Array.from({ length: length }, (_, i) => start + i);
    var pageHtml = [];

    pages.forEach((p) => {
      pageHtml.push(
        <div key={pageHtml}>
          <li
            className={`page-item p-1 ${currentPage === p ? 'active' : ''}`}
            onClick={() => setCurrentPage(p)}
          >
            <a className="page-link" href="#">{p}</a>
          </li>
        </div>
      )
    })

    return pageHtml;
  }

  useEffect(() => {
    FetchCategories();
  }, []);

  return (
    <div>
      <ul className="list-group mb-4">
        {
          categories.map((item, index) => {
            return (
              <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                {item.name}
                <div>
                  <button
                    className="btn btn-outline-info mr-2"
                    onClick={() => setEditMode({
                      id: item.id,
                      open: true
                    })}
                  >
                    რედაქტირება
                  </button>
                  <button
                    className='btn btn-outline-danger'
                    onClick={() => DeleteCategory(item.id)}
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
        <ul className="pagination d-flex flex-row">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}>
            <span className="page-link">Previous</span>
          </li>
          <div className="d-flex flex-row">
            {handlePagination()}
          </div>
          <li className={`page-item ${currentPage === pagesAmount ? 'disabled' : ''}`} onClick={() => currentPage !== pagesAmount && setCurrentPage(currentPage + 1)}>
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
      {
        editMode.open === true &&
        <EditCategory editMode={editMode} setEditMode={setEditMode} FetchCategories={FetchCategories} />
      }
    </div>
  )
}