/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { getGoogleLoginSuccessAction } from "../../../Redux/Actions/ManageUserAction";
import { postSignup } from "../../../Redux/Actions/ManageUserAction";
import { GiTakeMyMoney } from "react-icons/gi";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

export default function GoogleSignup() {
  const { googleLogin } = useSelector((state) => state.ManageUserReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const action = getGoogleLoginSuccessAction();
    dispatch(action);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: googleLogin.email,
      name: googleLogin.name,
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("EMAIL KHÔNG HỢP LỆ")
        .required("YÊU CẦU NHẬP VÀO EMAIL"),
      name: Yup.string()
        .min(5, "TÊN NGƯỜI DÙNG PHẢI ÍT NHẤT 5 KÝ TỰ HOẶC HƠN")
        .required("YÊU CẦU NHẬP VÀO TÊN NGƯỜI DÙNG"),
      password: Yup.string()
        .min(9, "MẬT KHẨU CẦN ÍT NHẤT 9 KÝ TỰ HOẶC HƠN")
        .required("YÊU CẦU NHẬP VÀO MẬT KHẨU"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("password", values.password);
      formData.append("googleId", googleLogin.googleId);

      const action = postSignup(formData);
      dispatch(action);
    },
  });
  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-10 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <NavLink to="/home" className="cursor-pointer flex items-center">
          <GiTakeMyMoney className="mr-2 text-5xl font-bold text-indigo-800" />
          <div className="text-2xl text-indigo-800 tracking-wide font-semibold">
            LotteryR
          </div>
        </NavLink>
      </div>
      <div className="mt-4 px-10 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-white font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
        >
          ĐĂNG KÝ
        </h2>
        <p className="text-white">VUI LÒNG ĐIỀN ĐẦY ĐỦ THÔNG TIN BÊN DƯỚI</p>
        <hr />
        <div className="mt-4">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="text-sm font-bold text-white tracking-wide">
                TÊN ĐĂNG NHẬP:
              </div>
              <input
                className={`w-full rounded-md mt-2 text-lg p-2 border-b ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Tên Đăng Nhập"
                id="name"
                name="name"
                type="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="mt-2 text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mt-2">
              <div className="text-sm font-bold text-white tracking-wide">
                ĐỊA CHỈ EMAIL:
              </div>
              <input
                className={`w-full rounded-md mt-2 text-lg p-2 border-b ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="NHẬP VÀO ĐỊA CHỈ EMAIL CỦA BẠN"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="mt-2 text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-white tracking-wide">
                  MẬT KHẨU:
                </div>
              </div>
              <input
                className={`w-full rounded-md mt-2 text-lg p-2 border-b ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Nhập Vào Mật Khẩu Của Bạn"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="mt-2 text-red-500">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="mt-10">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
                type="submit"
              >
                HOÀN TẤT THÔNG TIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
