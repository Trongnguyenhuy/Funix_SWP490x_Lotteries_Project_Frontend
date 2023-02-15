import React from "react";

export default function CheckTicket(props) {
  const { formik } = props;

  return (
    <div className="container grid grid-rows-1 gap-2 p-2 rounded-md content-center">
      <div className="p-2 border-2 border-gray-200 rounded-md">
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <div className="w-2/3 content-center px-1">
            {formik.touched.ticket && formik.errors.ticket ? (
              <div className="mt-2 text-red-500">{formik.errors.ticket}</div>
            ) : null}
          </div>
          <div className="w-2/3 content-center px-1">
            {formik.touched.date && formik.errors.date ? (
              <div className="mt-2 text-red-500">{formik.errors.date}</div>
            ) : null}
          </div>
          <div className="w-2/3 content-center px-1">
            {formik.touched.station && formik.errors.station ? (
              <div className="mt-2 text-red-500">{formik.errors.station}</div>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 w-full justify-items-center">
          <div className="grid grid-cols-6 gap-4 w-full content-center px-1 mb-4">
            <label htmlFor="ticket" className="font-bold">
              NHẬP SỐ:
            </label>
            <input
              className={`w-full col-span-5 rounded-lg ${
                formik.touched.ticket && formik.errors.ticket
                  ? "border-2 border-red-500"
                  : ""
              }`}
              type="text"
              name="ticket"
              placeholder="Nhập Vào Số Cần Dò"
              onChange={formik.handleChange}
              value={formik.values.ticket}
            />
          </div>
          <div className="grid grid-cols-6 gap-4 w-full content-center px-1 mb-4">
            <label htmlFor="station" className="font-bold my-auto">
              NHẬP ĐÀI:
            </label>
            <input
              type="text"
              name="station"
              className={`w-full col-span-5 rounded-lg ${
                formik.touched.station && formik.errors.station
                  ? "border-2 border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              value={formik.values.station}
            />
          </div>
          <div className="grid grid-cols-6 gap-4 w-full content-center px-1 mb-4">
            <label htmlFor="Date" className="font-bold my-auto">
              CHỌN NGÀY:
            </label>
            <input
              type="Date"
              name="date"
              className={`w-full col-span-5 rounded-lg ${
                formik.touched.date && formik.errors.date
                  ? "border-2 border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              value={formik.values.date}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
