import { message } from "antd";
import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_DATA } from "../Data/DefaultData";
import { validateUploadData } from "../Utilities/utils";

const RoutesContext = createContext(null);

const RoutesProvider = ({ children }) => {
  const [routes, setRoutes] = useState(getInitialState());
  function getInitialState() {
    const routeData = JSON.parse(localStorage.getItem("routes"));
    if (!validateUploadData(routeData)) {
      localStorage.removeItem("routes");
      return DEFAULT_DATA;
    }
    return JSON.parse(localStorage.getItem("routes"));
  }

  const add = (route) => {
    let newRoutes = [...routes];
    route["id"] = uuidv4();
    newRoutes.push(route);
    localStorage.setItem("routes", JSON.stringify(newRoutes));
    message.success("Route Added");
    setRoutes(newRoutes);
  };
  const addBatch = (file) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        let uploadedData = JSON.parse(e.target.result);
        if (!validateUploadData(uploadedData)) {
          uploadedData = DEFAULT_DATA;
          message.error("Uploaded data is Invalid");
          return false;
        }

        // set id for uploaded routes
        uploadedData.forEach((route, index) => {
          route.id = uuidv4();
        });

        const newRoutes = [...routes, ...uploadedData];
        localStorage.setItem("routes", JSON.stringify(newRoutes));
        message.success("Batch Added");
        setRoutes(newRoutes);
      };
      reader.readAsText(file);
      return false;
    } catch (e) {
      message.error("Uploaded data is Invalid");
    }
  };

  const remove = (id) => {
    const newRoutes = routes.filter((r) => r.id !== id);
    localStorage.setItem("routes", JSON.stringify(newRoutes));
    message.info("Route Removed");
    setRoutes(newRoutes);
  };

  const edit = (route) => {
    let newRoutes = [...routes];
    let index = newRoutes.findIndex((r) => r.id === route.id);
    newRoutes[index] = route;
    localStorage.setItem("routes", JSON.stringify(newRoutes));
    message.success("Route Updated");
    setRoutes(newRoutes);
  };

  const routeContextData = {
    routes,
    add,
    addBatch,
    remove,
    edit
  };

  return (
    <RoutesContext.Provider value={routeContextData}>
      {children}
    </RoutesContext.Provider>
  );
};

export { RoutesProvider, RoutesContext };
