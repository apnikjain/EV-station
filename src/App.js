import React, { Component } from 'react';
import Layout from './Components/Layout';
import LandingPage from './LandingPage'
import HomePage from './HomePage';
import { Switch, Route } from 'react-router-dom';
import ShowRoute from './ShowRoute';
import ShowOptions from './ShowOptions';
import ShowOption from './ShowOption';
import GetRoute from './GetRoute';
import GetBooking from './Getbookingroute';
import StationDialog from './AddStation';


export default class App extends Component{
  render(){
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <LandingPage/>}/>
            <Route exact path="/HomePage" render={() => <HomePage/>}/>
            <Route exact path="/show-route" render={() => <ShowRoute/>}/>
            <Route exact path="/show-options" render={() => <ShowOptions/>}/>
            <Route exact path="/option/:id" render={(routeProps) => <ShowOption {...routeProps} />}/>
            <Route exact path="/get-route/:id" render={(routeProps) => <GetRoute {...routeProps}/>}/>
            <Route exact path="/GetBookingroute/:id" render={(routeProps) => <GetBooking {...routeProps}/>}/>
			<Route exact path="/AddStation" render={(routeProps) => <StationDialog />}/>


          </Switch>
        </Layout>
      </div>
    )
  }
}