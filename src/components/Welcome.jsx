import React from 'react';

const Welcome = ({currentUser}) => {
    return (
        <div>
            <h4>Hello {currentUser?.user.userName}</h4>
           <p> Welcome to chat.. Please select a chat to start messaging</p>
        </div>
    );
};

export default Welcome;