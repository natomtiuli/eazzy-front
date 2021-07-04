import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import TextInput from '../../app/inputs/TextInput';
import SelectInput from '../../app/inputs/SelectInput';
import NumberInput from '../../app/inputs/NumberInput';
import PasswordInput from '../../app/inputs/PasswordInput';
import TextArea from '../../app/inputs/TextArea';

export default function() {
  const {register, handleSubmit, control, getValues, formState: { errors }} = useForm();
  const [tax, setTax] = useState();

  const taxTypes = [
    {
      id: 0,
      name: "None"
    },
    {
      id: 1,
      name: "Amount"
    },
    {
      id: 2,
      name: "Percentage"
    }
  ];

  const taxChange = (value) => {
    setTax(value);
  }

  const onSubmit = (data, e) => {
    axios.
    post('https://localhost:44353/v1/restaurant/register/newrestaurant', data, {
      headers: {'Access-Control-Allow-Origin': '*'},
    }).then(res => {
        if (res.status === 204) {
          e.target.reset();
        } else {
          console.log(res);
        }
    })
  }

  return (
    <form className='mw-1025' onSubmit={handleSubmit(onSubmit)}>
      <div className='d-flex w-100 align-items-start'>
        <TextInput
          label='Name*' 
          name='name'
          register={register}
          rules={{
            required: 'Field is required',
            maxLength: {value: 200, message: 'უნდა შეიცავდეს 200 სიმბოლოზე ნაკლებს'}
          }}
          errorMessage={errors?.name?.message}
          className='flex-1 mr-4'
        />
        <TextInput
          label='Phone Number*'  
          name='phoneNumber'
          register={register}
          rules={{
            required: 'Field is required',
            maxLength: {value: 20, message: 'უნდა შეიცავდეს 20 სიმბოლოზე ნაკლებს'}
          }} 
          errorMessage={errors?.phoneNumber?.message}
          className='flex-1'
        />
      </div>
      <TextArea
        label='Description'  
        name='description'
        register={register}
        rules={{
        }} 
        errorMessage={errors?.description?.message}
        className='flex-1'
      >
      </TextArea>
      <TextInput 
        label='Address' 
        name='address'
        register={register}
        rules={{
          required: 'Field is required',
          maxLength: {value: 200, message: 'უნდა შეიცავდეს 200 სიმბოლოზე ნაკლებს'}
        }} 
        errorMessage={errors?.address?.message}
      />
      <SelectInput
        label="Tax Type"
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
          label='Tax Amount' 
          name='taxAmount'
          register={register}
          rules={{
            required: 'Field is required',
            maxLength: {value: 100, message: 'უნდა შეიცავდეს 100 სიმბოლოზე ნაკლებს'}
          }} 
          errorMessage={errors?.taxAmount?.message}
        /> : tax === 2 ?
        <TextInput
          label='Tax Percentage' 
          name='taxPercentage'
          register={register}
          rules={{
            required: 'Field is required',
            maxLength: {value: 100, message: 'უნდა შეიცავდეს 100 სიმბოლოზე ნაკლებს'}
          }} 
          errorMessage={errors?.taxPercentage?.message}
        /> : ''
      }
      <TextInput 
        label='Admin Username' 
        name='signUpRequest.userName'
        register={register}
        rules={{
          required: 'Field is required',
          maxLength: {value: 200, message: 'უნდა შეიცავდეს 200 სიმბოლოზე ნაკლებს'}
        }} 
        errorMessage={errors?.signUpRequest?.userName?.message}
      />
      <TextInput 
        label='FirstName' 
        name='signUpRequest.firstName'
        register={register}
        rules={{
          required: 'Field is required',
          maxLength: {value: 200, message: 'უნდა შეიცავდეს 200 სიმბოლოზე ნაკლებს'}
        }} 
        errorMessage={errors?.signUpRequest?.firstName?.message}
      />
      <TextInput 
        label='LastName' 
        name='signUpRequest.lastName'
        register={register}
        rules={{
          required: 'Field is required',
          maxLength: {value: 200, message: 'უნდა შეიცავდეს 200 სიმბოლოზე ნაკლებს'}
        }} 
        errorMessage={errors?.signUpRequest?.lastName?.message}
      />
      <TextInput 
        label='Email' 
        name='signUpRequest.email'
        register={register}
        rules={{
          required: 'Field is required',
          maxLength: {value: 200, message: 'უნდა შეიცავდეს 200 სიმბოლოზე ნაკლებს'}
        }} 
        errorMessage={errors?.signUpRequest?.email?.message}
      />
      <NumberInput
        label='Phone Number' 
        name='signUpRequest.phoneNumber'
        register={register}
        rules={{
          required: 'Field is required',
          maxLength: {value: 9, message: 'უნდა შეიცავდეს 9 სიმბოლოზე ნაკლებს'}
        }} 
        errorMessage={errors?.signUpRequest?.phoneNumber?.message}
      />
      <PasswordInput 
        label='Password' 
        name='signUpRequest.password'
        register={register}
        rules={{
          required: 'Field is required',
          maxLength: {value: 200, message: 'უნდა შეიცავდეს 200 სიმბოლოზე ნაკლებს'}
        }} 
        errorMessage={errors?.signUpRequest?.password?.message}
      />
      <input type='submit' value='დამატება' className='mt-3 btn btn-danger' />
    </form>
  )
}