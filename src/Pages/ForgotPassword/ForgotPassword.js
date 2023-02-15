import React from "react";
import { NavLink } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPasswordAction } from "../../Redux/Actions/ManageUserAction";
import { useDispatch } from "react-redux";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("EMAIL KHÔNG HỢP LỆ")
        .required("YÊU CẦU NHẬP VÀO EMAIL"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('email', values.email);
      const action = forgotPasswordAction(formData);
      dispatch(action);
    },
  });
  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <NavLink to="/home" className="cursor-pointer flex items-center">
          <GiTakeMyMoney className="mr-2 text-5xl font-bold text-indigo-800" />
          <div className="text-2xl text-indigo-800 tracking-wide font-semibold">
            LotteryR
          </div>
        </NavLink>
      </div>
      <div className="mt-4 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-8 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-white font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
        >
          QUÊN MẬT KHẨU
        </h2>
        <hr />
        <div className="mt-2">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="text-sm font-bold text-white tracking-wide">
                NHẬP VÀO EMAIL CỦA BẠN ĐẾ LẤY LẠI MẬT KHẨU:
              </div>
              <input
                className={`w-full rounded-md mt-2 text-lg py-2 border-b ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
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
            <div className="mt-8">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
                type="submit"
              >
                LẤY LẠI MẬT KHẨU
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
