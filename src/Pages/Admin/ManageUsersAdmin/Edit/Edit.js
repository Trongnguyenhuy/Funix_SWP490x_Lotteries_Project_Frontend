/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Switch, Row, Col } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateUserAdminAction,
} from "../../../../Redux/Actions/ManageUserAction";
import { DOMAIN } from "../../../../Utils/settings/Configs";
import { generatePassword } from "../../../../Utils/helper/helperFunction";
import * as Yup from "yup";

export default function EditUser(props) {
  const id = props.match.params.id;
  const { updateUser, userLogin } = useSelector(
    (state) => state.ManageUserReducer
  );
  const [imgSrc, setImgSrc] = useState("");
  const [generatePass, setGeneratePass] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getUser(id);
    dispatch(action);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: updateUser?.name,
      email: updateUser?.email,
      isAdmin: updateUser?.isAdmin,
      password: generatePass,
      phoneNumber: updateUser?.phoneNumber,
      image: {},
    },

    validationSchema: Yup.object({
      name: Yup.string().required("YÊU CẦU NHẬP VÀO TÊN NGƯỜI DÙNG"),
      email: Yup.string()
        .email("EMAIL KHÔNG HỢP LỆ")
        .required("YÊU CẦU NHẬP VÀO EMAIL"),
      password: Yup.string().min(9, "MẬT KHẨU PHẢI CÓ ÍT NHẤT 9 KÝ TỰ"),
    }),

    onSubmit: (values) => {
      let formData = new FormData();

      for (let key in values) {
        if (key === "image" && values.image !== null) {
          formData.append("image", values.image);
        } else if (key !== "image") {
          formData.append(key, values[key]);
        }
      }

      formData.append("userLoginId", userLogin.userId);
      const action = updateUserAdminAction(formData, id);
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

  const handleChangeSwitch = (checked) => {
    formik.setFieldValue("isAdmin", checked);
  };

  return (
    <div className="mx-auto pl-20">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">
          CẬP NHẬT THÔNG TIN NGƯỜI DÙNG:
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
        <Form.Item label="TÊN NGƯỜI DÙNG" labelAlign="left">
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
        <Form.Item label="EMAIL" labelAlign="left">
          <Input
            name="email"
            placeholder="NHẬP VÀO EMAIL NGƯỜI DÙNG"
            onChange={formik.handleChange}
            value={formik.values.email}
            status={formik.touched.email && formik.errors.email ? "error" : ""}
          />
        </Form.Item>
        {formik.touched.email && formik.errors.email ? (
          <div className="mb-4 text-red-500">{formik.errors.email}</div>
        ) : null}
        <Form.Item label="PASSWORD" labelAlign="left">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item noStyle>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  status={
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button
                onClick={() => {
                  let password = generatePassword(9);
                  setGeneratePass(password);
                }}
                type="primary"
                ghost
              >
                LẤY MẬT KHẨU NGẪU NHIÊN
              </Button>
            </Col>
          </Row>
        </Form.Item>
        {formik.touched.password && formik.errors.password ? (
          <div className="mb-4 text-red-500">{formik.errors.password}</div>
        ) : null}
        <Form.Item label="SỐ ĐIỆN THOẠI" labelAlign="left">
          <Input
            name="phoneNumber"
            placeholder="NHẬP VÀO SỐ ĐIỆN THOẠI LIÊN HỆ"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
        </Form.Item>
        <Form.Item label="ADMIN" labelAlign="left">
          <Switch
            onChange={handleChangeSwitch}
            checked={formik.values.isAdmin}
            disabled={updateUser?.isAdmin}
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
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            CẬP NHẬT NGƯỜI DÙNG
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
