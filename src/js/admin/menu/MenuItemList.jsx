import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import EditMenuItem from './EditMenuItem';
import { useForm } from 'react-hook-form';
import SelectInput from '../../app/inputs/SelectInput';
import axios from 'axios';

export default function() {
  const {register, handleSubmit, control, getValues, formState: { errors }} = useForm();
  const [menus, setMenus] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [editMode, setEditMode] = useState({
    item: {},
    open: false
  });

  const userContext = useContext(UserContext);

  const menuChange = (value) => {
    console.log(value);
    setMenuItems(menus.find(m => m.menuId === value).menuItems);
  }

  const FetchMenuItems = (value) => {
    FetchMenus();
    setMenuItems(menus.find(m => m.menuId === value).menuItems);
  }

  const FetchMenus = () => {
    axios.get(`https://localhost:44353/v1/menu`,{
    },{
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      },
    }).then(res => {
      console.log(res.data.data);
      setMenus(res.data.data);
    });
  }

  const DeleteMenuItem = (i, menuId) => {
    axios.delete(`https://localhost:44353/v1/menu/menuitem/${i}`, {}).then(res => {
      FetchMenuItems(menuId);
    })
  }

  useEffect(()=>{
    FetchMenus();
  },[]);

  return (
    <div>
      <SelectInput
        label="Choose menu"
        formGroupClassName='full-width'
        name="MenuId"
        optionLabel = "name"
        control={control}
        options={menus}
        getValues={getValues}
        optionValue='menuId'
        callback={menuChange}
        register={register}
        errorMessage={errors?.MenuId?.message}
      />
      <div className='container'>
        <div className='row'>
          {
            menuItems.map((item, index) => {
              return(
                <div key={index} className="col-md-4" style={{minWidth: '340px'}}>
                  <div className='card mb-4 box-shadow' style={{minWidth: '320px'}}>
                    <div className="card-img-top position-relative overflow-hidden" style={{height: '200px'}}>
                      <img src={item.imageUrl} className="d-block w-100 absolute-center" alt="news image" />
                    </div>
                    <div className='card-body'>
                      <h5>
                        {item.name}
                      </h5>
                      <p className='card-text mb-0'>
                        {item.description}
                      </p>
                      <p className="text-muted d-block mb-3">
                        {item.price} &#8382;
                      </p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button 
                            type="button" 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={()=>setEditMode({
                              item: item,
                              open: true
                            })}
                          >
                            Edit
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={()=>DeleteMenuItem(item.menuItemId, item.menuId)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      {
        editMode.open === true &&
        <EditMenuItem editMode={editMode} setEditMode={setEditMode} FetchMenuItems={FetchMenuItems} />
      }
    </div>
  )
}