import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { getAllUsersUrl } from "../utils/ApiRoutes";
import io from "socket.io-client";

const Chat = () => {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("chat-app-user"));
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [currentChat, setCurrentChat] = useState(null);
	const socket = io("http://localhost:8000");
	
	useEffect(() => {
		if (!localStorage.getItem("chat-app-user")) {
			navigate("/login");
		} else {
			setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
		}
	}, []);
	useEffect(()=>{
if(user){
	socket.emit('add-user', user.user._id)
}
	}, [user])
	useEffect(() => {
		const fetchAllUsers = async () => {
			if (currentUser && currentUser?.user?.isAvatarImageSet) {
				const data = await axios.get(`${getAllUsersUrl}/${currentUser.user._id}`);
				setContacts(data?.data);
			}
		};
		fetchAllUsers();
	}, [currentUser]);

	const handleChangeChat = (contact) => {
		setCurrentChat(contact);
	};
	return (
		<Container>
			<div className="container">
				<div className="contacts">
					<Contacts contacts={contacts} currentUser={user} changeChat={handleChangeChat}/>
				</div>
				<div className="chat">
					{
						currentChat ? <ChatContainer currentChat={currentChat} currentUser={user} socket={socket}/>: <Welcome currentUser={user}/>
					}
				</div>
			</div>
		</Container>
	);
};

export default Chat;

const Container = styled.div`
	height: 100vh;
	weight: 100vw;
	justify-content: center;
	background: #f9feff;
	
	.container {
		display: grid;
		grid-template-columns: 25% 75%;
	}
	@media screen and (max-width: 600px) {
		.container {
			display: flex;
			flex-direction: column;
		}
	}
`;
