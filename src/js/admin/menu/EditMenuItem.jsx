import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import TextInput from '../../app/inputs/TextInput';
import TextArea from '../../app/inputs/TextArea';
import SelectInput from '../../app/inputs/SelectInput';
import NumberInput from '../../app/inputs/NumberInput';
import PictureInput from '../../app/inputs/PictureInput';

export default function({editMode, setEditMode, FetchMenuItems}) {
  const {register, handleSubmit, control, reset, getValues, formState: { errors }} = useForm();
  const [menus, setMenus] = useState();
  const [categories, setCategories] = useState();

  const userContext = useContext(UserContext);
  
  useEffect(()=>{
    FetchMenus();
    FetchCategories();
    FetchItem();
  },[]);

  const FetchItem = () => {
    axios.get(`https://localhost:44353/v1/menu/menuitem/${editMode.item.menuItemId}`,{}).then(res => {

    if(res.status === 200) {
        reset(res.data);
        console.log('item:', res.data);  
      }
    });
  }

  const FetchCategories = () => {
    axios.get(`https://localhost:44353/v1/menu/menuitemtypes`,{},{
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      },
    }).then(res => {
      setCategories(res.data.data);
    });
  }

  const FetchMenus = () => {
    axios.get(`https://localhost:44353/v1/menu`,{},{
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      },
    }).then(res => {
      setMenus(res.data.data);
    });
  }

  const onSubmit = (data, e) => {
    let formData = new FormData();  

    Object.keys(data).map(key => {
      if (key.includes('Image')) {
        if(data.picture_new.length === 0) {
          delete data.Image;
        } else {
          formData.append('Image', data[key][0] || '');
        }
      } else if (!data[key]) {
        delete data.key;
      } else if (key.includes('Price')) {
        var p = +data[key];
        formData.append(key, JSON.stringify(p));
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    });

    formData.append("_method", "PUT");

    axios.
    patch(`https://localhost:44353/v1/menu/menuitem/${editMode.item.menuItemId}`, formData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      },
    }).then(res => {
        if (res.status === 200) {
          e.target.reset();
          FetchMenuItems(editMode.item.menuId);
          setEditMode({item: {}, open: false});
        } else {
          console.log(res);
        }
    })
  }

  return (
    <div className='fixed-bg hide-scrollbar'>
      <div className='position-relative container-sm bg-light mt-4 p-4 shadow rounded'>
      <button 
          className='close-btn' 
          onClick={()=>setEditMode({item: {}, open: false})}
        >
          <i className="fas fa-times"></i>
        </button>
        <form className='mw-1025' encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <SelectInput
            label="მენიუ"
            formGroupClassName='full-width'
            name="menuId"
            optionLabel = "name"
            control={control}
            options={menus}
            getValues={getValues}
            optionValue='menuId'
            register={register}
            errorMessage={errors?.MenuId?.message}
          />
          <SelectInput
            label="კატეგორია"
            formGroupClassName='full-width'
            name="menuItemTypeId"
            optionLabel = "name"
            control={control}
            options={categories}
            getValues={getValues}
            register={register}
            errorMessage={errors?.MenuItemTypeId?.message}
          />
          <TextInput
            label='პროდუქტის სახელი' 
            name='name'
            register={register}
            rules={{
              required: 'This field is required',
              maxLength: {value: 100, message: 'Must contain less than 100 symbols'}
            }} 
            errorMessage={errors?.Name?.message}
          />
          <TextArea
            label='Product Description' 
            name='description'
            register={register}
            rules={{
              required: 'This field is required',
              maxLength: {value: 500, message: 'Must contain less than 500 symbols'}
            }} 
            errorMessage={errors?.Description?.message}
          />
          <NumberInput
            label='ფასი' 
            name='price'
            register={register}
            rules={{
              required: 'This field is required',
              maxLength: {value: 100, message: 'Must contain less than 100 symbols'}
            }}
            step="any"
            errorMessage={errors?.Price?.message}
          />
          <PictureInput
            name='image'
            register={register}
            label='სურათი'
            rules={{
              required: 'სურათი აუცილებელია'
            }}
            errorMessage={errors?.Image?.message}
          />
          <input type='submit' value='Edit' className='mt-3 btn btn-info' />
        </form>
      </div>
    </div>
  )
}