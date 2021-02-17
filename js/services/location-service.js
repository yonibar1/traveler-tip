'use strict'
const KEY = 'locsDB'
const locs = []
export const locationService = {
    setLocaion
}
import { storageServices } from './storage-services.js';
// LOC {id, name, lat, lng, weather, createdAt, updatedAt}
function setLocaion(pos, weather,location) {
    let id = 1
    // let name = location()
    // let name = alert()
    let createdAt = Date.now()
    let updatedAt = Date.now() + 10000
    const loc = {
        id, name:location(), pos, weather, createdAt, updatedAt
    }
    // console.log(loc, "LOC");
    locs.push(loc)
    storageServices.saveToStorage(KEY, locs)
    return Promise.resolve(locs)
}
