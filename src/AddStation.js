import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Container,Row, Col } from 'react-bootstrap';
import a from './assets/1.png'
import b from './assets/2.png'
import c from './assets/3.png'
import AddHomePage from "./AddHomePage"

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function StationDialog() {
  const [open, setOpen] = React.useState(true);

  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (open){
  return (
    <div style = {{width:"600px",height:"auto"}}>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle id="customized-dialog-title" style = {{backgroundColor:"#323232"}}onClose={handleClose}>
          Add Location
        </DialogTitle>
        <DialogContent dividers>
          
            <input style = {{width:"100%",height:"50px",border:"0 0 5px 0"}}type = "text" placeholder = " Location Name*"/>
            <input style = {{width:"100%",height:"50px"}}type = "text" placeholder = " Full Address*"/>
          
          <h3>Ports Avilable</h3>
          <Row style = {{width:"50%"}}>
                <Col>
                  <input type = "checkbox"/>
                
                
                  <img src = {a} style = {{width:"50%",height:"100%"}}/>
                </Col>
                <Col>
                  <input type = "checkbox"/>
                
                
                  <img src = {b} style = {{width:"50%",height:"100%"}}/>
                </Col>
                <Col>
                  <input type = "checkbox"/>
                
                
                  <img src = {c} style = {{width:"50%",height:"100%"}}/>
                </Col>


          </Row>
          <Row>
            <h4><input type= "checkbox"/> Open 24/7</h4>
          </Row>
          <input type = "text" placeholder = "hours"/>
          <input type = "text" placeholder = "Phone Number"/>
          <Row>
            <h2>Is this charging location open/active? </h2>
            <h4><input type= "checkbox"/> Yes</h4>
            <h4><input type= "checkbox"/> No, it's Under Construction or Coming Soon</h4>
           </Row>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>)}
    return(
      <AddHomePage />
      )
    
}
