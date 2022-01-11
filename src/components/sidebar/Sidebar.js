import styled from "styled-components";
import { themeColors } from "../../styleExports";
import MainInnovareIconArea from "./MainInnovareIconArea";
import Navlink from "./Navlink";

export default function Sidebar() {

    return (
        <SidebarDiv>
            <MainInnovareIconArea />
            <NavLinksArea>
                <Navlink title="Dashboard" destination="/"/>
                <Navlink title="Milestones" destination="/milestones"/>
            </NavLinksArea>
        </SidebarDiv>
    )
}

const SidebarDiv = styled.div`
    grid-area: sidebar;
    height: 100%;
    background: ${themeColors.secondaryDarkCerulean};
    display: flex;
    flex-flow: column nowrap;
`
const NavLinksArea = styled.div`
    display: flex;
    flex-flow: column nowrap;
`