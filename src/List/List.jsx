import React,{useState} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './style.js';

const List = ({ places, childClicked }) => {
  const classes = useStyles();
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  console.log({childClicked});

  return (
    <div className={classes.container}>
      <Typography variant="h4">Food and Dining around you</Typography>
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
          <MenuItem value="restaurants">All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {/* places are passed */}
        {places?.slice(0,7).map((place, index) => (
          <Grid item key={index} xs={12}>
            <PlaceDetails place={place}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default List;
