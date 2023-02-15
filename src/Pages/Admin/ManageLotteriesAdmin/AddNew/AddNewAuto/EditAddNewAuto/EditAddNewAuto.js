/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { DOMAIN } from "../../../../../../Utils/settings/Configs";
import { addnewLotteryAction } from "../../../../../../Redux/Actions/ManageLotteriesAction";

export default function EditAddNewAuto(props) {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const { editLotteryAdmin } = props;

  let zone = editLotteryAdmin?.stationId?.zoneCode;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      station: editLotteryAdmin?.stationId?.name,
      date: editLotteryAdmin?.date,
      jackpot: editLotteryAdmin?.result?.jackpot.join("-"),
      signJackpot: editLotteryAdmin?.result?.signJackpot?.join("-"),
      firstNum: editLotteryAdmin?.result?.firstNum.join("-"),
      secondNum: editLotteryAdmin?.result?.secondNum.join("-"),
      thirdNum: editLotteryAdmin?.result?.thirdNum.join("-"),
      fourthNum: editLotteryAdmin?.result?.fourthNum.join("-"),
      fifthNum: editLotteryAdmin?.result?.fifthNum.join("-"),
      sixthNum: editLotteryAdmin?.result?.sixthNum.join("-"),
      seventhNum: editLotteryAdmin?.result?.seventhNum.join("-"),
      eighthNum: editLotteryAdmin?.result?.eighthNum?.join("-"),
      zone: editLotteryAdmin?.stationId?.zoneCode,
      image: null,
    },
    onSubmit: (values) => {
      let formData = new FormData();

      for (let key in values) {
        if (key !== "image" && values[key] !== undefined) {
          formData.append(key, values[key]);
        } else if (key === "image" && values.image !== null) {
          formData.append("image", values.image);
        } else if (key === "image" && values.image === null) {
          formData.append("image", editLotteryAdmin?.imgUrl);
        }
      }

      const action = addnewLotteryAction(formData);

      dispatch(action);
    },
  });

  const handleChangeDatePicker = (value) => {
    let date = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("date", date);
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      formik.setFieldValue("image", file);
    }
  };

  let originalImg;

  if (editLotteryAdmin?.imgUrl?.includes("https:/")) {
    originalImg = editLotteryAdmin?.imgUrl;
  } else {
    originalImg = DOMAIN + "/" + editLotteryAdmin?.imgUrl;
  }

  return (
    <div className="mx-auto pl-20">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">
          XEM LẠI THÔNG TIN VÉ DÒ{" "}
          {editLotteryAdmin?.stationId?.name?.toUpperCase()} - NGÀY:{" "}
          {editLotteryAdmin?.date} VỪA LẤY XUỐNG
        </h3>
        <hr />
      </div>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: "default",
        }}
        size="default"
      >
        <Form.Item label="NHÀ ĐÀI" labelAlign="left">
          <Input
            name="station"
            onChange={formik.handleChange}
            value={formik.values.station}
          />
        </Form.Item>

        <Form.Item label="NGÀY XỔ" labelAlign="left">
          <DatePicker
            className="w-full"
            format={"DD/MM/YYYY"}
            onChange={handleChangeDatePicker}
            value={moment(formik.values.date, "DD/MM/YYYY")}
          />
        </Form.Item>
        <Form.Item label="GIẢI ĐẶC BIỆT" labelAlign="left">
          <Input
            name="jackpot"
            onChange={formik.handleChange}
            value={formik.values.jackpot}
          />
        </Form.Item>
        <Form.Item label="GIẢI NHẤT" labelAlign="left">
          <Input
            name="firstNum"
            onChange={formik.handleChange}
            value={formik.values.firstNum}
          />
        </Form.Item>
        <Form.Item label="GIẢI HAI" labelAlign="left">
          <Input
            name="secondNum"
            onChange={formik.handleChange}
            value={formik.values.secondNum}
          />
        </Form.Item>
        <Form.Item label="GIẢI BA" labelAlign="left">
          <Input
            name="thirdNum"
            onChange={formik.handleChange}
            value={formik.values.thirdNum}
          />
        </Form.Item>
        <Form.Item label="GIẢI TƯ" labelAlign="left">
          <Input
            name="fourthNum"
            onChange={formik.handleChange}
            value={formik.values.fourthNum}
          />
        </Form.Item>
        <Form.Item label="GIẢI NĂM" labelAlign="left">
          <Input
            name="fifthNum"
            onChange={formik.handleChange}
            value={formik.values.fifthNum}
          />
        </Form.Item>
        <Form.Item label="GIẢI SÁU" labelAlign="left">
          <Input
            name="sixthNum"
            onChange={formik.handleChange}
            value={formik.values.sixthNum}
          />
        </Form.Item>
        <Form.Item label="GIẢI BẢY" labelAlign="left">
          <Input
            name="seventhNum"
            onChange={formik.handleChange}
            value={formik.values.seventhNum}
          />
        </Form.Item>

        {zone === "MB01" ? (
          <Form.Item label="KÝ TỰ GIẢI ĐẶC BIỆT" labelAlign="left">
            <Input
              name="signJackpot"
              onChange={formik.handleChange}
              value={formik.values.signJackpot}
            />
          </Form.Item>
        ) : (
          <Form.Item label="GIẢI TÁM" labelAlign="left">
            <Input
              name="eighthNum"
              onChange={formik.handleChange}
              value={formik.values.eighthNum}
            />
          </Form.Item>
        )}
        <Form.Item label="HÌNH ẢNH" labelAlign="left">
          <input name="image" onChange={handleChangeFile} type="file" />
          <br />
          <img
            style={{ width: "50%", height: "50%" }}
            src={imgSrc === "" ? originalImg : imgSrc}
            alt="upload image"
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            XÁC NHẬN THÔNG TIN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
