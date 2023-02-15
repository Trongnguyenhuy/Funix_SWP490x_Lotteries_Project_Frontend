import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { useFormik } from "formik";
import { ImGooglePlus3 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { postSignup } from "../../Redux/Actions/ManageUserAction";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

export default function Signup(props) {
  document.title = "Sign Up";
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
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
      const action = postSignup(values);
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
                placeholder="NHẬP VÀO TÊN NGƯỜI DÙNG CỦA BẠN"
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
                EMAIL:
              </div>
              <input
                className={`w-full rounded-md mt-2 text-lg p-2 border-b ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="NHẬP VÀO EMAIL CỦA BẠN"
                id="email"
                name="email"
                type="text"
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
                Đăng Ký
              </button>
            </div>
          </form>
          <div className="mt-8 py-4 text-sm font-display font-semibold text-white text-center border-t-2 border-gray-200">
            Sử Dụng Tài Khoản Mạng Xã Hội?{" "}
            <div className="flex justify-center">
              <a
                href="http://localhost:8080/usermanager/auth/google"
                className="cursor-pointer m-2 px-2 text-indigo-400 hover:text-indigo-800"
              >
                <button 
                  className="
                    flex justify-start items-center 
                    py-1 px-4 w-full
                    border-2 border-blue-400 rounded-md
                    hover:bg-red-500
                  "
                >
                  <ImGooglePlus3 className="text-4xl font-bold" />
                  <p className="ml-2 pt-3">ĐĂNG NHẬP BẰNG TÀI KHOẢN GOOGLE</p>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
