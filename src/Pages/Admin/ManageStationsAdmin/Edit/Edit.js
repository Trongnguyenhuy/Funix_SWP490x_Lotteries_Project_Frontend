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
      window.alert("VUI L??NG CH???N ????NG ?????NH D???NG FILE ???NH");
    }
  };

  const handleChangeSelect = (value) => {
    formik.setFieldValue("zoneCode", value);
  };

  return (
    <div className="mx-auto pl-20">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">THAY ?????I TH??NG TIN NH?? ????I:</h3>
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
        <Form.Item label="T??N NH?? ????I" labelAlign="left">
          <Input
            name="name"
            placeholder="NH???P V??O T??N NH?? ????I"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Form.Item>
        <Form.Item label="M?? V??NG" labelAlign="left">
          <Select
            name="zoneCode"
            placeholder="NH???P V??O M?? V??NG C???A ????I"
            onChange={handleChangeSelect}
            value={formik.values.zoneCode}
          >
            <Select.Option value="MB01">MI???N B???C</Select.Option>
            <Select.Option value="MT01">MI???N TRUNG</Select.Option>
            <Select.Option value="MN01">MI???N NAM</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="T??N ?????Y ????? NH?? ????I" labelAlign="left">
          <Input
            name="fullName"
            placeholder="NH???P V??O T??N ?????Y ?????"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
        </Form.Item>
        <Form.Item label="NG??Y M??? TH?????NG" labelAlign="left">
          <Input
            name="weekDay"
            placeholder="NH???P V??O NG??Y M??? TH?????NG TRONG TU???N"
            onChange={formik.handleChange}
            value={formik.values.weekDay}
          />
        </Form.Item>
        <Form.Item label="GI??? M??? TH?????NG" labelAlign="left">
          <Input
            name="time"
            placeholder="NH???P V??O GI??? M??? TH?????NG"
            onChange={formik.handleChange}
            value={formik.values.time}
          />
        </Form.Item>
        <Form.Item label="?????A CH???" labelAlign="left">
          <Input
            name="address"
            placeholder="NH???P V??O ?????A CH???"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
        </Form.Item>
        <Form.Item label="S??? ??I???N THO???I" labelAlign="left">
          <Input
            name="phoneNumber"
            placeholder="NH???P V??O S??? ??I???N THO???I LI??N H???"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
        </Form.Item>
        <Form.Item label="WEBSITE" labelAlign="left">
          <Input
            name="website"
            placeholder="NH???P V??O WEBSITE"
            onChange={formik.handleChange}
            value={formik.values.website}
          />
        </Form.Item>
        <Form.Item label="LOGO C???A NH?? ????I" labelAlign="left">
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
            C???P NH???T NH?? ????I
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
