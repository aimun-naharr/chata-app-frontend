import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillEmojiLaughingFill, BsFillSendFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { getAllMessage, sendMessage } from "../utils/ApiRoutes";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
	const [msg, setMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const [chatMessages, setChatMessages] = useState([]);
	const [emojiPicker, setEmojiPicker] = useState(false);
	const [receivedMsg, setReceivedMsg] = useState({});

	useEffect(() => {
		const getAllChatMsgs = async () => {
			console.log(currentUser.user._id, currentChat._id);
			const data = await axios.post(getAllMessage, {
				from: currentUser.user._id,
				to: currentChat._id,
			});
			console.log(data.data);
			setChatMessages(data?.data);
		};
		getAllChatMsgs();
	}, [currentChat]);
	const handleEmojiPicker = (event, emoji) => {
		let message = msg;
		message += event.emoji;
		setMsg(message);
	};
	const handleSendMsg = async () => {
		if (!msg) return;
		setLoading(true);
		const data = await axios.post(sendMessage, {
			from: currentUser.user._id,
			to: currentChat._id,
			message: msg,
		});
		socket.emit("send-msg", {
			from: currentUser.user._id,
			to: currentChat._id,
			message: msg,
		});
		const msgs = [...chatMessages];
		msgs.push({ fromSelf: true, message: msg });
		setChatMessages(msgs);
		setLoading(false);
		setMsg("");
		setEmojiPicker(false);
	};

	useEffect(() => {
		if (socket) {
			socket.on("rcv-msg", (msg) => {
				setReceivedMsg({ fromSelf: msg, message: msg });
			});
		}
	});
	useEffect(() => {
		receivedMsg && setChatMessages((prev) => [...prev, receivedMsg]);
	}, [receivedMsg]);
	return (
		<Container>
			{/* chat header */}
			<div className="chat-header">
				<div className="avatar">
					<img src={`data:image/svg+xml;base64,${currentChat?.avatar}`} alt="avatar" />
				</div>
				<h5>{currentChat.userName}</h5>
			</div>
			{/* chat messages to display */}
			<div className="chat-messages">
				{chatMessages.map((message) => (
					<div className={` message ${message.fromSelf ? "send-message" : "receive-message"}`}>{message.message}</div>
				))}
			</div>
			{/* chat messages to send */}
			<div className="chat-input">
				<div className="chat-input-left-section">
					{emojiPicker && (
						<div className="emoji-picker-react">
							<EmojiPicker size={50} className="emoji-picker" height={500} width={400} onEmojiClick={handleEmojiPicker} />
						</div>
					)}
					<IconContext.Provider value={{ color: "#146b97", className: "icon-button", size: 25 }}>
						<div onClick={() => setEmojiPicker((prev) => !prev)}>
							<BsFillEmojiLaughingFill />
						</div>
					</IconContext.Provider>
					<input type="text" value={msg} placeholder="Write a message..." onChange={(e) => setMsg(e.target.value)} />
				</div>
				<button onClick={handleSendMsg}>
					{/* <IconContext.Provider value={{ color: "#146b97", className: "icon-button", size: 30 }}>
						<div>
							<BsFillSendFill />
						</div>
					</IconContext.Provider> */}
					{loading ? "Sending..." : "Send"}
				</button>
			</div>
		</Container>
	);
};

export default ChatContainer;

const Container = styled.div`
	height: 100vh;
	background: #f0f9fd;
	display: flex;
	flex-direction: column;
	.chat-header {
		display: flex;
		align-items: center;
		padding: 10px;
		background: #006aff;
		color: #ffffff;
		margin-bottom: 20px;
		h5 {
			margin-left: 10px;
		}
		.avatar {
			img {
				height: 50px;
			}
		}
	}
	.chat-messages {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
		overflow: auto;
		padding: 10px;

		.message {
			width: fit-content;
			max-width: 40%;
			overflow-wrap: break-word;

			padding: 10px;
			border-radius: 10px;
		}
		.send-message {
			align-self: flex-end;
			background: #006aff;
			color: white;
		}
		.receive-message {
			justify-content: flex-start;
			background: white;
			color: black;
		}
	}
	.chat-input {
		// height: 80px;
		padding: 10px;
		background: #006aff;
		display: flex;
		gap: 10px;
		button {
			width: 80px;
			border-radius: 10px;
			border: none;
			cursor: pointer;
		}
		.chat-input-left-section {
			flex-grow: 1;
			display: flex;
			align-items: center;
			background: white;
			padding: 5px 10px;
			border-radius: 10px;
			position: relative;
			.emoji-picker-react {
				position: absolute;
				top: -520px;
			}
			.icon-button {
				cursor: pointer;
			}
			input {
				width: 100%;
				height: 60px;
				border: 0.5px solid transparent;
				outline: none;
				background: transparent;
				font-size: 18px;
				padding: 0px 12px;
			}
		}
	}
`;
