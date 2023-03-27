import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillEmojiLaughingFill, BsTelephoneFill , BsCameraVideoFill, BsThreeDotsVertical, BsFillSendFill} from "react-icons/bs";
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
			const data = await axios.post(getAllMessage, {
				from: currentUser.user._id,
				to: currentChat._id,
			});
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
				setReceivedMsg({ fromSelf: false, message: msg });
				
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
				<div className="chat-header-left-section">
				<div className="avatar">
					<img src={`data:image/svg+xml;base64,${currentChat?.avatar}`} alt="avatar" />
				</div>
				<div>
				<h5>{currentChat.userName}</h5>
				<p>{currentChat.email}</p>
				</div>
				</div>
<div>
	<div className="call-icons">
	<BsTelephoneFill color="#333" style={{cursor: 'pointer', fontSize: '20px'}}/>
	<BsCameraVideoFill color="#333" style={{cursor: 'pointer', fontSize: '20px'}}/>
	<BsThreeDotsVertical color="#333" style={{cursor: 'pointer', fontSize: '20px'}}/>
	</div>
</div>
			</div>
			{/* chat messages to display */}
			<div className="chat-messages">
				{chatMessages.map((message) => (
					<div key={message._id} className={` message ${message.fromSelf ? "send-message" : "receive-message"}`}>{message.message}</div>
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
					{loading ? "Sending..." : <BsFillSendFill/>}
					
				</button>
			</div>
		</Container>
	);
};

export default ChatContainer;

const Container = styled.div`
	height: 100vh;
	background: #f9feff;
	display: flex;
	flex-direction: column;
	
	.chat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px solid var(--border-color);
		padding: 5px 20px;
		.call-icons{
			display: flex;
			gap: 20px;
			align-items: center;
			}
		.chat-header-left-section{
			display: flex;
			align-items: center;
			gap: 10px;
			margin-bottom: 20px;
			div{
				p{
					font-size: 14px;
					color: gray;
				}
				h5 {
					color: var(--text-color);
					font-size: 16px;
					font-weight: unset;
				}
			}
			.avatar {
				img {
					height: 50px;
				}
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
		padding: 10px;
		border-top: 2px solid var(--border-color);
		display: flex;
		background: white;
		gap: 10px;
		button {
			width: 80px;
			border-radius: 10px;
			border: none;
			cursor: pointer;
			background: transparent;
			color: var(--heading-color);
			font-size: 20px;
		}
		.chat-input-left-section {
			flex-grow: 1;
			display: flex;
			align-items: center;
			background: white;
			border-right: 1px solid var(--border-color);
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

// To firstly identify that a message was seen, IntersectionObserver is an inbuilt API that detects when an element has entered the viewport, meaning that it is visible, therefore; obviously seen. I have added comments in the code below where you should add a function to call to the server that the message was seen, however, that's up to you to implement.

// const observer = new window.IntersectionObserver(([entry]) => {
//   if (entry.isIntersecting) {
//     // Send a message to the server that the user has viewed the message.
//     // Eg. socket.emit('read-message', message.id)
//     return
//   }
// }, {
//   root: null,
//   threshold: 0.1,
// })
// observer.observe(document.getElementById(message.id));