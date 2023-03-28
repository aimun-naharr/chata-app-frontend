import React from 'react';
import styled from 'styled-components';

const Welcome = ({currentUser}) => {
    return (
        <Container>
           <div>
           <h4>Hello {currentUser?.user.userName}</h4>
           <p> Welcome to chat.. Please select a chat to start messaging</p>
           </div>
        </Container>
    );
};

export default Welcome;

const Container=styled.div`
display: grid;
place-items: center;
height: 100vh;
div{
    h4{
        color: var(--heading-color);
        font-size: 30px;
        text-transform: uppercase;
        text-align: center;
    }
    p{
        color: gray;
        font-weight: bold;
    }
}
`