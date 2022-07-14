const { parse } = require('csv-parse');
const fs = require('fs');
const habitablePlanets = [];

//! habitable if KOI disposition is confirmed
//habitable if stellar flux has enough light 
//upper limit for planet size
function isHabitablePlanet(planet) {
 return planet['koi_disposition'] === 'CONFIRMED'
  && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
  && planet['koi_prad'] < 1.6;
}



fs.createReadStream('kepler_data.csv')
 .pipe(parse({
  comment: '#',
  columns: true,
 }))
 .on('data', (data) => {
  if (isHabitablePlanet(data)) {
   habitablePlanets.push(data);
  }

 })
 .on('error', (err) => {
  console.log(err);
 })
 .on('end', () => {
  console.log(results);
  console.log('done processing file!!!');
 });


