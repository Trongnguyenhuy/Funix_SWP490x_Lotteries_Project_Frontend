import React from "react";
import { BsCalendarWeekFill } from "react-icons/bs";
import { RiTimerFill } from "react-icons/ri";


export default function CardPage() {
  const optionStyle = {
    backgroundImage: "url('https://picsum.photos/200/300')",
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };

  return (
    <div
      className="max-w-fit rounded-md shadow-md bg-gray-900 text-gray-100"
      style={optionStyle}
    >
      <img
        src="https://picsum.photos/200/300"
        alt="unsplash.com"
        className="object-cover object-center w-64 rounded-t-md h-80 bg-gray-500 opacity-0"
      />
      <div className="flex flex-col justify-between p-2 space-y-8 absolute bottom-1">
        <div className="space-y-2 bg-black bg-opacity-60 px-2 py-2">
          <h2 className="text-3xl font-semibold tracking-wide flex text-white">
            XSKT Đà Lạt
          </h2>
          <p className="text-white flex">
            <BsCalendarWeekFill className="text-xl mr-2" />
            Ngày Mở Thưởng: 12/11/2022.
          </p>
          <p className="text-white flex">
            <RiTimerFill className="text-2xl mr-2" />
            Giờ Mở Thưởng: 16:15:00
          </p>
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
        >
          Read more
        </button>
      </div>
    </div>
  );
}
