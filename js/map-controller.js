import { mapService } from './services/map-service.js';
import { locationService } from './services/location-service.js';
import { weatherService } from './services/weather-services.js';

var gMap;

console.log('Main!');

mapService.getLocs().then((locs) => console.log('locs', locs));

window.onload = () => {
    initMap()
        .then(() => {
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(() => console.log('INIT MAP ERROR'));

    getPosition()
        .then((pos) => {
            console.log('User position is:', pos.coords);
        })
        .catch((err) => {
            console.log('err!!!', err);
        });
    document.querySelector(`.my-location`).addEventListener('click', (ev) => {
        getPermission().then((res) => {
            return res
        }).then(res => setTimeout(() => {
            panTo(res[0], res[1])
        }, 300))
    });
};

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi().then(() => {
        console.log('google available');
        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15,
        });
        gMap.addListener('click', (ev) => {
            inputNameLocation().then((name) => {
                const pos = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
                weatherService.getOpenWeather(pos).then((res) => {
                    locationService.setLocaion(pos, res, name).then(renderLocsTable);
                });
            });
        });
        console.log('Map!', gMap);
    });
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!',
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve();
    const API_KEY = 'AIzaSyARLjLvyMPGRPBTjpwqu92ZjyJBX7sjmFk';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load');
    });
}
function renderLocsTable(locs) {
    const elTable = document.querySelector('.location-table table tbody');
    let strHTMLs = locs.map((loc) => {
        return `<tr><td>${loc.id}</td>
        <td>${loc.name}</td>
        <td>${loc.weather}</td>
        <td>${loc.createdAt}</td>
        <td>${loc.updatedAt}</td>
        <td><button class="go-btn-${loc.id}">Go</button></td>
        <td><button class="delete-btn-${loc.id}">Delete</button></td>
        <tr>`;
    });
    elTable.innerHTML = strHTMLs.join('');

    locs.forEach((loc) => {
        document.querySelector(`.go-btn-${loc.id}`).addEventListener('click', (ev) => {
            panTo(loc.pos.lat, loc.pos.lng);
        });
    });
    locs.forEach((loc) => {
        document.querySelector(`.delete-btn-${loc.id}`).addEventListener('click', (ev) => {
            locationService.deleteFromLocalStorage(loc.id).then(renderLocsTable);
        });
    });
}

function inputNameLocation() {
    const prmUserDecision = Swal.fire({
        title: 'Location name',
        showDenyButton: true,
        input: 'text',
    }).then(({ value }) => {
        if (!value) throw new Error('User Canceled!');
        return value;
    });
    return prmUserDecision;
}

function getPermission() {
    let locations = [];
    navigator.geolocation.getCurrentPosition(
        (position) => {
            locations.push(position.coords.latitude);
            locations.push(position.coords.longitude);
            if (!locations) getPermission();
        },
        function (error) {
            Promise.reject(console.log('The Locator was denied. :('));
        }
    );
    return Promise.resolve(locations);
}
