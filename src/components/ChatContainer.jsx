import React, { useState } from "react";
import styled from "styled-components";
import { BsFillEmojiLaughingFill, BsFillSendFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import EmojiPicker from "emoji-picker-react";

const ChatContainer = ({ currentChat }) => {
	const [msg, setMsg] = useState("");
	console.log(msg);
	const [emojiPicker, setEmojiPicker] = useState(false);
	const handleEmojiPicker = (event, emoji) => {
		let message = msg;
		message += event.emoji;
		setMsg(message);
	};
	return (
		<Container>
			<div className="chat-header">
				<div className="avatar">
					<img src={`data:image/svg+xml;base64,${currentChat?.avatar}`} alt="avatar" />
				</div>
				<h5>{currentChat.userName}</h5>
			</div>
			<div className="chat-messages"></div>
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
				<button>
					<IconContext.Provider value={{ color: "#146b97", className: "icon-button", size: 30 }}>
						<div>
							<BsFillSendFill />
						</div>
					</IconContext.Provider>
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
		background: #146b97;
		color: #ffffff;
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
	}
	.chat-input {
		// height: 80px;
		padding: 10px;
		background: #146b97;
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
			background: #dfecf5;
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
