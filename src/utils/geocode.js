/* eslint-disable no-throw-literal */
const Axios = require('axios');
const Config = require('../../config');

const location = async function getLocation(cep) {
  try {
    await Axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${Config.apiMaps}`
    );
  } catch (err) {
    throw { message: 'Problema ao requisitar a API do Geolocation' };
  }
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
