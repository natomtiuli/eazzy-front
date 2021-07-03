import React, {useContext,useEffect} from 'react';
import {UserContext} from '../../contexts/UserContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import TextInput from '../../app/inputs/TextInput';

export default function({editMode, setEditMode, FetchMenus}) {
  const {register, handleSubmit, reset, formState: { errors }} = useForm();

  const userContext = useContext(UserContext);

  const FetchMenu = () => {
    axios.get(`https://localhost:44353/v1/menu/${editMode.id}`,{}).then(res => {
      console.log(res);
      if(res.status === 200) {
        reset(res.data);
      }
    });
  }

  useEffect(()=>{
    FetchMenu();
  },[]);


  const onSubmit = (data, e) => {
    data._method =  "PATCH";
    
    axios.
    patch(`https://localhost:44353/v1/menu/${editMode.id}`, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      },
    }).then(res => {
        if (res.status === 200) {
          e.target.reset();
          FetchMenus();
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
          <TextInput
            label='მენიუს სახელი' 
            name='name'
            register={register}
            rules={{
              required: 'აუცილებელია ველის შევსება',
              maxLength: {value: 100, message: 'უნდა შეიცავდეს 100 სიმბოლოზე ნაკლებს'}
            }} 
            errorMessage={errors?.name?.message}
          />
          <input type='submit' value='რედაქტირება' className='mt-3 btn btn-info' />
        </form>
      </div>
    </div>
  )
}