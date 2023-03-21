import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import LoadingComponent from "../components/LoadingComponent";
import { setAvatarUrl } from "../utils/ApiRoutes";

const SetAvatar = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(0);
	const [avatars, setAvatars] = useState([]);
	const navigate = useNavigate();
	const api = "https://api.multiavatar.com//45678945";
	useEffect(() => {
		if (!localStorage.getItem("chat-app-user")) {
			navigate("/");
		}
	}, []);
	useEffect(() => {
		const fetchImage = async () => {
			const data = [];
			for (let i = 0; i < 4; i++) {
				const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
				// setIsLoading(true)
				const buffer = new Buffer(image?.data);
				data.push(buffer.toString("base64"));
			}
			setAvatars(data);
			setIsLoading(false);
		};
		fetchImage();
	}, []);

	const setProfilePicture = async () => {
		const user = await JSON.parse(localStorage.getItem("chat-app-user"));
		setIsLoading(true)
		const { data } = await axios.patch(`${setAvatarUrl}/${user.user._id}`, {
			image: avatars[selectedAvatar],
		});
		setIsLoading(false)
		console.log(data);
		if (data.isSet) {
			user.user.isAvatarImageSet = true;
			user.user.avatarImage = data.image;
			navigate("/chat");
		}
	};
	if (isLoading) return <LoadingComponent />;
	return (
		<Container>
			<div className="title">
				<h3>Pick an avatar to set as profile picture</h3>
			</div>
			<div className="avatars">
				{avatars?.map((avatar, index) => {
					return (
						<div className={`avatar ${selectedAvatar === index ? "select" : ""} `} key={index}>
							<img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
						</div>
					);
				})}
			</div>
			<button onClick={setProfilePicture}>Set as profile picture</button>
		</Container>
	);
};

export default SetAvatar;

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 2rem;
align-items: center;
justify-content: center;
height: 100vh;
.title{
	// text-transform: uppercase;
}
.avatars{
	display: flex;
	gap: 2rem;

	.avatar{
		border: 0.4rem solid transparent;
		padding: 0.5rem;
		cursor: pointer;
		border-radius: 50%;
		transition:  0.5s ease-out;
		height: 70px;
		width: 70px;
		display: flex;
		align-items: center;
		
		img{
			height: 70px;
		}
		&:hover{
			background: lightgray;
		}
			
		}
		.select{
			border: 0.4rem solid #006AFF;
		}
}
button{
	background: #006AFF;
	border: none;
	color: white;
	padding: 15px 10px;
	border-radius: 10px;
	// text-transform: uppercase;
	cursor: pointer;
}

	
}

`;
