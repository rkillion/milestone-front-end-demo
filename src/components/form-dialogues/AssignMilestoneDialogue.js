import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { APIaddress } from '../../apiAddress';
import { FlexRow, HFiveMedium, InputLabel, SelectField, themeColors, Typography } from "../../styleExports"

export default function AssignMilestoneDialogue({ assignments, open, milestone, allUsers, handleClose, setMilestones, milestones }) {
    const initializeAssignedUser = () => milestone.assignees[0] ? milestone.assignees[0] : {};
    const [assignedUser,setAssignedUser] = useState(initializeAssignedUser());

    function handleChange(e) {
        setAssignedUser(allUsers.find(u=>u.name===e.target.value));
    }

    function handleSubmit() {
        let existingAssignment = assignments.find(a=>a.milestone_id===milestone.id)
        function postAssignment() {
            if (!milestone.assignees[0]||(assignedUser.name!==milestone.assignees[0].name)) {
                fetch(`${APIaddress}/assignments`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: assignedUser.id||allUsers[0].id,
                        milestone_id: milestone.id
                    })
                }).then(r=>{
                    if (r.ok) {
                        window.location.reload();
                    }
                })
            } else {
                window.location.reload();
            }
        }
        if (existingAssignment) {
            fetch(`${APIaddress}/assignments/${existingAssignment.id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            }).then(r=>{
                if (r.ok) {
                    postAssignment()
                }
            })
        } else {
            postAssignment();
        }
    }

    return (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{
                minWidth: "450px"
            }}>
                <HFiveMedium style={{color: themeColors.primaryDarkCyan}}>{milestone.title}</HFiveMedium>
            </DialogTitle>
            <DialogContent>
              <FlexRow style={{
                  width: "90%",
                  margin: "10px 5% 10px 5%",
                  justifyContent: "space-between",
                  alignItems: "center"
              }}>
                <InputLabel 
                    htmlFor="assignment_select"
                    style={{
                        width: "25%"
                    }}
                    >{!milestone.assignees[0]||(assignedUser.name!==milestone.assignees[0].name) ? "Assign" : "Assigned"} to</InputLabel>
                <SelectField 
                    value={assignedUser.name}
                    onChange={handleChange}
                    name="assignment_select"
                    style={{
                        width: "73%"
                    }}
                >
                    {allUsers.map(u=><option key={u.id}>{u.name}</option>)}
                </SelectField>
              </FlexRow>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{
                  color: themeColors.primaryDarkCyan
              }}><Typography>Cancel</Typography></Button>
              <Button onClick={handleSubmit} style={{
                  color: !milestone.assignees[0]||(assignedUser.name!==milestone.assignees[0].name) ? themeColors.primaryDarkCyan : themeColors.alertsBittersweet
              }}><Typography>{!milestone.assignees[0]||(assignedUser.name!==milestone.assignees[0].name) ? "Assign" : "Remove"}</Typography></Button>
            </DialogActions>
          </Dialog>
      );
}