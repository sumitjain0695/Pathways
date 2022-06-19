import "./Styles/styles.css";
import { Button, Layout, Tooltip, Affix, Upload } from "antd";
import React, { useContext } from "react";
import 'antd/dist/antd.min.css'
import {
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { RoutesContext } from "./Context/RoutesContext";

const { Header } = Layout;
interface Props {
  toggleForm: (visible) => void;
}
const AppHeader: React.FC<Props> = ({ toggleForm }) => {
  const { routes, addBatch } = useContext(RoutesContext);

  const addRoute = () => {
    toggleForm(true);
  };

  const onExport = () => {
    const element = document.createElement("a");
    const textFile = new Blob([JSON.stringify(routes)], { type: "json" });
    element.href = URL.createObjectURL(textFile);
    element.download = "routes.json";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  return (
    <Affix offsetTop={0}>
      <Header>
        <div className="header">
          <div className="title">Public Transit Route</div>
          <div className="header-buttons">
            <Tooltip title="Add Route">
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={addRoute}
              />
            </Tooltip>{" "}
            <Tooltip title="Download">
              <Button
                onClick={onExport}
                type="primary"
                shape="circle"
                icon={<DownloadOutlined />}
              />
            </Tooltip>{" "}
            <Tooltip title="Upload">
              <Upload
                accept=".json"
                showUploadList={false}
                beforeUpload={addBatch}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<UploadOutlined />}
                />
              </Upload>
            </Tooltip>
          </div>
        </div>
      </Header>
    </Affix>
  );
};

export default AppHeader;
