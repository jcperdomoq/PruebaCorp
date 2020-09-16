
import {
  URL_LOCATION_SEARCH,
  URL_DARK_SKY,
} from './util/routes';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2FybDA4NDAiLCJhIjoiY2o2aTFuZjF2MGVyNjJxbG1kcDQ3NHFubCJ9.aKtzR_pGSIM2dz25zqEcQQ';

exports.locationSearch = ({query}) => {
  
	return fetch(`${URL_LOCATION_SEARCH.replace('#city', query)}?access_token=${MAPBOX_TOKEN}`)
		.then(response => response.json())
		.then(async data => {
      if (data.features != null && data.features.length > 0) {
        let locations = [];
        locations = data.features.map(feature => {
          return {
            place: feature.place_name,
            lat: feature.center[1],
            lng: feature.center[0],
          }
        })
        return locations;
      }
      throw data;
		})
		.catch((error) => {
      return null;
		});
}

exports.getWeather = ({lat, lng}) => {

	return fetch(URL_DARK_SKY.replace('#Lat', lat).replace('#Long', lng))
		.then(response => response.json())
		.then(async data => {
      if (data != null && data.currently != null) {
        return {
          currently: {
            temperature: Math.ceil(data.currently.temperature),
            apparentTemperature: Math.ceil(data.currently.apparentTemperature),
            summary: data.currently.summary,
            windSpeed: Math.ceil(data.currently.windSpeed),
            humidity: Math.ceil(data.currently.humidity),
            dewPoint: Math.ceil(data.currently.dewPoint),
            time: data.currently.time,
            icon: data.currently.icon,
            summaryHours: data.hourly.summary,
            temperatureLow: Math.ceil(data.daily.data[0].temperatureLow),
            temperatureHigh: Math.ceil(data.daily.data[0].temperatureHigh),
          },
          hourly: data.hourly.data.map(i => {
            return {
              temperature: Math.ceil(i.temperature),
              summary: i.summary,
              time: i.time,
              icon: i.icon,
            }
          }),
          daily: {
            summary: data.daily.summary,
            data: data.daily.data.map(i => {
              return {
                temperatureMin: Math.ceil(i.temperatureMin),
                temperatureMax: Math.ceil(i.temperatureMax),
                summary: i.summary,
                time: i.time,
                icon: i.icon,
              }
            })
          }
        }
      }
      throw data;
		})
		.catch((error) => {
      console.log({error})
      return null;
		});
}