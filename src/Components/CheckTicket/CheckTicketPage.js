import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { checkTicketForUserAction } from "../../Redux/Actions/ManageLotteriesAction";
import { coverVnDateString } from "../../Utils/helper/helperFunction";
import * as Yup from "yup";
import { history } from "../../App";

export default function CheckTicketPage() {
  const { userLogin } = useSelector((state) => state.ManageUserReducer);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      ticket: "",
      date: "",
      station: "",
    },
    validationSchema: Yup.object({
      ticket: Yup.string()
        .min(5, "VÉ SỐ CÓ ÍT NHẤT LÀ 5 CHỮ SỐ")
        .max(6, "VÉ SỐ CÓ NHIỀU NHẤT LÀ 6 CHỮ SỐ")
        .required("YÊU CẦU NHẬP VÀO DÃY SỐ CẦN DÒ"),
      date: Yup.string().required("YÊU CẦU NHẬP VÀO NGÀY MỞ THƯỞNG"),
      station: Yup.string().required("YÊU CẦU NHẬP VÀO TÊN ĐÀI CẦN DÒ"),
    }),
    onSubmit: (values) => {
      let d = new Date(values.date);
      console.log(d);
      console.log(coverVnDateString(d));
      let formData = new FormData();

      if (userLogin.userId === undefined) {
        window.alert("DÒ VÉ CHỈ ĐƯỢC THỰC HIỆN SAU KHI ĐĂNG NHẬP");
        history.push("/login");
      } else {
        for (let key in values) {
          if (key !== "date") {
            formData.append(key, values[key]);
          }
        }

        formData.append("date", coverVnDateString(d));
        formData.append("userId", userLogin.userId);

        const action = checkTicketForUserAction(formData);
        dispatch(action);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-rows-3 gap-4 py-8 border-b-2 border-gray-200">
        <div className="grid grid-cols-6 gap-4">
          <label htmlFor="ticket" className="font-bold my-auto">
            NHẬP SỐ:
          </label>
          <input
            className={`col-span-5 rounded-md ${
              formik.touched.ticket && formik.errors.ticket
                ? "border-2 border-red-500"
                : ""
            }`}
            type="text"
            name="ticket"
            placeholder="NHẬP VÀO DÃY SỐ CẦN DÒ"
            onChange={formik.handleChange}
            value={formik.values.ticket}
          />
        </div>
        {formik.touched.ticket && formik.errors.ticket ? (
          <div className="mt-2 text-red-500">{formik.errors.ticket}</div>
        ) : null}
        <div className="grid grid-cols-6 gap-4">
          <label htmlFor="station" className="font-bold my-auto">
            NHẬP ĐÀI:
          </label>
          <input
            type="text"
            name="station"
            placeholder="ĐÀI CẦN DÒ, CÓ DẤU"
            className={`col-span-5 rounded-md ${
              formik.touched.station && formik.errors.station
                ? "border-2 border-red-500"
                : ""
            }`}
            onChange={formik.handleChange}
            value={formik.values.station}
          />
        </div>
        {formik.touched.station && formik.errors.station ? (
          <div className="mt-2 text-red-500">{formik.errors.station}</div>
        ) : null}
        <div className="grid grid-cols-6 gap-4">
          <label htmlFor="Date" className="font-bold my-auto">
            CHỌN NGÀY:
          </label>
          <input
            type="Date"
            name="date"
            className={`col-span-5 rounded-md ${
              formik.touched.date && formik.errors.date
                ? "border-2 border-red-500"
                : ""
            }`}
            onChange={formik.handleChange}
            value={formik.values.date}
          />
        </div>
        {formik.touched.date && formik.errors.date ? (
          <div className="mt-2 text-red-500">{formik.errors.date}</div>
        ) : null}
      </div>
      <div className="w-full flex justify-center pt-2">
        <button
          type="submit"
          className="hover:bg-blue-500 hover:text-white border-2 rounded-md border-blue-500 py-2 px-10"
        >
          DÒ VÉ
        </button>
      </div>
    </form>
  );
}
