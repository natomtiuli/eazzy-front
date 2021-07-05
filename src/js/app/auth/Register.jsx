import React, {useContext,useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useForm} from "react-hook-form";
import TextInput from "../inputs/TextInput";
import PasswordInput from "../inputs/PasswordInput";
import axios from "axios";

export default function ({setRegisterComponent}) {
  const [exitAnimation, setExitAnimation] = useState(0);
  const context = useContext(UserContext);

  const {register,handleSubmit, formState: { errors }} = useForm();

  useEffect(()=>{

  },[]);

  const enter = async data => {
    console.log(data);
    const logPromise = await axios.post("https://localhost:44353/v1/account/signup", data, {
      headers: {'Access-Control-Allow-Origin': '*'},
    }).then(res => {
      console.log(res);
      if (res.data.success) {
          if(res.data) {
            setRegisterComponent(false);
          }
        }
    });
  };

  return (
    <div 
      className='register-component hide-scrollbar position-fixed'
      exitanimation={exitAnimation}
      onAnimationEnd={() => {
        exitAnimation === 1 && setRegisterComponent(false)
      }}    
    >
      <div className='main-padding'>
        <div className='divider'>
          <button 
            className='back'
            onClick={()=>setExitAnimation(1)}
          >
            <i className="fas fa-arrow-left large" />
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit(enter)}>
            <TextInput 
              label='მომხმარებლის სახელი' 
              name='userName'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება',
                maxLength: {value: 70, message: 'უნდა შეიცავდეს 70 სიმბოლოზე ნაკლებს'}
              }} 
              errorMessage={errors?.userName?.message}
              className='mb-2'
              spanClassName= 'fas fa-user'
            />
            <TextInput 
              label='სახელი' 
              name='firstName'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება',
                maxLength: {value: 70, message: 'უნდა შეიცავდეს 70 სიმბოლოზე ნაკლებს'}
              }} 
              errorMessage={errors?.firstName?.message}
              className='mb-2'
              spanClassName= 'fas fa-user'
            />
            <TextInput 
              label='გვარი' 
              name='lastName'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება',
                maxLength: {value: 70, message: 'უნდა შეიცავდეს 70 სიმბოლოზე ნაკლებს'}
              }} 
              errorMessage={errors?.lastName?.message}
              className='mb-2'
              spanClassName= 'fas fa-user'
            />
            <TextInput 
              label='ელ. ფოსტა' 
              name='email'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება',
                maxLength: {value: 70, message: 'უნდა შეიცავდეს 70 სიმბოლოზე ნაკლებს'}
              }} 
              errorMessage={errors?.email?.message}
              className='mb-2'
              spanClassName= 'fas fa-envelope'
            />
            <TextInput 
              label='ტელეფონის ნომერი' 
              name='phoneNumber'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება',
                maxLength: {value: 70, message: 'უნდა შეიცავდეს 70 სიმბოლოზე ნაკლებს'}
              }} 
              errorMessage={errors?.phoneNumber?.message}
              className='mb-2'
              spanClassName= 'fas fa-phone'
            />
            <PasswordInput 
              label='პაროლი' 
              name='password'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება'
              }} 
              errorMessage={errors?.password?.message}
              className='mb-2'
            />
            <div className="input-group">
                <button type="submit" className="btn btn-success btn-block">რეგისტრაცია</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 