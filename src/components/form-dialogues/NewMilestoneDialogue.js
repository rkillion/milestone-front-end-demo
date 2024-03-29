import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { APIaddress } from '../../apiAddress';
import { FlexRow, HFiveMedium, InputField, InputLabel, ParagraphMedium, themeColors, Typography } from "../../styleExports"

export default function NewMilestoneDialogue({ open, handleClose, user, setMilestones, milestones }) {
    const [newMilestone,setNewMilestone] = useState({
        title: "",
        date: "",
        action_required: false,
        user_id: user.id
    })
    const [errors,setErrors] = useState({
        titleBlank: "",
        dateBlank: ""
    });
    const [submitDisabled,setSubmitDisabled] = useState(false);

    function validate(currentErrors,field,value) {
        let updatedErrors = Object.assign({},currentErrors);
        switch (field) {
            case "title" : 
                updatedErrors.titleBlank = value==="" ? "Title can not be blank." : "";
                break;
            case "date" :
                updatedErrors.dateBlank = value==="" ? "Date can not be blank." : "";
                break;
            default :
        }
        return updatedErrors;
    }

    function handleChange(e) {
        let changedMilestone = Object.assign({},newMilestone);
        changedMilestone[e.target.name] = e.target.name==="action_required" ? e.target.checked : e.target.value;
        let updatedErrors = validate(errors,e.target.name,e.target.value);
        let hasErrors = false;
        for (const key in updatedErrors) {
            if (updatedErrors[key]!=="") {
                hasErrors = true;
                break;
            }
        }
        setSubmitDisabled(hasErrors ? true : false);
        setErrors(updatedErrors);
        setNewMilestone(changedMilestone);
    }

    async function handleSubmit() {
        let updatedErrors = Object.assign({},errors);
        for (const field in newMilestone) {
            updatedErrors = validate(updatedErrors,field,newMilestone[field])
        }
        let hasErrors = false;
        for (const key in updatedErrors) {
            if (updatedErrors[key]!=="") {
                hasErrors = true;
                break;
            }
        }
        setSubmitDisabled(hasErrors ? true : false);
        setErrors(updatedErrors);
        if (!hasErrors) {
            let milestoneSubmission = Object.assign({},newMilestone);
            let dateArray = newMilestone.date.split("-");
            milestoneSubmission.date = new Date(dateArray[0],dateArray[1]-1,dateArray[2]);
            fetch(`${APIaddress}/milestones`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(milestoneSubmission)
            }).then(r=>r.json()).then(data=>{
                let newMilestoneArray = JSON.parse(JSON.stringify(milestones));
                newMilestoneArray.push(data);
                setMilestones(newMilestoneArray.map(milestone=>{
                    //this converts the UTCstring for date into a js date object
                    let updatedMilestone = Object.assign({},milestone);
                    updatedMilestone.date = new Date(milestone.date);
                    return updatedMilestone
                  }).sort((a,b)=>a.date-b.date))
                handleClose();
            })
        }
    }

    return (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{
                minWidth: "450px"
            }}>
                <HFiveMedium style={{color: themeColors.primaryDarkCyan}}>New Milestone</HFiveMedium>
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{
                  display: "flex",
                  flexFlow: "column nowrap"
              }}>
                  {Object.keys(errors).map(key=>errors[key]==="" ? null : <ParagraphMedium key={key} style={{color: themeColors.alertsBittersweet}}>{errors[key]}</ParagraphMedium>)}
              </DialogContentText>
              <FlexRow style={{
                  width: "90%",
                  margin: "10px 5% 10px 5%",
                  justifyContent: "space-between"
              }}>
                <InputLabel 
                    htmlFor="title"
                    style={{
                        width: "13%"
                    }}
                    >Title</InputLabel>
                <InputField 
                    type="text" 
                    name="title"
                    value={newMilestone.title}
                    onChange={handleChange}
                    style={{
                        width: "88%"
                    }}
                    ></InputField>
              </FlexRow>
              <FlexRow style={{
                  width: "90%",
                  margin: "10px 5% 10px 5%",
                  justifyContent: "space-between"
              }}>
                <InputLabel style={{
                        width: "13%"
                    }}
                    >Date</InputLabel>
                <FlexRow style={{
                  width: "88%",
                  justifyContent: "space-between"
                }}>
                    <InputField 
                        type="date"
                        name="date"
                        value={newMilestone.date}
                        onChange={handleChange}
                    ></InputField>
                    <div>
                        <InputLabel>Action Required?</InputLabel>
                        <InputField 
                            type="checkbox"
                            name="action_required"
                            checked={newMilestone.action_required}
                            onChange={handleChange}
                        ></InputField>
                    </div>
                </FlexRow>
              </FlexRow>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{
                  color: themeColors.primaryDarkCyan
              }}><Typography>Cancel</Typography></Button>
              <Button disabled={submitDisabled} onClick={handleSubmit} style={{
                  color: themeColors.primaryDarkCyan,
                  opacity: submitDisabled ? "30%" : "100%"
              }}><Typography>Submit</Typography></Button>
            </DialogActions>
          </Dialog>
      );
}