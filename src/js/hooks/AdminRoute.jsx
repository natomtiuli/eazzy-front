import React, {useContext, useEffect} from "react";
import {UserContext} from "../contexts/UserContext";
import {Redirect, Route} from "react-router-dom";
import Navbar from "../admin/dashboard/Navbar";
import Menu from "../admin/dashboard/Menu";
import axios from "axios";


export default function ({component: Component, ...rest}) {
  const context = useContext(UserContext);

  axios.interceptors.request.use(function (config) {
    const bearer = context?.accessToken || "";

    config.headers.Authorization = 'Bearer ' + bearer;

    return config;
  });


  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401 || error.response.status === 419) {
      context.resetUser();
    } else return Promise.reject(error);
  });

  const checkPermission = () => {
    // const userRole = context?.user?.role || null;
    // return context?.accessToken && (!rest.roles || roles.some(r => r === userRole.name));
    return context?.hasRole(['System Administrator', 'Administrator']);
  }

  return (
    <Route {...rest}
      render={(props) => checkPermission() ?
        (
          <div className="wrapper">
            <Navbar/>
            <Menu/>
            <div className="content-wrapper">
              <Component {...props} />
            </div>
          </div>
        ) : 
        <Redirect to='/' />
      }/>
  )
}
