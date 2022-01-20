import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './Header/Header';
import List from './List/List';
import Map from './Map/Map';

import { getPlacesData } from './api/index.js';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');


  // get user current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({ lat: latitude, lng: longitude });
    })
  },[])

  useEffect(() => {
    setLoading(true);
    // .then because it is a async function //
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      // will get restaurants according to our bound (current position)
      setPlaces(data);
      setLoading(false);
    })
  },[type, coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List 
            places={places} 
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            places={places}
            setBounds={setBounds} 
            setCoordinates={setCoordinates} 
            coordinates={coordinates}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
