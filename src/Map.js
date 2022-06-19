import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from "react-google-maps";
import { v4 as uuidv4 } from "uuid";
import { getResolvedRoutes, validateUploadData } from "./Utilities/utils";

//ref https://react-google-maps-api-docs.netlify.app/#!/Polyline
export const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDfGO-xqKiucsFtMzVabvnpLlaanYwDcqU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const areRoutesValid = validateUploadData(props.routes);
  const resolvedRoutes = getResolvedRoutes(props.routes);
  return (
    <GoogleMap defaultZoom={1} defaultCenter={{ lat: 28.6139, lng: 77.209 }}>
      {areRoutesValid &&
        resolvedRoutes.map((route) => {
          return (
            <Polyline
              key={route.id}
              path={route.coordinates}
              geodesic={true}
              options={{
                strokeColor: route.status === "active" ? "blue" : "black",
                strokeOpacity: 1,
                strokeWeight: 2
              }}
            />
          );
        })}
      {areRoutesValid &&
        resolvedRoutes.map((route) => {
          return route.coordinates.map((coor) => (
            <Marker key={uuidv4()} position={coor} />
          ));
        })}
    </GoogleMap>
  );
});
