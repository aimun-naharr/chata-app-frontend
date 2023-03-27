import React, { useState } from "react";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";


const Contacts = ({ currentUser, contacts, changeChat }) => {
	const [selectedContact, setSelectedContact] = useState({});
	const handleChangeChat = (i, contact) => {
		setSelectedContact(i);
		changeChat(contact);
	};
	return (
		<Container>
			<div className="wrapper">
				{/* profile container */}
				<div className="profile-container">
					<div className="profile-container-image">
						<img src={`data:image/svg+xml;base64,${currentUser?.user.avatar}`} alt="avatar" />
						<div>
							<h3>{currentUser?.user.userName}</h3>
							<p>{currentUser?.user.email}</p>
						</div>
					</div>
					<FiLogOut size={25} color={"#0B61EE"} style={{ cursor: "pointer" }} />
				</div>
				<div className="search-container">
					<div>
						<BiSearchAlt color="#084BB8" />
						<input placeholder="Search by name" />
					</div>
				</div>
				{/* contacts */}
				<div className="contacts">
					{contacts?.map((contact, i) => (
						<div key={contact._id} className={`contact-container ${selectedContact === i ? "selected" : ""}`} onClick={() => handleChangeChat(i, contact)}>
							<img src={`data:image/svg+xml;base64,${contact.avatar}`} alt={contact.userName} />
							<div>
							<h5>{contact.userName}</h5>
							<p>Lorem ipsum dolor sit amet consectetur adip</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Container>
	);
};

export default Contacts;

const Container = styled.div`
	height: 100vh;
	border-right: 2px solid var(--border-color);

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: justify-between;
		height: 100vh;
		padding: 10px 20px;
		.logo {
			display: flex;
			padding: 10px;
			align-items: center;
			// background: #DFECF5;
			// box-shadow: rgba(100, 90, 111, 0.2) 0px 7px 29px 0px;
			img {
				height: 40px;
			}
			h3 {
				padding-left: 10px;
				color: var(--heading-color);
			}
		}
		.contacts {
			flex-grow: 1;
			overflow: auto;
			// background-color: #C9E8F8;
			display: flex;
			flex-direction: column;
			gap: 10px;
			// padding:  10px;
			.contact-container {
				transition: 0.5s ease-out;
				display: flex;
				align-items: center;
				gap: 10px;
				// background: #ABD7ED;
				padding: 10px;
				border-radius: 5px;
				cursor: pointer;
				img {
					height: 40px;
				}
				div{
					h5 {
						text-transform: uppercase;
						color: var(--heading-color)
					}
					p{
						font-size: 12px;
						color: var(--text-color);
					}
				}
			}
			.selected {
				background-color: whitesmoke;
			}
		}
		.search-container {
			div {
				display: flex;
				align-items: center;
				border: 2px solid var(--border-color);
				padding: 10px;
				margin: 20px 0;
				border-radius: 10px;
				background: white;
				input {
					border: none;
					outline: none;
					background: transparent;
					padding: 0 10px;

				}
			}
		}
		.profile-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 5px;

			.profile-container-image {
				display: flex;
				align-items: center;
				img {
					height: 40px;
				}
				div {
					padding-left: 10px;
					h3 {
						color: var(--heading-color);
						font-size: 16px;
					}
					p {
						font-size: 12px;
						color: var(--text-color);
					}
				}
			}
		}
	}
`;
