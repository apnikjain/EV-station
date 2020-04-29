import React from 'react';
import './MapApp.css';
import { MapContainer } from './MapContainer';
import { hereIsolineUrl, maxIsolineRangeLookup } from './here';
import { Link } from 'react-router-dom';
import { Container,Row, Col, Button } from 'react-bootstrap';


class AddMapApp extends React.Component {

   constructor(props) {
     
      super(props);
      this.state = {

         maps: [
            {
               name: 'Seattle, WA',
               coordinates: [this.props.lat, this.props.lng],
               polygon: []
            }
         ],
         options: {
            zoom: 14,
            type: 'distance',
            range: 0,
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

         <div className="app">
            <div className="map-grid2">
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
         </div>
      );
   }
}

export default AddMapApp;















