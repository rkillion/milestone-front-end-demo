import { ContentPage, PageSection, ParagraphMedium } from "../../styleExports";
import { MilestoneCard } from "./MilestoneCard";

export default function MilestonesPage({ milestones, user, setMilestones }) {
    if (milestones.length<=0) {
        return (
            <ContentPage>
                <PageSection>
                    <ParagraphMedium>You currently have no milestones.</ParagraphMedium>
                </PageSection>
            </ContentPage>
        )
    }
    return (
        <ContentPage>
            <PageSection>
                {milestones.map(milestone=><MilestoneCard key={milestone.id} milestone={milestone} user={user} milestones={milestones} setMilestones={setMilestones}/>)}
            </PageSection>
        </ContentPage>
    )
}