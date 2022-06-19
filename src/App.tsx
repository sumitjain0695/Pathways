import { Layout } from "antd";
import 'antd/dist/antd.min.css'
import { useState } from "react";
import { RouteResponse } from "./Interfaces/interfaces";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import { ModalType } from "./Enums/enums";
import RouteForm from "./RouteForm";
import "./Styles/styles.css";

export interface FormState {
  visible: boolean;
  mode: string;
  data: RouteResponse | null;
}

const App = () => {
  const [formState, setFormState] = useState<FormState>({
    visible: false,
    mode: ModalType.NEW,
    data: null
  });

  const toggleForm = (visible:boolean, mode = ModalType.NEW, data = null) => {
    setFormState({
      mode: mode,
      data: data,
      visible: visible
    });
  };

  return (
    <div className="App">
      <Layout>
        <AppHeader toggleForm={toggleForm} />
        <AppContent toggleForm={toggleForm} />
        {formState.visible && (
          <RouteForm toggleForm={toggleForm} formState={formState} />
        )}
      </Layout>
    </div>
  );
};

export default App;
