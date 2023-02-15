/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import {
  getStationAction,
  putEditStationAdminAction,
} from "../../../../Redux/Actions/ManageStationsAction";
import { useDispatch, useSelector } from "react-redux";
import { translateDay } from "../../../../Utils/helper/helperFunction";
import { useEffect } from "react";
import { DOMAIN } from "../../../../Utils/settings/Configs";

export default function EditStation(props) {
  const id = props.match.params.id;
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const { station } = useSelector((state) => state.ManageStationsReducer);

  useEffect(() => {
    const action = getStationAction(id);
    dispatch(action);
  }, []);
  const translateWeekDay = station?.open?.weekDay?.map((item) => {
    return translateDay(item, "vn");
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: station?.name,
      fullName: station?.fullName,
      weekDay: translateWeekDay?.join(" - "),
      time: station?.open?.time,
      address: station?.descriptions?.address,
      phoneNumber: station?.descriptions?.phoneNum,
      website: station?.descriptions?.webSite,
      image: {},
      zoneCode: station?.zoneCode,
    },

    onSubmit: (values) => {
      let formData = new FormData();

      for (let key in values) {
        if (key === "image" && values.image !== null) {
          formData.append("image", values.image);
        } else if (key === "weekDay") {
          let enDay = values[key].split(" - ").map((item) => {
            return translateDay(item, "en");
          });
          formData.append(key, enDay.join(" - "));
        } else if (key !== "image") {
          formData.append(key, values[key]);
        }
      }

      const action = putEditStationAdminAction(formData, id);
      dispatch(action);
    },
  });

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
    } else {
      window.alert("VUI LÒNG CHỌN ĐÚNG ĐỊNH DẠNG FILE ẢNH");
    }
  };

  const handleChangeSelect = (value) => {
    formik.setFieldValue("zoneCode", value);
  };

  return (
    <div className="mx-auto pl-20">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">THAY ĐỔI THÔNG TIN NHÀ ĐÀI:</h3>
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
        <Form.Item label="TÊN NHÀ ĐÀI" labelAlign="left">
          <Input
            name="name"
            placeholder="NHẬP VÀO TÊN NHÀ ĐÀI"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Form.Item>
        <Form.Item label="MÃ VÙNG" labelAlign="left">
          <Select
            name="zoneCode"
            placeholder="NHẬP VÀO MÃ VÙNG CỦA ĐÀI"
            onChange={handleChangeSelect}
            value={formik.values.zoneCode}
          >
            <Select.Option value="MB01">MIỀN BẮC</Select.Option>
            <Select.Option value="MT01">MIỀN TRUNG</Select.Option>
            <Select.Option value="MN01">MIỀN NAM</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TÊN ĐẦY ĐỦ NHÀ ĐÀI" labelAlign="left">
          <Input
            name="fullName"
            placeholder="NHẬP VÀO TÊN ĐẦY ĐỦ"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
        </Form.Item>
        <Form.Item label="NGÀY MỞ THƯỞNG" labelAlign="left">
          <Input
            name="weekDay"
            placeholder="NHẬP VÀO NGÀY MỞ THƯỞNG TRONG TUẦN"
            onChange={formik.handleChange}
            value={formik.values.weekDay}
          />
        </Form.Item>
        <Form.Item label="GIỜ MỞ THƯỞNG" labelAlign="left">
          <Input
            name="time"
            placeholder="NHẬP VÀO GIỜ MỞ THƯỞNG"
            onChange={formik.handleChange}
            value={formik.values.time}
          />
        </Form.Item>
        <Form.Item label="ĐỊA CHỈ" labelAlign="left">
          <Input
            name="address"
            placeholder="NHẬP VÀO ĐỊA CHỈ"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
        </Form.Item>
        <Form.Item label="SỐ ĐIỆN THOẠI" labelAlign="left">
          <Input
            name="phoneNumber"
            placeholder="NHẬP VÀO SỐ ĐIỆN THOẠI LIÊN HỆ"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
        </Form.Item>
        <Form.Item label="WEBSITE" labelAlign="left">
          <Input
            name="website"
            placeholder="NHẬP VÀO WEBSITE"
            onChange={formik.handleChange}
            value={formik.values.website}
          />
        </Form.Item>
        <Form.Item label="LOGO CỦA NHÀ ĐÀI" labelAlign="left">
          <input name="image" onChange={handleChangeFile} type="file" />
          <br />
          {imgSrc.length < 1 ? (
            <img
              style={{ width: "50%", height: "50%" }}
              src={
                station?.imgUrl
                  ? DOMAIN + "/" + station?.imgUrl
                  : "https://picsum.photos/200"
              }
              alt="upload image"
            />
          ) : (
            <img
              style={{ width: "50%", height: "50%" }}
              src={imgSrc}
              alt="upload image"
            />
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            CẬP NHẬT NHÀ ĐÀI
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
