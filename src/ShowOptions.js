import React from 'react';
import { sampleData } from './SampleData'
import { List, ListItem,Paper, Typography, Button, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
import { PersonOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';



function ShowOptions(props) {
  
  console.log( props.aboutprops)
  const renderData = sampleData.map(s => (
    <>
      <Link to={`/option/${s._id}`} style={{textDecoration: "none"}}>
        <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <PersonOutline />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
            primary={s.name}
            secondary={`₹ ${s.rate} per hour, ${s.distance} km away`} />
        </ListItem>
      </Link>
    </>
  ));
  return (
    <Paper elevation={4} style={{width:"30%",margin: "5% auto"}}>
      <h3 style = {{backgroundColor: "#323232",color:"white",width:"100%",paddingLeft:"38%",paddingTop:"2%",paddingBottom:"2%"}}>
                Nearby Stations
              </h3>
      {renderData}

    </Paper>
  )
};

export default ShowOptions;