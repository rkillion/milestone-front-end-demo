import { useNavigate } from "react-router";
import styled from "styled-components";
import InnovareIcon from "../icons/InnovareIcon";

export default function MainInnovareIconArea() {
    const navigate = useNavigate();
    
    return (
        <MainInnovareIconAreaDiv 
        onClick={()=>navigate("/")}
        >
            <InnovareIcon style={{padding: "10px"}}/>
        </MainInnovareIconAreaDiv>
    )
}

const MainInnovareIconAreaDiv = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    cursor: pointer
`