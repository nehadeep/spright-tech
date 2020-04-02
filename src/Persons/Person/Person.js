import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
width: 60%;
margin: 16px auto;
`;
const person = (props)=>{
    return(
       <StyledDiv>
        <p onClick={props.click}>Hello its {props.name} and I'm {props.age} years old!</p>
        <p>{props.children}</p>
       </StyledDiv>
    )
};

export default person