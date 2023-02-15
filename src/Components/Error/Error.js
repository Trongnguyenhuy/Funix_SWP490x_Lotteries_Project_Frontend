import React from "react";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HIDDEN_ERRORS } from "../../Redux/Actions/Types/ErrorType";

export default function Error(props) {
  const { isError, message } = useSelector((state) => state.ErrorReducer);
  const dispatch = useDispatch();

  const handleOk = () => {
    const action = { type: HIDDEN_ERRORS };
    dispatch(action);
  };
  const handleCancel = () => {
    const action = { type: HIDDEN_ERRORS };
    dispatch(action);
  };
  return (
    <Modal
      title={`LỖI ${message.statusCode}`}
      centered
      open={isError}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} ghost type='primary'>
          QUAY LẠI
        </Button>,
      ]}
    >
      <h2 className="text-xl font-bold">{message.message}</h2>
    </Modal>
  );
}
