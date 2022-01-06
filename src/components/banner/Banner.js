import styled from "styled-components";
import { HFourBold } from "../../textStyles";
import Badge from '@mui/material/Badge';

export default function Banner({ user }) {
    return (
        <BannerDiv>
            <HFourBold>{user.institution.name}</HFourBold>
            <UserLinksArea>
                <Badge badgeContent={4} color="primary">
                    Hi
                </Badge>
            </UserLinksArea>
        </BannerDiv>
    )
}

const BannerDiv = styled.div`
    grid-area: banner;
    display: flex;
    flew-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 100%;
`

const UserLinksArea = styled.div`
    display: flex;
    flew-flow: row nowrap;
    align-items: center;
    height: 100%
`