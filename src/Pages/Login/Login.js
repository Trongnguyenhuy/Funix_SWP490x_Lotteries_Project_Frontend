import React from "react";
import { useDispatch } from "react-redux";
import { GiTakeMyMoney } from "react-icons/gi";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { postLogin } from "../../Redux/Actions/ManageUserAction";
import { ImGooglePlus3 } from "react-icons/im";
import * as Yup from "yup";
import { DOMAIN } from "../../Utils/settings/Configs";

export default function Login(props) {
  document.title = 'Login';
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("EMAIL KHÔNG HỢP LỆ")
        .required("YÊU CẦU NHẬP VÀO EMAIL"),
      password: Yup.string()
        .min(9, "MẬT KHẨU CẦN ÍT NHẤT 9 KÝ TỰ HOẶC HƠN")
        .required("YÊU CẦU NHẬP VÀO MẬT KHẨU"),
    }),
    onSubmit: (values) => {
      const action = postLogin(values);
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
          ĐĂNG NHẬP
        </h2>
        <hr />
        <div className="mt-2">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="text-sm font-bold text-white tracking-wide">
                EMAIL:
              </div>
              <input
                className={`w-full rounded-md mt-2 text-lg py-2 border-b ${
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
                <div>
                  <NavLink
                    className="text-xs font-display font-semibold text-white hover:text-indigo-800
                                  cursor-pointer"
                    to="/forgotpassword"
                  >
                    QUÊN MẬT KHẨU?
                  </NavLink>
                </div>
              </div>
              <input
                className={`w-full rounded-md mt-2 text-lg py-2 border-b ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="NHẬP VÀO MẬT KHẨU CỦA BẠN"
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
            <div className="mt-8">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
                type="submit"
              >
                ĐĂNG NHẬP
              </button>
            </div>
          </form>
          <div className="mt-6 text-sm font-display font-semibold text-white text-center">
            KHÔNG CÓ TÀI KHOẢN ?{" "}
            <NavLink
              to="/signup"
              className="cursor-pointer text-indigo-400 hover:text-indigo-800"
            >
              ĐĂNG KÝ
            </NavLink>
          </div>
          <div className="mt-8 py-4 text-sm font-display font-semibold text-white text-center border-t-2 border-gray-200">
            SỬ DỤNG MẠNG XÃ HỘI ?{" "}
            <div className="flex justify-center">
              <a
                href={DOMAIN + "/usermanager/auth/google"}
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
              {/* <a
                href={DOMAIN + "/usermanager/auth/facebook"}
                className="cursor-pointer m-2 px-2 text-indigo-400 hover:text-indigo-800"
              >
                <ImFacebook2 className="text-3xl font-bold" />
              </a>
              <a
                href={DOMAIN + "/usermanager/auth/twitter"}
                className="cursor-pointer m-2 px-2 text-indigo-400 hover:text-indigo-800"
              >
                <ImTwitter className="text-3xl font-bold" />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
