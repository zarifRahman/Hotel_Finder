import axios from 'axios';

const URL =  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

// const options = {
//   params: {
//     bl_latitude: '11.847676',
//     tr_latitude: '12.838442',
//     bl_longitude: '109.095887',
//     tr_longitude: '109.149359',
//   },
//   headers: {
//     'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
//     'x-rapidapi-key': 'b750e9129dmsh6fa225e4a97caf8p168badjsnda04f2b4b3bd'
//   }
// };

export const getPlacesData = async (sw, ne) => {
  try {
    // create first request
    // Nested destructing
    const {data: {data}} = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': 'b750e9129dmsh6fa225e4a97caf8p168badjsnda04f2b4b3bd'
      }
    });
    return data;
  } catch(error){
    console.log(error);
  }
}