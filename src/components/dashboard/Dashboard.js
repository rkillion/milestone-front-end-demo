import styled from "styled-components";
import { FlexRow, InternalLink, PageSection, ParagraphMedium, SubheadingMedium, tableStyles, themeColors, Typography } from "../../styleExports";
import MilestoneCarousel from "./MilestoneCarousel";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Dashboard({ milestones }) {
    return (
        <DashboardPage>
            <PageSection
                style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    alignItems: "stretch"
                }}
            >
                <MilestonesCarouselLabel>
                    <SubheadingMedium>Milestones</SubheadingMedium>
                    <ParagraphMedium><InternalLink>View All</InternalLink></ParagraphMedium>
                </MilestonesCarouselLabel>
                {milestones.length<=0 ? <MilestonesCarouselLabel style={{flexGrow: 2,borderRight: "0px"}}><Typography>You Currently have no milestones.</Typography></MilestonesCarouselLabel> : <MilestoneCarousel milestones={milestones}/>}
                <FlexRow style={{
                    alignItems: "center"
                }}>
                    <AddCircleIcon fontSize="large" sx={{
                        marginLeft: "20px",
                        padding: 0,
                        color: themeColors.primaryDarkCyan,
                        cursor: "pointer",
                        borderRadius: "25px",
                        '&:hover': {
                            // boxShadow: "2px 2px 5px black",
                            color: themeColors.secondaryDarkCerulean,
                            transition: ".5s"
                        }
                    }}/>
                </FlexRow>
            </PageSection>
        </DashboardPage>
    )
}

const DashboardPage = styled.div`
    
`

const MilestonesCarouselLabel = styled.div`
    padding: 20px;
    border: ${tableStyles.border};
    flexGrow: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
`