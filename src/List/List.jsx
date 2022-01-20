import React,{useState, useEffect, createRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './style.js';

const List = ({ places, childClicked,loading , rating, setRating, type, setType}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs  = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  },[places])    

  return (
    <div className={classes.container}>
      <Typography variant="h4">Food and Dining around you</Typography>
      {
        loading ? 
        <div><CircularProgress size="5rem" /></div>
        : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={3.5}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {/* places are passed */}
            {places?.slice(0,7).map((place, index) => (
              <Grid ref={elRefs[index]} item key={index} xs={12}>
                <PlaceDetails 
                  place={place} 
                  selected={Number(childClicked) === index}
                  refProp={elRefs[index]}
                />
              </Grid>
            ))}
          </Grid>
        </>)
      }
    </div>
  );
}

export default List;
