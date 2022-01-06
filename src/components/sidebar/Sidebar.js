import styled from "styled-components";
import MainInnovareIconArea from "./MainInnovareIconArea";
import Navlink from "./Navlink";

export default function Sidebar() {
    return (
        <SidebarDiv>
            <MainInnovareIconArea />
            <NavLinksArea>
                <Navlink />
            </NavLinksArea>
        </SidebarDiv>
    )
}

const SidebarDiv = styled.div`
    grid-area: sidebar;
    height: 100%;
    background: #005684;
    display: flex;
    flex-flow: column nowrap;
`
const NavLinksArea = styled.div`
    display: flex;
    flex-flow: column nowrap;
`