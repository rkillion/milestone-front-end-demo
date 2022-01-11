import { ContentPage, PageSection, ParagraphMedium } from "../../styleExports";
import { MilestoneCard } from "./MilestoneCard";

export default function MilestonesPage({ assignments, milestones, user, setMilestones, allUsers }) {
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
                {milestones.map(milestone=><MilestoneCard key={milestone.id} assignments={assignments} milestone={milestone} allUsers={allUsers} user={user} milestones={milestones} setMilestones={setMilestones}/>)}
            </PageSection>
        </ContentPage>
    )
}