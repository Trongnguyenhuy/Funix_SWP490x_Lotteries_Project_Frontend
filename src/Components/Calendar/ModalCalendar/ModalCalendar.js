import React from "react";
import { Modal, Calendar, Button } from "antd";
import { useState } from "react";
import moment from "moment";
const today = moment();

export default function ModalCalendar(props) {
  const { openCalendarModal, setIopenCalendarModal, onHandleDatePick } = props;
  const [value, setValue] = useState(today);
  const [loading, setLoading] = useState(false);

  const onSelect = (newValue) => {
    setValue(newValue);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onHandleDatePick(value._d);
      setIopenCalendarModal(false);
    }, 3000);
  };

  const handleCancel = () => {
    setIopenCalendarModal(false);
  };

  return (
    <Modal
      title="CHỌN NGÀY"
      open={openCalendarModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          type="primary"
          key="confirm"
          loading={loading}
          onClick={handleOk}
        >
          XÁC NHẬN
        </Button>,
      ]}
    >
      <Calendar fullscreen={false} onSelect={onSelect} value={value} />
    </Modal>
  );
}
