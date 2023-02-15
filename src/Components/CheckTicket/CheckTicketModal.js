import React from "react";
import { Modal, Button } from "antd";
import { history } from "../../App";
import { checkZoneCode } from "../../Utils/helper/helperFunction";
import { useState } from "react";

export default function CheckTicketModal(props) {
  const { isModalOpen, checkTicketResult } = props;
  const [isOpen, setOpen] = useState(isModalOpen);

  const handleOk = () => {
    history.push(
      `/lottery/${checkZoneCode(checkTicketResult.zoneCode)}/${
        checkTicketResult.station
      }/${checkTicketResult.lotteryId}`
    );
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  let arrResult = Object.values(checkTicketResult.result);

  return (
    <Modal
      title="Kết Quả Dò Vé:"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          TRỞ LẠI
        </Button>,
        <Button key="view" type="primary" onClick={handleOk}>
          XEM VÉ DÒ
        </Button>,
      ]}
    >
      {arrResult.map((item, index) => {
        return <p key={index}>{item.toUpperCase()}</p>;
      })}
    </Modal>
  );
}
