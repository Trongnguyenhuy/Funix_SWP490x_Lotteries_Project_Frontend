/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { changeProfileAction } from "../../../Redux/Actions/ManageUserAction";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { DOMAIN } from "../../../Utils/settings/Configs";
import { NavLink } from "react-router-dom";

export default function EditProfile(props) {
  const { updateUser, userLogin } = props;
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: updateUser?.name,
      email: updateUser?.email,
      phoneNumber: updateUser?.phoneNumber,
      image: {},
    },

    validationSchema: Yup.object({
      name: Yup.string().required("YÊU CẦU NHẬP VÀO TÊN NGƯỜI DÙNG"),
      email: Yup.string()
        .email("EMAIL KHÔNG HỢP LỆ")
        .required("YÊU CẦU NHẬP VÀO NGÀY MỞ THƯỞNG"),
    }),

    onSubmit: (values) => {
      let formData = new FormData();

      for (let key in values) {
        if (key === "image") {
          if (values.image.name !== undefined) {
            formData.append("image", values.image, values.image.name);
          }
        } else {
          formData.append(key, values[key]);
        }
      }
      formData.append("userLoginId", userLogin?.userId);
      const action = changeProfileAction(formData, updateUser.userId);
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
  return (
    <>
      <h3 className="text-xl font-bold">THAY ĐỔI THÔNG TIN</h3>
      <div className="mx-auto">
        <Form
          onSubmitCapture={formik.handleSubmit}
          labelCol={{
            span: 10,
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
          <Form.Item label="HỌ TÊN:" labelAlign="left">
            <Input
              name="name"
              placeholder="NHẬP VÀO TÊN NGƯỜI DÙNG"
              onChange={formik.handleChange}
              value={formik.values.name}
              status={formik.touched.name && formik.errors.name ? "error" : ""}
            />
          </Form.Item>
          {formik.touched.name && formik.errors.name ? (
            <div className="mb-4 text-red-500">{formik.errors.name}</div>
          ) : null}
          <Form.Item label="EMAIL:" labelAlign="left">
            <Input
              name="email"
              placeholder="NHẬP VÀO EMAIL NGƯỜI DÙNG"
              onChange={formik.handleChange}
              value={formik.values.email}
              status={
                formik.touched.email && formik.errors.email ? "error" : ""
              }
            />
          </Form.Item>
          {formik.touched.email && formik.errors.email ? (
            <div className="mb-4 text-red-500">{formik.errors.email}</div>
          ) : null}
          <Form.Item label="SỐ ĐIỆN THOẠI:" labelAlign="left">
            <Input
              name="phoneNumber"
              placeholder="NHẬP VÀO SỐ ĐIỆN THOẠI LIÊN HỆ"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
          </Form.Item>
          <Form.Item label="AVATAR" labelAlign="left">
            <input name="image" onChange={handleChangeFile} type="file" />
            <br />
            {imgSrc.length < 1 ? (
              <img
                style={{ width: "50%", height: "50%" }}
                src={
                  updateUser?.imgUrl?.includes("https://")
                    ? updateUser?.imgUrl
                    : DOMAIN + "/" + updateUser?.imgUrl
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
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              span: 28,
            }}
          >
            <div
              className="
                grid grid-cols-1 lg:grid-cols-2 gap-4
                w-full
              "
            >
              <Button type="primary" htmlType="submit">
                CẬP NHẬT
              </Button>
              <NavLink 
                to={`/profile/${updateUser?._id}`}
                className="
                  text-white text-center
                  bg-red-500
                  p-1
                "
              >HỦY BỎ</NavLink>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
