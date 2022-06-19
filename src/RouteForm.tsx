import { Button, Modal, Form, Input, Radio, Space, FormInstance } from "antd";
import React, { useContext, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormState } from "./App";
import { RoutesContext } from "./Context/RoutesContext";
import { Direction, ModalType, Status } from "./Enums/enums";
import { v4 as uuidv4 } from "uuid";
import "./Styles/modalstyles.css";
interface Props {
  formState: FormState;
  toggleForm: (visible: boolean) => void;
}

interface Stops {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface FormValues {
  id: string;
  name: string;
  direction: string;
  status: string;
  stops: Stops[];
}
const RouteForm: React.FC<Props> = ({ formState, toggleForm }) => {
  const formRef = React.useRef<FormInstance<FormValues>>();
  const { add, edit } = useContext(RoutesContext);
  const [stopsError, setStopsError] = useState(false);

  const handleCancel = () => {
    toggleForm(false);
  };

  const handleOk = () => {
    formRef.current.validateFields();
    formRef.current.submit();
  };

  const submitForm = (formValues: FormValues) => {
    const { stops } = formValues;

    if (stops?.length > 1) {
      // add id to each stop
      stops.forEach((stop) => {
        stop["id"] = uuidv4();
      });
      if (formState.mode === ModalType.NEW) {
        add(formValues);
      }
      if (formState.mode === ModalType.EDIT) {
        edit({ ...formValues, id: formState.data.id });
      }
      toggleForm(false);
    } else {
      setStopsError(true);
    }
  };

  const renderFormBody = () => {
    return (
      <>
        <Form
          layout="horizontal"
          ref={formRef}
          onFinish={submitForm}
          initialValues={formState.data}
        >
          <Form.Item
            label="Name"
            required
            name="name"
            rules={[{ required: true, message: "Enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Direction"
            required
            name="direction"
            rules={[{ required: true, message: "Select Direction" }]}
          >
            <Radio.Group>
              <Radio value={Direction.UP}> Up </Radio>
              <Radio value={Direction.DOWN}> Down </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.List name="stops">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...field }) => (
                  <Space
                    className={"space-item"}
                    key={key}
                    align="center"
                    direction="vertical"
                  >
                    <Form.Item
                      {...field}
                      label="Stop Name"
                      name={[name, "name"]}
                      rules={[{ required: true, message: "Missing Stop name" }]}
                    >
                      <Input placeholder="Stop name" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Latitude"
                      name={[name, "lat"]}
                      rules={[
                        { required: true, message: "Missing Latitude" },
                        () => ({
                          validator(_, value) {
                            if (!value) {
                              return Promise.reject();
                            }
                            if (isNaN(value)) {
                              return Promise.reject("Enter a number");
                            }
                            if (
                              Math.ceil(value) < -90 ||
                              Math.ceil(value) > 90
                            ) {
                              return Promise.reject(
                                "Enter a value between -90 and 90"
                              );
                            }
                            return Promise.resolve();
                          }
                        })
                      ]}
                    >
                      <Input placeholder="Latitude" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Longitude"
                      name={[name, "lng"]}
                      rules={[
                        { required: true, message: "Missing Longitude" },
                        () => ({
                          validator(_, value) {
                            if (!value) {
                              return Promise.reject();
                            }
                            if (isNaN(value)) {
                              return Promise.reject("Enter a number");
                            }
                            if (
                              Math.ceil(value) < -180 ||
                              Math.ceil(value) > 180
                            ) {
                              return Promise.reject(
                                "Enter a value between -180 and 180"
                              );
                            }
                            return Promise.resolve();
                          }
                        })
                      ]}
                    >
                      <Input placeholder="Longitude" />
                    </Form.Item>

                    <MinusCircleOutlined
                      className={"remove-icon"}
                      onClick={() => remove(name)}
                    />
                    <br />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add stops
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            label="Status"
            required
            name="status"
            rules={[{ required: true, message: "Select Status" }]}
          >
            <Radio.Group>
              <Radio value={Status.ACTIVE}> Active </Radio>
              <Radio value={Status.INACTIVE}> Inactive </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
        {stopsError && <div className="error">* Add atleast 2 stops</div>}
      </>
    );
  };

  return (
    <Modal
      visible={formState.visible}
      title={formState.mode === "edit" ? "Edit Route" : "Add Route"}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
    >
      {renderFormBody()}
    </Modal>
  );
};

export default RouteForm;
