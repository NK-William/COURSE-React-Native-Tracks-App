import * as Location from "expo-location";

const tenMetersWithdegrees = 0.0001;

// We are using this(the whole file) to fake the location for test mode
const getLocation = (increment) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      lognitude: -122.0312186 + increment * tenMetersWithdegrees,
      latitude: 37.0312186 + increment * tenMetersWithdegrees,
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
