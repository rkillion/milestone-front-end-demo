import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FlexRow, HFiveMedium, InputField, InputLabel, themeColors, Typography } from "../../styleExports"

export default function NewMilestoneDialogue({ open, handleClose }) {
    return (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{
                minWidth: "450px"
            }}>
                <HFiveMedium style={{color: themeColors.primaryDarkCyan}}>New Milestone</HFiveMedium>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                  {/* <ParagraphMedium>
                    Enter the information below to create a new milestone.
                    </ParagraphMedium> */}
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
                    <InputField type="date"></InputField>
                    <div><InputLabel>Action Required?</InputLabel><InputField type="checkbox"></InputField></div>
                </FlexRow>
              </FlexRow>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{
                  color: themeColors.primaryDarkCyan
              }}><Typography>Cancel</Typography></Button>
              <Button onClick={handleClose} style={{
                  color: themeColors.primaryDarkCyan
              }}><Typography>Submit</Typography></Button>
            </DialogActions>
          </Dialog>
      );
}