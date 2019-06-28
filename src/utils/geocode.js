/* eslint-disable no-throw-literal */
const Axios = require('axios');
const Config = require('../../config');

const location = async function getLocation(cep) {
  await Axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${Config.apiMaps}`
  );
  if (typeof location.data.results === 'undefined' || location.data.status === 'ZERO_RESULTS') {
    throw { message: 'CEP não encontrado!' };
  }
  return {
    type: 'Point',
    coordinates: [
      location.data.results[0].geometry.location.lat,
      location.data.results[0].geometry.location.lng
    ]
  };
};

module.exports = location;
