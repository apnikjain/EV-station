import React, { Component } from 'react';
import MapApp from './MapApp';
import { CircularProgress } from '@material-ui/core';
import AddMapApp from './AddMapApp';

class HomePage extends Component {
  state={
    lat: null,
    lng: null,
    loading: true
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(this.setLocation);
  }
  setLocation = (position) => {
    console.log({position});
    this.setState({lat: position.coords.latitude, lng: position.coords.longitude });
    this.setState({loading: false})
  }
  render(){
    return (
      !this.state.loading ?
      <AddMapApp lat={this.state.lat} lng={this.state.lng} />
      :
      <div className = "CircularProgress"><CircularProgress/>  </div>
    )
  }
};

export default HomePage
