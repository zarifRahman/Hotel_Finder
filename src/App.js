import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './Header/Header';
import List from './List/List';
import Map from './Map/Map';

import { getPlacesData, getWeatherData } from './api/index.js';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState("All");
  const [filterRating, setFilterRating] = useState([]);
  const [weatherData, setWeatherData] = useState([]);



  // get user current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({ lat: latitude, lng: longitude });
    })
  },[]);

  // filtering data according to Rating
  useEffect(() => {
    console.log({rating});
    const filteredPlaces = places?.filter((place) => Number(place.rating) > rating) || [];
    setFilterRating(filteredPlaces);
  },[rating])

  useEffect(() => {
    if(bounds.sw && bounds.ne){
      setLoading(true);
      // .then because it is a async function //
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
        // will get restaurants according to our bound (current position)
        // remove the datat which has empty value
        setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
        setFilterRating([]);
        setRating('');
        setLoading(false);
      })
      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => {
          setWeatherData(data);
        })
    }
  },[type, coordinates, bounds]);



  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List 
            places={filterRating.length ? filterRating : places}
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
            weatherData={weatherData}
            places={filterRating.length ? filterRating : places}
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
