import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { sampleData } from './SampleData';
import CheckAvailibilityDialog from './CheckAvailibilityDialog';
import GetRoute from "./GetRoute"
import { Container,Row, Col } from 'react-bootstrap';

function ShowOption(props) {
  const {id} = props.match.params;
  const [option, setOption] = useState({});
  const [dialog, setDialog] = useState(false);
  useEffect(() => {
    console.log({id});
    const response = sampleData.find(s => s._id === id);
    console.log({response})
    setOption(response);
  }, []);
  const handleDialogClose = () => {
    setDialog(false);
  }

  return (
    <Container>
      
      <div style = {{ marginLeft:"27%"}} >
        
          <Paper elevation={3} style={{width:"30%",marginTop: "55px"}}>
              <h3 style = {{backgroundColor: "#323232",color:"white",width:"100%",paddingLeft:"35%",paddingTop:"2%",paddingBottom:"2%"}}>
                Station Details
              </h3>
              
               <div style ={{padding:"1rem"}}> 
                <Typography style = {{paddingTop:"2%"}}variant="body1">
                  Station Name: {option.name}
                </Typography>
                <Typography style = {{paddingTop:"2%"}}variant="body1">
                  Contact Person: {option.ContactPerson}
                </Typography>

                <Typography style = {{paddingTop:"2%"}}variant="body1">
                  Contact No.: {option.ContactNo}
                </Typography>

                
                <Typography style = {{paddingTop:"2%",textDecoration:"underline"}}variant="body1">
                  Landmark
                </Typography>

                

                <Typography style = {{paddingTop:"2%"}}variant="body1">
                  City: {option.City}
                </Typography>

                <Typography style = {{paddingTop:"2%"}}variant="body1">
                  State: {option.State}
                </Typography>


                <Typography style = {{paddingTop:"2%"}}variant="body1">
                  Pincode: {option.Pincode}
                </Typography>

                <Typography style = {{paddingTop:"2%"}} variant="body1">
                  Timing: {option.Timing}
                </Typography>


                <Typography style = {{paddingTop:"2%"}} variant="body1">
                  Public/Private: {option.PublicPrivate}
                </Typography>
                <Typography style = {{paddingTop:"2%"}} variant="body1">
                  {`Hourly Rate: ₹ ${option.rate}`}
                </Typography>

                <Typography style = {{paddingTop:"2%"}} variant="body2">
                  Port Available: {option.PortAvailabe}
                </Typography>
                <br/>
                <Button variant="contained" style = {{paddingTop:"2%",backgroundColor:"#323232",marginLeft:"25%",color:"white"}}   onClick={() => setDialog(true)}>
                  Book Your Slot
                </Button>
                <CheckAvailibilityDialog dialog={dialog} option={option} handleClose={handleDialogClose} />
              
              </div>

                  
          </Paper>

          

        </div>
        

          <div style = {{marginTop:"-30.25%",marginLeft:"49%"}}>
            <GetRoute uid = {id} lat = {option.lat} log = {option.lng}/>  
          </div>
      
      </Container>

  )
}

export default ShowOption;