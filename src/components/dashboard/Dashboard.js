import styled from "styled-components";
import { ContentPage, FlexRow, InternalLink, PageSection, ParagraphMedium, SubheadingMedium, tableStyles, themeColors, Typography } from "../../styleExports";
import MilestoneCarousel from "./MilestoneCarousel";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NewMilestoneDialogue from "../form-dialogues/NewMilestoneDialogue";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Dashboard({ milestones, user, setMilestones }) {
    const [newMilestoneDialogueOpen, setNewMilestoneDialogueOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setNewMilestoneDialogueOpen(true);
    };

    const handleClose = () => {
        setNewMilestoneDialogueOpen(false);
    };

    return (
        <ContentPage>
            <PageSection
                style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    justifyContent: "flex-start",
                    alignItems: "stretch"
                }}
            >
                <MilestonesCarouselLabel>
                    <SubheadingMedium>Milestones</SubheadingMedium>
                    <ParagraphMedium>
                        <InternalLink 
                        onClick={()=>navigate("/milestones")}
                        >View All</InternalLink>
                    </ParagraphMedium>
                </MilestonesCarouselLabel>
                {milestones.length<=0 ? <MilestonesCarouselLabel style={{
                    flexGrow: 2,
                    // borderRight: "0px"
                    }}>
                    <Typography>You currently have no milestones.</Typography>
                    </MilestonesCarouselLabel> : <MilestoneCarousel milestones={milestones}/>}
                <FlexRow style={{
                    alignItems: "center"
                }}>
                    <AddCircleIcon onClick={handleClickOpen} fontSize="large" sx={{
                        marginLeft: "20px",
                        padding: 0,
                        color: themeColors.primaryDarkCyan,
                        cursor: "pointer",
                        borderRadius: "25px",
                        '&:hover': {
                            color: themeColors.secondaryDarkCerulean,
                            transition: ".5s"
                        }
                    }}/>
                </FlexRow>
            </PageSection>
            <NewMilestoneDialogue open={newMilestoneDialogueOpen} handleClose={handleClose} user={user} setMilestones={setMilestones} milestones={milestones}/>
        </ContentPage>
    )
}

const MilestonesCarouselLabel = styled.div`
    padding: 20px;
    border: ${tableStyles.border};
    flexGrow: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
`