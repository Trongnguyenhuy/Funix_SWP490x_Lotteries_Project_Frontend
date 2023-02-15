import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { changePasswordAction } from "../../../Redux/Actions/ManageUserAction";
import { NavLink } from "react-router-dom";

export default function ChangePassword(props) {
  const { id, userLogin } = props;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(9, "MẬT KHẨU CÓ ÍT NHẤT 9 KÝ TỰ")
        .required("YÊU CẦU NHẬP VÀO MẬT KHẨU CŨ"),
      newPassword: Yup.string()
        .min(9, "MẬT KHẨU CÓ ÍT NHẤT 9 KÝ TỰ")
        .required("YÊU CẦU NHẬP VÀO MẬT KHẨU MỚI"),
    }),

    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      formData.append("userLoginId", userLogin?.userId);
      const action = changePasswordAction(formData, id);
      dispatch(action);
    },
  });
  return (
    <>
      <h3 className="text-xl font-bold">THAY ĐỔI MẬT KHẨU</h3>
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
          <Form.Item label="MẬT KHẨU CŨ" labelAlign="left">
            <Input
              name="oldPassword"
              type="password"
              onChange={formik.handleChange}
              status={
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? "error"
                  : ""
              }
            />
          </Form.Item>
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <div className="mb-4 text-red-500">{formik.errors.oldPassword}</div>
          ) : null}
          <Form.Item label="MẬT KHẨU MỚI" labelAlign="left">
            <Input
              name="newPassword"
              type="password"
              onChange={formik.handleChange}
              status={
                formik.touched.newPassword && formik.errors.newPassword
                  ? "error"
                  : ""
              }
            />
          </Form.Item>
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="mb-4 text-red-500">{formik.errors.newPassword}</div>
          ) : null}
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
                to={`/profile/${userLogin?._id}`}
                className="
                  text-white text-center
                  bg-red-500
                  p-1
                "
              >
                HỦY BỎ
              </NavLink>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
