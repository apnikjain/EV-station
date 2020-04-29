import React, { useEffect, useState } from 'react';
import { sampleData } from './SampleData';

function GetRoute(props) {
  const {id} = props.uid;
  const [option, setOption] = useState(sampleData.find(s => s._id === id));
  useEffect(() => {
    console.log({id});
    const response = sampleData.find(s => s._id === id);
    console.log({response})
    setOption(response);
  }, []);
  return (
    <>
      <img
        src={`https://image.maps.ls.hereapi.com/mia/1.6/routing?apiKey=vK0ingIp6yDd90am3wpsgedFbCvuI6f1Vmgrc0PfPsE&waypoint0=12.972097,79.159497&waypoint1=${props.lat},${props.log}&lc=1652B4&lw=6&t=0&ppi=320&w=300&h=466`}
        alt="RouteImage"
      />
    </>
  )
}

export default GetRoute
