import styled from "styled-components";
import { HFourBold, themeColors, Typography } from "../../styleExports";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Banner({ user }) {
    return (
        <BannerDiv>
            <HFourBold>{user.institution.name}</HFourBold>
            <UserLinksArea>
                <StyledBadge 
                    badgeContent={user.notifications} 
                    overlap="circular"
                >
                    <NotificationsNoneIcon />
                </StyledBadge>
                <Typography 
                    style={{
                        padding: 20,
                        color: themeColors.primaryLuckyPoint
                    }}
                >{user.name}</Typography>
                <Avatar 
                    alt={user.name}
                    src={require("../icons/Bitmap.png")}
                    sx={{
                        backgroundColor: themeColors.secondaryGrey
                    }}
                />
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
    height: 100%;
    padding-right: 10px;
    color: ${themeColors.secondaryGrey}
`

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      color: "#FFFFFF",
      backgroundColor: "#005684"
    },
  }));