'use strict'
export const weatherService = {
  getOpenWeather
}
const KEY_API_WEATHER = 'b5167c3af1bd16464f5a5be82eab0070';
function getOpenWeather(pos = { lat: 3, lon: 3 }) {
  const { lat, lng } = pos;
  return axios
    .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${KEY_API_WEATHER}`)
    .then((res) => {
      return (res.data.main.temp / 17);
    });
}
