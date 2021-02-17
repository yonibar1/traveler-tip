'use strict'
const KEY = 'locsDB'
const locs = []
export const locationService = {
    setLocaion
}
import { storageServices } from './storage-services.js';
// LOC {id, name, lat, lng, weather, createdAt, updatedAt}
function setLocaion(pos, weather) {
    let id = 1
    let name = 'my location'
    let createdAt = moment().calendar();
    let updatedAt = 'Not Yet'
    const loc = {
        id, name, pos, weather, createdAt, updatedAt
    }
    locs.push(loc)
    storageServices.saveToStorage(KEY, locs)
    return Promise.resolve(locs)
}
