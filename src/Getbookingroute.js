import React, { useEffect, useState } from 'react';
import { sampleData } from './SampleData';

function GetBooking(props) {
  const id = Math.floor(Math.random() * 100)
  return (
    <div>
      <h1>Booking Completed</h1>
      <p>Your unique Booking Id is : 20WH{id}</p>
    </div>
  )
}

export default GetBooking
