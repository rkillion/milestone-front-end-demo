import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { APIaddress } from '../../apiAddress';
import { FlexRow, HFiveMedium, InputField, InputLabel, ParagraphMedium, themeColors, Typography } from "../../styleExports"

export default function EditMilestoneDialogue({ open, milestone, handleClose, setMilestones, milestones }) {
    const initializeMilestone = () => {
        let thisMilestone = Object.assign({},milestone);
        let adjMonth = milestone.date.getMonth()+1
        thisMilestone.date = `${milestone.date.getFullYear()}-${adjMonth.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}-${milestone.date.getDate().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}`
        return thisMilestone;
    }
    const [milestoneUpdates,setMilestoneUpdates] = useState(initializeMilestone())
    const [errors,setErrors] = useState({
        titleBlank: "",
        dateBlank: ""
    });
    const [updateDisabled,setUpdateDisabled] = useState(false);

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
        let changedMilestone = Object.assign({},milestoneUpdates);
        changedMilestone[e.target.name] = e.target.name==="action_required" ? e.target.checked : e.target.value;
        let updatedErrors = validate(errors,e.target.name,e.target.value);
        let hasErrors = false;
        for (const key in updatedErrors) {
            if (updatedErrors[key]!=="") {
                hasErrors = true;
                break;
            }
        }
        setUpdateDisabled(hasErrors ? true : false);
        setErrors(updatedErrors);
        setMilestoneUpdates(changedMilestone);
    }

    async function handleSubmit() {
        let updatedErrors = Object.assign({},errors);
        for (const field in milestoneUpdates) {
            updatedErrors = validate(updatedErrors,field,milestoneUpdates[field])
        }
        let hasErrors = false;
        for (const key in updatedErrors) {
            if (updatedErrors[key]!=="") {
                hasErrors = true;
                break;
            }
        }
        setUpdateDisabled(hasErrors ? true : false);
        setErrors(updatedErrors);
        if (!hasErrors) {
            let milestoneSubmission = Object.assign({},milestoneUpdates);
            let dateArray = milestoneUpdates.date.split("-");
            milestoneSubmission.date = new Date(dateArray[0],dateArray[1]-1,dateArray[2]);
            fetch(`${APIaddress}/milestones/${milestone.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(milestoneSubmission)
            }).then(r=>r.json()).then(data=>{
                let newMilestoneArray = JSON.parse(JSON.stringify(milestones.filter(element=>element.id!==milestone.id)));
                newMilestoneArray.push(data);
                setMilestones(newMilestoneArray.map(m=>{
                    //this converts the UTCstring for date into a js date object
                    let updatedMilestone = Object.assign({},m);
                    updatedMilestone.date = new Date(m.date);
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
                <HFiveMedium style={{color: themeColors.primaryDarkCyan}}>{milestoneUpdates.title}</HFiveMedium>
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
                    value={milestoneUpdates.title}
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
                        value={milestoneUpdates.date}
                        onChange={handleChange}
                    ></InputField>
                    <div>
                        <InputLabel>Action Required?</InputLabel>
                        <InputField 
                            type="checkbox"
                            name="action_required"
                            checked={milestoneUpdates.action_required}
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
              <Button disabled={updateDisabled} onClick={handleSubmit} style={{
                  color: themeColors.primaryDarkCyan,
                  opacity: updateDisabled ? "30%" : "100%"
              }}><Typography>Update</Typography></Button>
            </DialogActions>
          </Dialog>
      );
}