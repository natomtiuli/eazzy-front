import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from "react-router-dom";

export default function () {
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState(0);
  const [pageSize, setPageSize] = useState(1);

  let debounce = 0;

  const FetchRestaurants = () => {
    axios.get(`https://localhost:44353/v1/restaurant/all`, {
      params: {
        Name: search,
        pageSize: pageSize,
        pageIndex: currentPage
      }
    }).then(res => {
      if (res.status === 200) {
        setRestaurants(res.data.data);
        res.data.totalCount < pageSize ? setPagesAmount(1) : setPagesAmount(parseInt(res.data.totalCount / pageSize));
      }
    });
  };

  const handleSearchChange = (e) => {
    clearTimeout(debounce);

    debounce = setTimeout(() => {
      setSearch(e.target.value);
    }, 700)
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
    FetchRestaurants();
  }, [search, currentPage])

  return (
    <div className='restaurant-component'>
      <div style={{ width: '90%' }} className='ml-auto h-auto mr-auto input-group mb-3'>
        <input
          label='Search'
          name='search'
          className='form-control'
          placeholder="Search..."
          onChange={handleSearchChange}
        >
        </input>
        <div className="input-group-append">
          <div className="input-group-text">
            <span className={`fa fa-search`}></span>
          </div>
        </div>
      </div>
      <div className='category-buttons mb-3 white hide-scrollbar d-flex'>
        {
          /*categories.map((item, index) => {
              return (
                  <button
                      key={index}
                      className={`category-btn sm ${currentCategory === index ? 'selected' : ''}`}
                      onClick={() => setCurrentCategory(index)}
                  >
                      {item}
                  </button>
              )
          })*/
        }
        <div className='padded' />
      </div>
      <div className='main-padding'>
        <div className='menu'>
          <div className='category'>
            {
              restaurants.map((item, index) => {
                return (
                  <div className='outer-div mb-2' key={index}>
                    <Link to={`/menu/${item.id}`} className={`item d-flex position-relative`}>
                      <div
                        className='img-wrapper position-absolute'
                      >
                        <img className='absolute-center' src={item.imageUrl} alt="picture" />
                      </div>
                      <div className='item-description position-relative text-dark'>
                        <h4 className='medium bold mb-1'>
                          {item.name}
                        </h4>
                        <p
                          className='sm mt-3'
                        >
                          {
                            item.description
                          }
                        </p>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
          <nav aria-label="...">
            <ul className="pagination d-flex flex-row ">
              <li className={`page-item p-1 ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}>
                <span className="page-link">Previous</span>
              </li>
              <div className="d-flex flex-row">
                {
                  handlePagination()
                }
              </div>
              <li className={`page-item p-1 ${currentPage === pagesAmount ? 'disabled' : ''}`} onClick={() => currentPage !== pagesAmount && setCurrentPage(currentPage + 1)}>
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div >
  )
}