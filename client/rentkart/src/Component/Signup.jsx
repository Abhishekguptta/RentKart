import React, { useState } from "react";
import {useDispatch} from 'react-redux';

import { useSignUpUser } from "../hooks/useGetInfo";
import { SET_USER_DATA } from "../redux/action";
import '../styles/Signup.scss'

const Signup =({ setLogMode })=> {
  const dispatch = useDispatch();

  const [errorMessages, setErrorMessages] = useState('');
	const [values,setValue]=useState({name:"", email:"", password:""});

	const handleChange =(event, key)=> {
		setValue({...values, [key]: event.target.value})
	}

	const handleClick = async () => {
		try {
      const { data }=  await useSignUpUser(values);
      dispatch({type: SET_USER_DATA, payload: data})
      window.location.reload();
    } catch(error) {
      setErrorMessages(error.message);
    }
	}

	return (
		<div className="container">
			<div className="bodysignup">
				<h1 className="heading">  Create account</h1>
				<form className="form-wrapper">
					<div className="name-wrapper">
						<label className="label">Username</label>
						<input className="input" type='text' value={values.name} onChange={(event) => handleChange(event,"name")} placeholder="Your name"/>
					</div>
					<br/>
					<div className="email-wrapper">
						<label className="label">Email</label>
						<input className="input" type='email' onChange={(event) => handleChange(event,"email")} value={values.email } placeholder="your email"/>
					</div>
					<br/>
					<div className="password-wrapper">
						<label className="label">Password</label>
						<input className="input" type='password' value={values.password} onChange={(event) => handleChange(event,"password")} placeholder="must be min 8 char"/>
					</div>
					<div className="button-container" onClick={handleClick}>
						Submit 
					</div>
				</form>
			</div>
			{errorMessages ? <span className="login_error">{ errorMessages }</span> : null}
			<span>
				Already have an account? 
				<span className="cursor" onClick={() => setLogMode('login')}>
					{' '} Sign In
				</span> 
			</span>
		</div>
	)}
export default Signup 