export const validateUploadData = (routesArray) => {
  let isValid = true;
  if (!(routesArray instanceof Array)) isValid = false;
  else {
    routesArray.forEach((route) => {
      if (
        !(
          route.name &&
          route.direction &&
          route.status &&
          route.stops &&
          route.stops.length > 1
        )
      ) {
        isValid = false;
      }
      route &&
        route.stops &&
        route.stops instanceof Array &&
        route.stops.forEach((stop) => {
          if (!(stop.name && stop.lat && stop.lng)) isValid = false;
        });
    });
  }

  return isValid;
};

export const getResolvedRoutes = (routes) => {
  const coordinatesArray = [];
  routes &&
    routes.forEach((route) => {
      const coordinates = [];
      route.stops.forEach((stop) => {
        coordinates.push({
          lng: Number(stop.lng),
          lat: Number(stop.lat)
        });
      });
      coordinatesArray.push({
        id: route.id,
        name: route.name,
        status: route.status,
        coordinates
      });
    });
  return coordinatesArray;
};
