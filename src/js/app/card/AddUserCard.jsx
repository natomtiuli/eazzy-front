import React, {useContext,useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useForm} from "react-hook-form";
import TextInput from "../inputs/TextInput";
import axios from "axios";

export default function ({setAddCard, FetchCards=()=>{}}) {
  const [exitAnimation, setExitAnimation] = useState(0);
  const context = useContext(UserContext);

  const {register, handleSubmit, formState: { errors }} = useForm();

  useEffect(()=>{

  },[]);

  const enter = async data => {
    console.log(data);
    console.log(context.accessToken)
    const logPromise = await axios.post("https://localhost:44353/v1/card", data, {
      headers: {
        'Access-Control-Allow-Origin': '*', 
        Authorization: `Bearer ${context.accessToken}`
      },
    }).then(res => {
      FetchCards();
      setExitAnimation(1);
    });
  };

  return (
    <div 
      className='slide-in-left position-fixed hide-scrollbar'
      exitanimation={exitAnimation}
      onAnimationEnd={() => {
        exitAnimation === 1 && setAddCard(false)
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
              label='Card Number' 
              name='numberMask'
              register={register}
              rules={{
                required: 'Field is required',
                maxLength: {value: 16, message: 'Must be less then 16 character'}
              }} 
              errorMessage={errors?.numberMask?.message}
              className='mb-2'
            />
            <div className="d-flex mb-2">
            <TextInput 
              label='Expires' 
              name='expires'
              register={register}
              rules={{
                  required: 'Field is required',
                  maxLength: {value: 5, message: 'Must be less then 5 character'}
                }} 
                errorMessage={errors?.expires?.message}
                className='flex-1 mr-4'
                />

            <TextInput 
              label='CCV' 
              name='ccv'
              register={register}
              rules={{
                  required: 'Field is required',
                  maxLength: {value: 3, message: 'Must be less then 3 character'}
                }} 
                errorMessage={errors?.ccv?.message}
                className='flex-1'
                />
            </div>

            <TextInput 
              label='Card Holder Name' 
              name='cardHolder'
              register={register}
              rules={{
              }} 
              errorMessage={errors?.cardHolder?.message}
              className='mb-4'
            />

            <div className="input-group">
              <button type="submit" className="btn btn-success btn-block bg-purple">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 