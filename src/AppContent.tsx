import "./Styles/styles.css";
import { Layout } from "antd";
import React, { useContext } from "react";
import 'antd/dist/antd.min.css'
import RouteList from "./RouteList";
import { MyMapComponent } from "./Map";
import { RoutesContext } from "./Context/RoutesContext";
const { Content } = Layout;

interface Props {
  toggleForm: (visible, mode, data) => void;
}

const AppContent: React.FC<Props> = ({ toggleForm }) => {
  const { routes } = useContext(RoutesContext);

  return (
    <Content>
      <div className="content-body">
        <div className="list-wrapper">
          <div className="head">Route List</div>
          <RouteList toggleForm={toggleForm} />
        </div>
        <MyMapComponent routes={routes} />
      </div>
      <div className='map-content'>
      
      </div>
      
    </Content>
  );
};

export default AppContent;
