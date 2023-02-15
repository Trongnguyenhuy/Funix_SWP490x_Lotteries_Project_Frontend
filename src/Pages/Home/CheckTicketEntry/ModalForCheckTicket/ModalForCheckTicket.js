import React, { useState } from "react";
import { Button, Modal } from "antd";
import CheckTicket from "../../../../Components/CheckTicket/CheckTicket";
import { useDispatch, useSelector } from "react-redux";
import { checkTicketAction } from "../../../../Redux/Actions/ManageLotteriesAction";
import { useFormik } from "formik";
import {
  coverVnDateString,
  isObjEmpty,
} from "../../../../Utils/helper/helperFunction";
import * as Yup from "yup";
import { CLEAR_TICKET } from "../../../../Redux/Actions/Types/ManageLotteriesTypes";

export default function ModalForCheckTicket(props) {
  const { openModal, setOpenModal } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { checkTicketResult, CheckTicketFall } = useSelector(
    (state) => state.ManageLotteriesReducer
  );
  let arrResult;

  const formik = useFormik({
    initialValues: {
      ticket: "",
      date: "",
      station: "",
    },
    validationSchema: Yup.object({
      ticket: Yup.string()
        .min(5, "VÉ SỐ CÓ ÍT NHẤT LÀ 5 CHỮ SỐ")
        .max(6, "VÉ SỐ CÓ NHIỀU NHẤT LÀ 6 CHỮ SỐ")
        .required("YÊU CẦU NHẬP VÀO DÃY SỐ CẦN DÒ"),
      date: Yup.string().required("YÊU CẦU NHẬP VÀO NGÀY MỞ THƯỞNG"),
      station: Yup.string().required("YÊU CẦU NHẬP VÀO TÊN ĐÀI CẦN DÒ"),
    }),
    onSubmit: (values) => {
      let d = new Date(values.date);
      let formData = new FormData();

      for (let key in values) {
        if (key !== "date") {
          formData.append(key, values[key]);
        }
      }
      formData.append("date", coverVnDateString(d));
      const action = checkTicketAction(formData);
      dispatch(action);
    },
  });

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isObjEmpty(formik.errors)) {
        formik.handleSubmit();
      }
    }, 3000);
  };

  const handleCancel = () => {
    const action = { type: CLEAR_TICKET };
    dispatch(action);
    setOpenModal(false);
  };

  

  if(!isObjEmpty(checkTicketResult)){
    arrResult = Object.values(checkTicketResult.result);
  }


  const renderReSult = () => {
    return arrResult?.map((item, index) => {
      return <p key={index} className="text-xl font-bold">{item.toUpperCase()}</p>;
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Modal
        open={openModal}
        title="DÒ KẾT QUẢ VÉ SỐ"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            QUAY VỀ
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={handleOk}
            disabled={!isObjEmpty(checkTicketResult)}
          >
            DÒ VÉ
          </Button>,
        ]}
      >
        {isObjEmpty(checkTicketResult) && !CheckTicketFall && <CheckTicket formik={formik} />}
        {!isObjEmpty(checkTicketResult) && !CheckTicketFall && renderReSult()}
      </Modal>
    </form>
  );
}
