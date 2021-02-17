'use strict';
const KEY = 'locsDB';
var gNextId = storageServices.loadFromStorage('id') || 101;
export const locationService = {
  setLocaion,
  deleteFromLocalStorage,
};
import { storageServices } from './storage-services.js';
// LOC {id, name, lat, lng, weather, createdAt, updatedAt}
function setLocaion(pos, weather, name) {
  const locs = storageServices.loadFromStorage(KEY) || [];
  let id = gNextId++;
  let createdAt = moment().calendar();
  let updatedAt = 'Not Yet';
  const loc = {
    id,
    name,
    pos,
    weather,
    createdAt,
    updatedAt,
  };
  locs.push(loc);
  console.log(locs);
  storageServices.saveToStorage(KEY, locs);
  storageServices.saveToStorage('id', gNextId);
  return Promise.resolve(locs);
}

function deleteFromLocalStorage(value) {
  const data = storageServices.loadFromStorage(KEY);
  const valueToRemove = value;
  const filteredItems = data.filter((location) => location.id !== valueToRemove);
  console.log('filteredItems:', filteredItems);
  localStorage.clear();
  storageServices.saveToStorage('id', gNextId);
  storageServices.saveToStorage(KEY, filteredItems);
  return Promise.resolve(filteredItems);
}
