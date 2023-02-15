/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Tabs } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addnewLotteryAction } from "../../../../Redux/Actions/ManageLotteriesAction";
import AddNewAuto from "./AddNewAuto/AddNewAuto";


export default function AddNewLotteries(props) {
  const [zone, setZone] = useState("MB01");
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const onChange = (key) => {
    console.log(key);
  };

  const formik = useFormik({
    initialValues: {
      station: "",
      date: "",
      jackpot: "",
      signJackpot: "",
      firstNum: "",
      secondNum: "",
      thirdNum: "",
      fourthNum: "",
      fifthNum: "",
      sixthNum: "",
      seventhNum: "",
      eighthNum: "",
      image: {},
    },

    onSubmit: (values) => {
      console.log(values);
      let formData = new FormData();

      for (let key in values) {
        if (key !== "image" && values[key].length >= 1) {
          formData.append(key, values[key]);
        } else if (key === "image" && values.image.name !== undefined) {
          formData.append("image", values.image, values.image.name);
        }
      }

      if (zone === "MB01") {
        formData.append("station", "Miền Bắc");
      }

      formData.append("zoneCode", zone);

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

  const renderFormAddNewManual = () => {
    return (
      <>
        <div className="w-2/3 grid grid-cols-3 gap-4 justify-items-start mb-8">
          <h4 className="font-bold">CHỌN MIỀN:</h4>
          <button
            onClick={() => {
              setZone("MB01");
              formik.resetForm();
            }}
            className="font-bold w-full border-2 rounded-md p-2 border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            MIỀN BẮC
          </button>
          <button
            onClick={() => {
              setZone("MN01");
              formik.resetForm();
            }}
            className="font-bold w-full border-2 rounded-md p-2 border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            MIỀN TRUNG & NAM
          </button>
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
          {zone === "MB01" ? (
            ""
          ) : (
            <Form.Item label="NHÀ ĐÀI" labelAlign="left">
              <Input name="station" onChange={formik.handleChange} />
            </Form.Item>
          )}

          <Form.Item label="NGÀY XỔ" labelAlign="left">
            <DatePicker
              format={"DD/MM/YYYY"}
              onChange={handleChangeDatePicker}
              className="w-full"
              placeholder="NHẬP VÀO NGÀY MỞ THƯỞNG"
            />
          </Form.Item>
          <Form.Item label="GIẢI ĐẶC BIỆT" labelAlign="left">
            <Input name="jackpot" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="GIẢI NHẤT" labelAlign="left">
            <Input name="firstNum" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="GIẢI HAI" labelAlign="left">
            <Input name="secondNum" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="GIẢI BA" labelAlign="left">
            <Input name="thirdNum" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="GIẢI TƯ" labelAlign="left">
            <Input name="fourthNum" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="GIẢI NĂM" labelAlign="left">
            <Input name="fifthNum" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="GIẢI SÁU" labelAlign="left">
            <Input name="sixthNum" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="GIẢI BẢY" labelAlign="left">
            <Input name="seventhNum" onChange={formik.handleChange} />
          </Form.Item>

          {zone === "MB01" ? (
            <Form.Item label="KÝ TỰ GIẢI ĐẶC BIỆT" labelAlign="left">
              <Input name="signJackpot" onChange={formik.handleChange} />
            </Form.Item>
          ) : (
            <Form.Item label="GIẢI TÁM" labelAlign="left">
              <Input name="eighthNum" onChange={formik.handleChange} />
            </Form.Item>
          )}
          <Form.Item label="HÌNH ẢNH" labelAlign="left">
            <input name="image" onChange={handleChangeFile} type="file" />
            <br />
            {imgSrc.length < 1 ? (
              ""
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
              THÊM VÉ DÒ
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };

  return (
    <div className="mx-auto pl-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">THÊM VÉ DÒ MỚI:</h2>
        <hr />
      </div>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={[
          {
            label: <h3 className="font-bold">NHẬP DỮ LIỆU BẰNG TAY</h3>,
            key: "1",
            children: renderFormAddNewManual(),
          },
          {
            label: <h3 className="font-bold">TỰ ĐỘNG LẤY DỮ LIỆU</h3>,
            key: "2",
            children: <AddNewAuto />,
          },
        ]}
      />
    </div>
  );
}
