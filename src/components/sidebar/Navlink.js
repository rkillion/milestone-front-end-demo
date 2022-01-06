import styled from "styled-components";
import { themeColors, Typography } from "../../styleExports";

export default function Navlink() {
    return (
        <NavButton>
            <Typography>Dashboard</Typography>
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
        background: ${themeColors.primaryLuckyPoint}
    };
    color: #FFFFFF;
    cursor: pointer
`