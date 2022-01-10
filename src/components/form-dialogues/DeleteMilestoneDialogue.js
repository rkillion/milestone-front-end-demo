import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { APIaddress } from '../../apiAddress';
import { HFiveMedium, ParagraphMedium, themeColors, Typography } from "../../styleExports"

export default function DeleteMilestoneDialogue({ open, milestone, handleClose, setMilestones, milestones }) {
    function handleSubmit() {
        fetch(`${APIaddress}/milestones/${milestone.id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        }).then(r=>{
            if (r.ok) {
                let newMilestoneArray = JSON.parse(JSON.stringify(milestones.filter(element=>element.id!==milestone.id)));
                setMilestones(newMilestoneArray.map(m=>{
                    //this converts the UTCstring for date into a js date object
                    let updatedMilestone = Object.assign({},m);
                    updatedMilestone.date = new Date(m.date);
                    return updatedMilestone
                    }).sort((a,b)=>a.date-b.date))
                handleClose();
            }
        })
    }

    return (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{
                minWidth: "450px"
            }}>
                <HFiveMedium style={{color: themeColors.primaryDarkCyan}}>{milestone.title}</HFiveMedium>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                  <ParagraphMedium>Are you sure you want to delete this milestone?</ParagraphMedium>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{
                  color: themeColors.primaryDarkCyan
              }}><Typography>Cancel</Typography></Button>
              <Button onClick={handleSubmit} style={{
                  color: themeColors.alertsBittersweet
              }}><Typography>Delete</Typography></Button>
            </DialogActions>
          </Dialog>
      );
}