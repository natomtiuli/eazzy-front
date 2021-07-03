import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import TextInput from '../../app/inputs/TextInput';

export default function() {
  const {register, handleSubmit, formState: { errors }} = useForm();
  const userContext = useContext(UserContext);
  const onSubmit = (data, e) => {
    axios.
    post('https://localhost:44353/v1/menu', data, {
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
      <input type='submit' value='დამატება' className='mt-3 btn btn-danger' />
    </form>
  )
}