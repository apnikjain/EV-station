import React from 'react';
import './MapApp.css';
import { MapContainer } from './MapContainer';
import { hereIsolineUrl, maxIsolineRangeLookup } from './here';
import { Link } from 'react-router-dom';
import { Container,Row, Col, Button } from 'react-bootstrap';


class MapApp extends React.Component {

   constructor(props) {
     
      super(props);
      this.state = {

         maps: [
            {
               name: 'Katpadi, Tamil Nadu',
               coordinates: [this.props.lat, this.props.lng],
               polygon: []
            }
         ],
         options: {
            zoom: 14,
            type: 'distance',
            range: 3000,
            mode: 'car',
            traffic: 'disabled',
            style: 'normal.day'
         }
      }
   }

   updateIsolines = () => {
      const promises = this.state.maps.map(m => fetch(hereIsolineUrl(m.coordinates, this.state.options)).then(x => x.json()));
      Promise.all(promises).then(res => {

         const copy = this.state.maps.map((x, i) => {
            if (res[i].response.isoline[0].component.length > 0) {
               x.polygon = res[i].response.isoline[0].component[0].shape.map(x => [x.split(',')[0], x.split(',')[1]]);
            } else {
               x.polygon = [];
            }
            return x;
         });

         this.setState({
            maps: copy
         });
      })
   }

   componentDidMount = () => {
      this.updateIsolines();
   }

   handleDrag = (index, coordinates) => {
      fetch(hereIsolineUrl(coordinates, this.state.options))
      .then(res => res.json())
      .then(res => {

         const copy = this.state.maps.slice();
         if (res.hasOwnProperty('response')) {
            copy[index].polygon = res.response.isoline[0].component[0].shape.map(x => [x.split(',')[0], x.split(',')[1]]);
         } else {
            copy[index].polygon = [];
         }
         copy[index].coordinates = coordinates;
         this.setState({
            maps: copy
         });
      });
   }

   handleFormChange = (event) => {

      const option = event.target.id;
      const value = event.target.value;

      const copy = this.state.options;
      if (option === 'type' && this.state.options.range > maxIsolineRangeLookup[value]) {
         copy.range = maxIsolineRangeLookup[value];
      }
      copy[option] = value;
      this.setState({
         options: copy
      }, () => {
         this.updateIsolines();
      });

   }

   render() {

      const max = this.state.options.type === 'distance' ?
         maxIsolineRangeLookup.distance :
         maxIsolineRangeLookup.time;

      const sliderVal = this.state.options.range > max ? max : this.state.options.range;
      console.log(this.state.options.range)
      const range = this.state.options.range
      return (
        <div>
        <dialog />

         <div className="app">
            <div className="map-grid">
               {this.state.maps.map((map, index) =>
                  <MapContainer
                    key={index}
                    index={index}
                    center={map.coordinates}
                    options={this.state.options}
                    handleDrag={this.handleDrag}
                    polygon={map.polygon}
                    style={this.state.options.style}

                  />
               )}

            </div>
              <div style = {{backgroundColor:"#323232",width:"100%",marginBottom:"0"}}>
              
              <div className="controls">
                 <div style = {{margin:"1%"}} >
                    <label htmlFor="type" style = {{marginRight: "3%"}}>Distance or Time</label>
                    <select style = {{height:"100%", width:"30%"}}
                       id="type"
                       value={this.state.options.type}
                       onChange={this.handleFormChange}
                    >
                       <option value="time">Seconds</option>
                       <option value="distance">Meters</option>
                    </select>

                 </div>
                 <div style = {{margin:"1%"}}>
                    <label htmlFor="range" style = {{marginRight: "4.5%"}} >
                      Range ({parseInt(this.state.options.range).toLocaleString()})
                    </label>
                    <input 
                      id="range"
                      onChange={this.handleFormChange}
                      type="range"
                      min="1"
                      max={max}
                      value={sliderVal}
                    />
                 </div>
                 <div style = {{margin:"1%"}}>
                    <label htmlFor="traffic"  style = {{marginRight: "19%"}}>Traffic</label>
                    <select
                      id="traffic"
                      onChange={this.handleFormChange}
                      value={this.state.options.traffic}
                    >
                      <option value="enabled">Traffic Enabled</option>
                      <option value="disabled">Traffic Disabled</option>
                    </select>
                 </div>
                 <div style = {{margin:"1%"}}>
                    <label htmlFor="zoom"  style = {{marginRight: "2%"}}>Zoom Level ({this.state.options.zoom})</label>
                    <input
                      id="zoom"
                      onChange={this.handleFormChange}
                      type="range"
                      min="1"
                      max="16"
                      value={this.state.options.zoom}
                    />
                 </div>
                 <div style = {{margin:"1%"}}>
                    <label htmlFor="style"  style = {{marginRight: "14%"}}>Map Style</label>
                       <select
                        id="style"
                        onChange={this.handleFormChange}
                        value={this.state.options.style}
                       >
                        <option value="reduced.day">Reduced Day </option>
                        <option value="reduced.night">Reduced Night</option>
                        <option value="normal.day">Normal Day</option>
                        <option value="normal.night">Normal Night</option>
                       </select>
                 </div>
                 

                <Button style = {{height:"90%",width:"27%", backgroundColor:"#65A0F9",borderRadius:"4px",margin:"1%"}}>
                  <Link to={{
                      pathname: '/show-options',
                      aboutprops:{
                        range: {range}
                      }
                    }} style = {{color:"white",textDecoration:"none",fontSize:"15px"}}>Check Nearby Stations</Link>
                </Button>

              </div>
              </div>
         </div>
         </div>
      );
   }
}

export default MapApp;















