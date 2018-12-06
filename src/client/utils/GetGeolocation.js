export const getGeolocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }),
        reject;
    });
  });
