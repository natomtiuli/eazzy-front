import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import TextInput from '../../app/inputs/TextInput';
import TextArea from '../../app/inputs/TextArea';
import SelectInput from '../../app/inputs/SelectInput';
import NumberInput from '../../app/inputs/NumberInput';
import PictureInput from '../../app/inputs/PictureInput';

export default function() {
  const {register, handleSubmit, control, getValues, formState: { errors }} = useForm();
  const [menus, setMenus] = useState();
  const [categories, setCategories] = useState();

  const userContext = useContext(UserContext);
  
  useEffect(()=>{
    FetchMenus();
    FetchCategories();
  },[]);

  const FetchCategories = () => {
    axios.get(`https://localhost:44353/v1/menu/menuitemtypes`,{},{
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      },
    }).then(res => {
      console.log(res.data.data);
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
      console.log(res.data.data);
      setMenus(res.data.data);
    });
  }

  const onSubmit = (data, e) => {
    let formData = new FormData();  

    Object.keys(data).map(key => {
      if (key.includes('Image') && data.Image.length) {
        formData.append(key, data[key][0] || ''); 
      } else if (key.includes('Price')) {
        var p = +data[key];
        formData.append(key, JSON.stringify(p));
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    });

    axios.
    post('https://localhost:44353/v1/menu/menuitem', formData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      },
    }).then(res => {
        if (res.status === 201) {
          e.target.reset();
        } else {
          console.log(res);
        }
    })
  }

  return (
    <form className='mw-1025' encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <SelectInput
        label="მენიუ"
        formGroupClassName='full-width'
        name="MenuId"
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
        name="MenuItemTypeId"
        optionLabel = "name"
        control={control}
        options={categories}
        getValues={getValues}
        register={register}
        errorMessage={errors?.MenuItemTypeId?.message}
      />
      <TextInput
        label='პროდუქტის სახელი' 
        name='Name'
        register={register}
        rules={{
          required: 'This field is required',
          maxLength: {value: 100, message: 'Must contain less than 100 symbols'}
        }} 
        errorMessage={errors?.Name?.message}
      />
      <TextArea
        label='Product Description' 
        name='Description'
        register={register}
        rules={{
          required: 'This field is required',
          maxLength: {value: 500, message: 'Must contain less than 500 symbols'}
        }} 
        errorMessage={errors?.Description?.message}
      />
      <NumberInput
        label='ფასი' 
        name='Price'
        register={register}
        rules={{
          required: 'This field is required',
          maxLength: {value: 100, message: 'Must contain less than 100 symbols'}
        }}
        step="any"
        errorMessage={errors?.Price?.message}
      />
      <PictureInput
        name='Image'
        register={register}
        label='სურათი'
        rules={{
          required: 'სურათი აუცილებელია'
        }}
        errorMessage={errors?.Image?.message}
      />
      <input type='submit' value='დამატება' className='mt-3 btn btn-danger' />
    </form>
  )
}