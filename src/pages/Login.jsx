import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import axios from "axios";
import { loginUrl, registerUrl } from "../utils/ApiRoutes";
import LoadingComponent from "../components/LoadingComponent";

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

const FormContainer = styled.div`
	height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        width: 100px;
        margin-bottom: 20px;
    }
	h3 {
		text-align: center;
        text-transform: uppercase;
        font-family: 'Bitter', serif;
        margin; 100px 0;
	}
	form {
		display: flex;
        padding: 20px;
        max-width: 600px;
        min-width: 350px;
        margin: 0 auto;
		justify-content: center;
		flex-direction: column;
        gap: 20px;
       

	input{
        padding: 10px; 
        outline: none;
        border: 1px solid var(--bg-color);
        border-left:6px solid transparent;
        border-radius: 10px;
        &:focus{
            border-left:6px solid var(--heading-color);
        }
        .error{
            color: white;
            font-size: 13px;
            font-weight: bold;
        }
    }
    button{
        background: #006AFF;
        border: none;
        color: white;
        padding: 15px 0;
        border-radius: 10px;
        text-transform: uppercase;
        cursor: pointer;
    }
    p{
        font-size: 12px;
    }
    a{
        color: var(--heading-color);
    }
	}
`;
