import "./Styles/styles.css";
import { Button, Divider } from "antd";
import React, { useContext } from "react";
import 'antd/dist/antd.min.css'
import { RoutesContext } from "./Context/RoutesContext";
import { ModalType } from "./Enums/enums";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface Props {
  toggleForm: (visible, mode, data) => void;
}
const RouteList: React.FC<Props> = ({ toggleForm }) => {
  const { routes, remove } = useContext(RoutesContext);
  const handleEdit = (route) => {
    toggleForm(true, ModalType.EDIT, route);
  };

  const handleDelete = (id) => {
    remove(id);
  };

  if (!routes?.length) {
    return (
      <div className={'no-routes'}>No routes added</div>
    );
  }

  return (
    <div className="list-container">
      {routes &&
        routes.map((r) => (
          <div key={r.id}>
            <div className="item">
              <div className="name">{r.name}</div>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                className="edit-button"
                onClick={() => handleEdit(r)}
              ></Button>
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(r.id)}
              ></Button>
            </div>
            <Divider style={{ margin: 0 }} />
          </div>
        ))}
    </div>
  );
};

export default RouteList;
