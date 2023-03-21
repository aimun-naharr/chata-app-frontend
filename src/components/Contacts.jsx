import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Contacts = ({ currentUser, contacts, changeChat }) => {
    const [selectedContact, setSelectedContact]=useState(undefined)

    const handleChangeChat=(i, contact)=>{
        setSelectedContact(i)
        changeChat(contact)
    }
	return (
		<Container>
			<div className="wrapper">
				{/* logo part */}
				<div className="logo">
					<img src={logo} alt="logo" />
					<h3>Chat</h3>
				</div>
				{/* contacts */}
				<div className="contacts">
                    {
                        contacts?.map((contact, i)=><div key={contact._id} className={`contact-container ${selectedContact === i? 'selected': ''}`} onClick={()=>handleChangeChat(i, contact)}>
                            <img src={`data:image/svg+xml;base64,${contact.avatar}`}  alt={contact.userName} />
                            <h5>{contact.userName}</h5>
                        </div>)
                    }
                </div>
				{/* profile container*/}
				<div className="profile-container">
					<div className="profile-container-image">
						<img src={`data:image/svg+xml;base64,${currentUser?.user.avatar}`} alt="avatar" />
						<div>
							<h5>{currentUser?.user.userName}</h5>
							<p>{currentUser?.user.email}</p>
						</div>
					</div>
					{/* sign-out button */}
				</div>
			</div>
		</Container>
	);
};

export default Contacts;

const Container = styled.div`
	height: 100vh;
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: justify-between;
		height: 100vh;
		.logo {
			display: flex;
			padding: 10px;
			align-items: center;
            background: #DFECF5;
            // box-shadow: rgba(100, 90, 111, 0.2) 0px 7px 29px 0px;
			img {
				height: 40px;
			}
			h3 {
				padding-left: 10px;
			}
		}
		.contacts {
			flex-grow: 1;
			overflow: auto;
            background-color: #C9E8F8;
            display: flex;
            flex-direction: column;
            gap: 10px;
            // padding:  10px;
            .contact-container{
                transition:  0.5s ease-out;
                display: flex;
                align-items: center;
                gap: 10px;
                background: #ABD7ED;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
                img{
                    height: 60px;
                }
                h5{
                    text-transform: uppercase;
                }
            }
            .selected{
                background-color: #94C3DA;
            }
		}
		.profile-container {
			display: flex;
			justify-content: space-between;
            border-radius: 5px;
            box-shadow: rgba(100, 90, 111, 0.2) 0px 7px 29px 0px;
            background: #DFECF5;
			padding: 10px;
			.profile-container-image {
				display: flex;
				align-items: center;
				img {
					height: 60px;
				}
				div {
					padding-left: 10px;
				}
			}
		}
	}
`;
