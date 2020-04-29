import React, { useState, useEffect } from 'react';
import { Dialog, CircularProgress, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Container,Row, Col, Image } from 'react-bootstrap';
import a from './assets/1.png'
import b from './assets/2.png'
import c from './assets/3.png'


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

function CheckAvailibilityDialog(props) {
  const {dialog, handleClose, option} = props;
  const [loading, setLoading] = useState(true);
  const [port, setPort] = useState("");
 const [open, setOpen] = React.useState(false);
  const id = Math.floor(Math.random() * 100)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClosee = () => {
    setOpen(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])
const  handleFormChange = () => {


      console.log("sdkjfn")

   }
  return (
    <Dialog onClose={handleClose} open={dialog}>
      <DialogTitle style = {{backgroundColor:"#323232",color:"white"}}>Confirm Your Booking</DialogTitle>
      <DialogContent>
        {
          loading?
          <CircularProgress/>
          :
          <div>
            <Typography variant="body1">
              <h4>Choose Port:</h4>
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
            </Typography>
            <br/>
            
              <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Submit
              </Button>
              <Dialog onClose={handleClosee} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle  style = {{height:"60px"}} id="customized-dialog-title" onClose={handleClosee   }>
           
        </DialogTitle>
        <DialogContent dividers>
          <div>
      <h1>Booking Completed</h1>
      <p>Your unique Booking Id is : <p style = {{color:"red"}}>20WH{id}</p></p>
    </div>
        </DialogContent>
        <DialogActions>

          <Button autoFocus onClick={handleClosee} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
          </div>
        }
      </DialogContent>
    </Dialog>
  )
}

export default CheckAvailibilityDialog;