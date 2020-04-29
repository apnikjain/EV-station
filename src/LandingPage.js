import React from "react"
import { Button } from '@material-ui/core';
import logo from "./assets/logooo.png"
import './MapApp.css';
import { Container,Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';



function LandingPage(){
	return(

		<div className = "bg">
			<img style = {{width:"65%",height:"auto",marginLeft:"17.5%"}} src = {logo}/>
			<Row>
				<Button variant="contained" style = {{backgroundColor:"#323232",color:"white",width:"10%",marginLeft:"45%"}}   >
				<Link to = "./HomePage" style = {{textDecoration:"none",color:"white"}}>
                  Get Started
				</Link>
                </Button>
			</Row>
		</div>
		)
}

export default LandingPage