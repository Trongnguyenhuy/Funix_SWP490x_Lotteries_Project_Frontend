import React from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addnewLotteryAutoAction } from "../../../../../Redux/Actions/ManageLotteriesAction";
import EditAddNewAuto from "./EditAddNewAuto/EditAddNewAuto";

export default function AddNewAuto() {
  const { editLotteryAdmin } = useSelector(
    (state) => state.ManageLotteriesReducer
  );

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      stationName: "",
      date: "",
    },

    onSubmit: (values) => {
      let formData = new FormData();

      for (let key in values) {
        formData.append(key, values[key]);
      }

      const action = addnewLotteryAutoAction(formData);
      dispatch(action);
    },
  });
  const handleChangeDatePicker = (value) => {
    let date = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("date", date);
  };
  return (
    <>
      {Object.values(editLotteryAdmin).length < 1 && (
        <div className="p-2 w-full">
          <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item label="NHẬP VÀO TÊN ĐÀI" labelAlign="left">
              <Input name="stationName" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="CHỌN NGÀY MỞ THƯỞNG" labelAlign="left">
              <DatePicker
                format={"DD/MM/YYYY"}
                onChange={handleChangeDatePicker}
                className="w-full"
                placeholder="NHẬP VÀO NGÀY MỞ THƯỞNG"
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Button type="primary" htmlType="submit">
                LẤY DỮ LIỆU
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {Object.values(editLotteryAdmin).length >= 1 && (
        <EditAddNewAuto editLotteryAdmin={editLotteryAdmin} />
      )}
    </>
  );
}
