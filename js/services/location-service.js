'use strict'
const KEY = 'locsDB'
var gNextId = 101
export const locationService = {
    setLocaion
}
import { storageServices } from './storage-services.js';
// LOC {id, name, lat, lng, weather, createdAt, updatedAt}
function setLocaion(pos, weather) {
    const locs = storageServices.loadFromStorage(KEY) || []
    let id = gNextId++
    let name = 'my location'
    let createdAt = moment().calendar();
    let updatedAt = 'Not Yet'
    const loc = {
        id, name, pos, weather, createdAt, updatedAt
    }
    locs.push(loc)
    console.log(locs);
    storageServices.saveToStorage(KEY, locs)
    return Promise.resolve(locs)
}
