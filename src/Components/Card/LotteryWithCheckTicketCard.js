import React from "react";
import { BsCalendarWeek } from "react-icons/bs";

export default function LotteryCard(props) {
  const { lottery, hover, w } = props;
  return (
    <div
      className={`flex flex-col w-${w} bg-white rounded-lg shadow-md hover:cursor-pointer ${
        hover ? "hover:scale-125" : ""
      }`}
    >
      <div className="text-black p-2">
        <h4 className="text-2xl font-bold">Vé Dò {lottery.stationId.name}</h4>
        <p className="flex text-xs">
          <BsCalendarWeek className="mr-2" /> Ngày: {lottery.date}
        </p>
      </div>
      <div
        style={{
          backgroundImage: `url('${lottery.imgUrl}')`,
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        className="mb-2"
      >
        <img
          src={lottery.imgUrl}
          alt={lottery.stationId.name}
          className={`opacity-0 w-${w} h-${w / 2.1}`}
        />
      </div>
      <div className="text-black p-2 grid grid-cols-2 gap-4 justify-items-center border-t-2 border-gray-200">
        <a
          className="w-full hover:bg-gray-200 hover:cursor-pointer p-1 rounded-sm"
          href="/"
        >
          Xem Vé Dò
        </a>
        <a
          className="w-full hover:bg-gray-200 hover:cursor-pointer p-1 rounded-sm"
          href="/"
        >
          Dò Vé Dò
        </a>
      </div>
    </div>
  );
}
