import styled from "styled-components";

const FormContainer = styled.div`
	height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        width: 100px;
        margin-bottom: 20px;
    }
	h3 {
		text-align: center;
        text-transform: uppercase;
        font-family: 'Bitter', serif;
        margin; 100px 0;
	}
	form {
		display: flex;
        padding: 20px;
        max-width: 600px;
        min-width: 350px;
        margin: 0 auto;
		justify-content: center;
		flex-direction: column;
        gap: 20px;
       

	input{
        padding: 10px; 
        outline: none;
        border: 1px solid var(--bg-color);
        border-left:6px solid transparent;
        border-radius: 10px;
        &:focus{
            border-left:6px solid var(--heading-color);
        }
        .error{
            color: white;
            font-size: 13px;
            font-weight: bold;
        }
    }
    button{
        background: #006AFF;
        border: none;
        color: white;
        padding: 15px 0;
        border-radius: 10px;
        text-transform: uppercase;
        cursor: pointer;
    }
    p{
        font-size: 12px;
    }
    a{
        color: var(--heading-color);
    }
	}
`;


export default FormContainer;