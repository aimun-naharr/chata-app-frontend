import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import axios from "axios";
import { loginUrl, registerUrl } from "../utils/ApiRoutes";
import LoadingComponent from "../components/LoadingComponent";
import FormContainer from "./style/auth";

const Login = () => {
	const [values, setValues] = useState({
		userName: "",
		password: "",
	});
    const navigate=useNavigate()
    const [loading, setLoading]=useState(false)
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
        navigate('/chat')
    }
}, [])
	const handleSubmit =  (e) => {
		e.preventDefault();
		const { userName, password, } = values;
		if (!userName || !password ) return;
        setLoading(true)
        axios.post(loginUrl, { userName, password })
        .then(response => {
           if(response.data){
            console.log(response.data)
            localStorage.setItem('chat-app-user', JSON.stringify(response.data))
           
            navigate('/chat')
           }
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          });
	};
    if(loading) return <LoadingComponent/>
	return (
		<FormContainer>
			<img src={logo} alt="" />
			<h3>Register to Chat</h3>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="text" name="userName" placeholder="Username" onChange={(e) => handleChange(e)} required />


				<input type="password" name="password" placeholder="Your password" onChange={(e) => handleChange(e)} required />

				<p>
					New to Chat? <Link to="/">Please Sign up</Link>
				</p>
				<button type="submit">login</button>
			</form>
		</FormContainer>
	);
};

export default Login;


