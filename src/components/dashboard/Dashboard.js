import styled from "styled-components";
import { InternalLink, PageSection, ParagraphMedium, SubheadingMedium, tableStyles } from "../../styleExports";
import MilestoneCarousel from "./MilestoneCarousel";

export default function Dashboard() {
    return (
        <DashboardPage>
            <PageSection
                style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    border: tableStyles.border
                }}
            >
                <MilestonesCarouselLabel>
                    <SubheadingMedium>Milestones</SubheadingMedium>
                    <ParagraphMedium><InternalLink>View All</InternalLink></ParagraphMedium>
                </MilestonesCarouselLabel>
                <MilestoneCarousel />
            </PageSection>
        </DashboardPage>
    )
}

const DashboardPage = styled.div`
    
`

const MilestonesCarouselLabel = styled.div`
    padding: 20px;
    border-right: ${tableStyles.border};
    flexGrow: 1;
    display: flex;
    flex-flow: column nowrap;
`