import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { getAllUsersUrl } from "../utils/ApiRoutes";

const Chat = () => {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("chat-app-user"));
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [currentChat, setCurrentChat] = useState(null);
	console.log(currentChat);
	useEffect(() => {
		if (!localStorage.getItem("chat-app-user")) {
			navigate("/login");
		} else {
			setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
		}
	}, []);
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
						currentChat ? <ChatContainer/>: <Welcome/>
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
