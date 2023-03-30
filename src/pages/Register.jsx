import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import axios from "axios";
import { registerUrl } from "../utils/ApiRoutes";
import LoadingComponent from "../components/LoadingComponent";
import FormContainer from "./style/auth";

const Register = () => {
	const [values, setValues] = useState({
		userName: "",
		email: "",
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
		const { userName, password, email } = values;
		if (!userName || !password || !email) return;
        setLoading(true)
        axios.post(registerUrl, { userName, password, email })
        .then(response => {
           if(response.data){
            localStorage.setItem('chat-app-user', JSON.stringify(response.data))
           
            navigate('/setAvatar')
           }
            setLoading(false);
          })
          .catch(error => {
        
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

				<input type="email" name="email" placeholder="Your email" onChange={(e) => handleChange(e)} required />

				<input type="password" name="password" placeholder="Your password" onChange={(e) => handleChange(e)} required />

				<p>
					Already Registered? <Link to="/login">Please Sign in</Link>
				</p>
				<button type="submit">Sign Up</button>
			</form>
		</FormContainer>
	);
};

export default Register;


