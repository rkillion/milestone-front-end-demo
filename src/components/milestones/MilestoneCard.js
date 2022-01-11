import { CalendarDateDisplay, FlexRow, tableStyles, SubheadingMedium, ParagraphMedium, FlexColumn, themeColors, dateLongFormat, CaptionMedium, CaptionLink } from "../../styleExports";
import ErrorIcon from '@mui/icons-material/Error';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditMilestoneDialogue from "../form-dialogues/EditMilestoneDialogue";
import { useState } from "react";
import DeleteMilestoneDialogue from "../form-dialogues/DeleteMilestoneDialogue";
import AssignMilestoneDialogue from "../form-dialogues/AssignMilestoneDialogue";


export function MilestoneCard({ assignments, milestone, allUsers, user, milestones, setMilestones }) {
    const [openAssignDialogue,setOpenAssignDialogue] = useState(false);
    const [openEditDialogue,setOpenEditDialogue] = useState(false);
    const [openDeleteDialogue,setOpenDeleteDialogue] = useState(false);

    const handleAssignOpen = () => {
        setOpenAssignDialogue(true);
      };
    
    const handleAssignClose = () => {
        setOpenAssignDialogue(false);
    };

    const handleEditOpen = () => {
        setOpenEditDialogue(true);
      };
    
    const handleEditClose = () => {
        setOpenEditDialogue(false);
    };

    const handleDeleteOpen = () => {
        setOpenDeleteDialogue(true);
      };
    
    const handleDeleteClose = () => {
        setOpenDeleteDialogue(false);
    };
    
    return (
        <div style={{
            width: "95%",
            margin: "10px 0px 10px 0px",
            padding: "10px",
            display: "grid",
            gridTemplateColumns: "[calGraphic] 60px [title] 250px [assignment] auto [notifications] auto [buttons] 100px",
            border: tableStyles.border,
            borderRadius: "4px"
        }}>
            <FlexRow style={{gridColumn: "calGraphic"}}>
                <CalendarDateDisplay date={milestone.date}/>
            </FlexRow>
            <FlexColumn style={{
                gridColumn: "title"
            }}>
                <SubheadingMedium>{milestone.title}</SubheadingMedium>
                <ParagraphMedium style={{color: themeColors.secondaryGrey}}>{dateLongFormat(milestone.date)}</ParagraphMedium>
            </FlexColumn>
            <FlexColumn style={{
                gridColumn: "assignment",
                justifyContent: "center"
                }}>
                <CaptionMedium>{milestone.assignees[0]&&milestone.assignees[0].name}</CaptionMedium>
                <CaptionLink onClick={handleAssignOpen}>{milestone.assignees[0] ? "Reassign" : "Assign"}</CaptionLink>
            </FlexColumn>
            <FlexRow style={{
                gridColumn: "notifications",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {milestone.action_required ? <>
                    <ErrorIcon fontSize="small" style={{
                        color: themeColors.alertsBittersweet
                    }}/> 
                    <ParagraphMedium style={{
                        color: themeColors.alertsBittersweet,
                        fontSize: "14px",
                        padding: "2px"
                    }}>
                        Action Required
                    </ParagraphMedium>
                </> : null}
            </FlexRow>
            <FlexRow style={{
                gridColumn: "buttons",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <EditIcon onClick={handleEditOpen} sx={{
                    color: themeColors.primaryDarkCyan,
                    padding: "8px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    '&:hover': {
                        color: themeColors.secondaryDarkCerulean,
                        transition: ".5s"
                    }
                }}/>
                <DeleteIcon onClick={handleDeleteOpen} sx={{
                    color: themeColors.primaryDarkCyan,
                    padding: "8px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    '&:hover': {
                        color: themeColors.secondaryDarkCerulean,
                        transition: ".5s"
                    }
                }}/>
            </FlexRow>
            <AssignMilestoneDialogue
                assignments={assignments}
                allUsers={allUsers} 
                milestone={milestone}
                setMilestones={setMilestones}
                milestones={milestones}
                open={openAssignDialogue}
                handleClickOpen={handleAssignOpen}
                handleClose={handleAssignClose}
            />
            <EditMilestoneDialogue 
                milestone={milestone}
                setMilestones={setMilestones}
                milestones={milestones}
                open={openEditDialogue}
                handleClickOpen={handleEditOpen}
                handleClose={handleEditClose}
            />
            <DeleteMilestoneDialogue 
                milestone={milestone}
                setMilestones={setMilestones}
                milestones={milestones}
                open={openDeleteDialogue}
                handleClickOpen={handleDeleteOpen}
                handleClose={handleDeleteClose}
            />
        </div>
    )
}