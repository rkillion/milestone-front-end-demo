import styled from "styled-components";

export default function Navlink() {
    return (
        <NavButton>
            Dashboard
        </NavButton>
    )
}

const NavButton = styled.button`
    height: 70px;
    width: 100%;
    margin: 0px;
    padding: 0px;
    background: #005684;
    border: 0px;
    &:hover {
        background: #1D2951
    };
    font-family: Quicksand;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 120%;
    color: #FFFFFF;
`

const NavButtonText = styled.span`
    
`