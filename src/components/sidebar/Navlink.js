import styled from "styled-components";
import { themeColors, Typography } from "../../styleExports";
import { useNavigate } from 'react-router';

export default function Navlink({title,destination}) {
    const navigate = useNavigate();

    return (
        <NavButton onClick={()=>navigate(destination)} style={{
            color: `${window.location.pathname===destination ? themeColors.primaryDarkCyan : "#FFFFFF"}`
        }}>
            <Typography>{title}</Typography>
        </NavButton>
    )
}

const NavButton = styled.button`
    height: 70px;
    width: 100%;
    margin: 0px;
    padding: 0px;
    background: ${themeColors.secondaryDarkCerulean};
    border: 0px;
    &:hover {
        background: ${themeColors.primaryLuckyPoint};
        transition: .5s
    };
    color: #FFFFFF;
    cursor: pointer
`