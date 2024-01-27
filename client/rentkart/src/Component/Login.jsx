import React, { useCallback, useState } from "react";
import {  useDispatch } from 'react-redux';

import { useLoginInUser } from "../hooks/useGetInfo";
import { SET_USER_DATA } from "../redux/action";
import '../styles/_login.scss';

export default function Login({ setLogMode }) {
  const dispatch = useDispatch();
  const [errorMessages, setErrorMessages] = useState('');
  const [userVal, setUserVal] = useState({email: "", password: ""});

  const handleChange = (event, key) => {
    setUserVal({...userVal, [key]: event.target.value});
  }

  const handleSubmit = async () => {
    try {
      const { data } =  await useLoginInUser(userVal);
      dispatch({type: SET_USER_DATA, payload: data})
      window.location.reload();
    } catch(error) {
      setErrorMessages(error.message);
    }
  }
  
    return (
      <div className="Login">
        <div className="login-form">
          <div className="title">Sign In</div>
          <div className="form-container">
            <form className="form-box">
              <div className="input-container">
                <label>Email </label>
                <input 
                placeholder="Enter your email"
                value={userVal.email}
                onChange={(event) => handleChange(event, "email")} 
                type="text" 
                required />
              </div>
              <div className="input-container">
                <label>Password </label>
                <input 
                placeholder="Enter password"
                value={userVal.password}
                onChange={(event) => handleChange(event, "password")} 
                type="password" 
                required />
              </div>
              <div className="button-container" onClick={() => handleSubmit()}>
                Submit
              </div>
              {errorMessages ? <span className="login_error">{ errorMessages }</span> : null}
              <span 
                onClick={() => setLogMode('sign-up')} 
                className="cursor"
                style={{justify:'center', paddingTop: '1rem'}}
              >
                Create account
              </span>
            </form>
         </div>
        </div>
      </div>
    );
  }