import React, {useContext,useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useForm} from "react-hook-form";
import TextInput from "../inputs/TextInput";
import CheckboxInput from "../inputs/CheckboxInput";
import PasswordInput from "../inputs/PasswordInput";
import axios from "axios";

export default function ({setLoginComponent}) {
  const [exitAnimation, setExitAnimation] = useState(0);
  const context = useContext(UserContext);

  const {register,handleSubmit, formState: { errors }} = useForm();

  useEffect(()=>{

  },[]);

  const enter = async data => {
    console.log(data);
    const logPromise = await axios.post("https://localhost:44353/v1/account/login", data, {
      headers: {'Access-Control-Allow-Origin': '*'},
    }).then(res => {
      if (res.data.success) {
        context.setAccessToken(res.data.accessToken);
        console.log("res:",res.data.accessToken);
        
        axios.get("https://localhost:44353/v1/customer", {
          headers: {Authorization: `Bearer ${res.data.accessToken}`}
        }).then(result => {
          if(result.data) {
            context.setUser(result.data, res.data.accessToken);
            console.log("res:",res.data.accessToken);
            setExitAnimation(1);
          }
        })
      }
    });
  };

  return (
    <div 
      className='login-component hide-scrollbar position-fixed'
      exitanimation={exitAnimation}
      onAnimationEnd={() => {
        exitAnimation === 1 && setLoginComponent(false)
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
              label='ელ. ფოსტა' 
              name='email'
              register={register}
              rules={{
                required: 'აუცილებელია ველის შევსება',
                maxLength: {value: 70, message: 'უნდა შეიცავდეს 70 სიმბოლოზე ნაკლებს'}
              }} 
              errorMessage={errors?.email?.message}
              className='mb-2'
              spanClassName= 'fas fa-user'
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
            {/* <CheckboxInput 
              label='დაიმახსოვრე' 
              name='rememberMe'
              register={register}
              className='mb-4'
            /> */}

            <div className="input-group">
              <button type="submit" className="btn btn-success btn-block">ავტორიზაცია</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 