import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

// import mapStyles from '../../mapStyles';
import useStyles from './style.js';

const Map = ({ setBounds,setCoordinates, coordinates, places, setChildClicked }) => {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  // lifting state up

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCTfpbiJ-aDSOHOM7TWKSU-CZF64RiYdfk' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          // console.log(e,"---");
          setCoordinates({lat: e.center.lat, lng: e.center.lng});
          setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
        }}
        // map is clickable
        onChildClick={(child) => {setChildClicked(child)}}
      >
        {places?.map((place,i) => (
          <div 
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {
              isDesktop ? (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                <img
                  alt=""
                  className={classes.pointer}
                  src={place.photo 
                    ? place.photo.images.large.url 
                    : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                />
                <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
              </Paper>)
              : (<LocationOnOutlinedIcon color="primary" fontSize="large"/>)
            }
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
