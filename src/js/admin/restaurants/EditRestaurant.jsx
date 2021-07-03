import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import TextInput from '../../app/inputs/TextInput';
import SelectInput from '../../app/inputs/SelectInput';

export default function({editMode, setEditMode, FetchRestaurants}) {
  const {register, handleSubmit, control, getValues, reset, formState: { errors }} = useForm();
  
  const [tax, setTax] = useState();

  const taxTypes = [
    {
      id: 0,
      name: "NONE"
    },
    {
      id: 1,
      name: "AMOUNT"
    },
    {
      id: 2,
      name: "PERCENTAGE"
    }
  ];

  const taxChange = (value) => {
    setTax(value);
  }

  const userContext = useContext(UserContext);

  const FetchRestaurant = () => {
    axios.get(`https://localhost:44353/v1/restaurant/${editMode.id}`,{}).then(res => {
      console.log(res);
      if(res.status === 200) {
        reset(res.data);
        setTax(taxTypes.find(t => t.name === res.data.taxType).id);
      }
    });
  }

  useEffect(()=>{
    FetchRestaurant();
  },[]);

  const onSubmit = (data, e) => {
    data._method = "PATCH";
    console.log(data);
    axios.
    patch(`https://localhost:44353/v1/restaurant`, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      },
    })
    .then(res => {
      if (res.status === 200) {
        e.target.reset();
        FetchRestaurants();
        setEditMode({id: '', open: false});
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
          onClick={()=>setEditMode({id: '', open: false})}
        >
          <i className="fas fa-times"></i>
        </button>
        <form className='mw-1025' onSubmit={handleSubmit(onSubmit)}>
          <div className='d-flex w-100 align-items-start'>
            <TextInput
              label='რესტორნის სახელი*' 
              name='name'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება',
                maxLength: {value: 200, message: 'უნდა შეიცავდეს 200 სიმბოლოზე ნაკლებს'}
              }}
              errorMessage={errors?.name?.message}
              className='flex-1 mr-4'
            />
            <TextInput
              label='რესტორნის ტელეფონი*'  
              name='phoneNumber'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება',
                maxLength: {value: 20, message: 'უნდა შეიცავდეს 20 სიმბოლოზე ნაკლებს'}
              }} 
              errorMessage={errors?.phoneNumber?.message}
              className='flex-1'
            />
          </div>
          <TextInput 
            label='მისამართი' 
            name='address'
            register={register}
            rules={{
              required: 'აუცილებელია ველის შევსება',
              maxLength: {value: 200, message: 'უნდა შეიცავდეს 200 სიმბოლოზე ნაკლებს'}
            }} 
            errorMessage={errors?.address?.message}
          />
          <SelectInput
            label="სერვისის დამატებითი გადასახადის ტიპი"
            formGroupClassName='full-width'
            name="taxType"
            optionLabel = "name"
            callback={taxChange}
            control={control}
            options={taxTypes}
            getValues={getValues}
            register={register}
          />
          {
            tax === 1 ?
            <TextInput
              label='დამატებითი გადასახადის რაოდენობა' 
              name='taxAmount'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება',
                maxLength: {value: 100, message: 'უნდა შეიცავდეს 100 სიმბოლოზე ნაკლებს'}
              }} 
              errorMessage={errors?.taxAmount?.message}
            /> : tax === 2 ?
            <TextInput
              label='დამატებითი გადასახადის პროცენტული რაოდენობა' 
              name='taxPercentage'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება',
                maxLength: {value: 100, message: 'უნდა შეიცავდეს 100 სიმბოლოზე ნაკლებს'}
              }} 
              errorMessage={errors?.taxPercentage?.message}
            /> : ''
          }
          <input type='submit' value='რედაქტირება' className='mt-3 btn btn-info' />
        </form>
      </div>
    </div>
  )
}