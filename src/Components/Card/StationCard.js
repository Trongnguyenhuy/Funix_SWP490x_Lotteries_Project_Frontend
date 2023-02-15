import React from "react";
import { BsCalendarWeek } from "react-icons/bs";
import { ImEye } from "react-icons/im";
import { MdTimer } from "react-icons/md";
import { TbFileSearch } from "react-icons/tb";
import { translateDay } from "../../Utils/helper/helperFunction";

export default function StationCard(props) {
  const { item } = props;
  let arrOpenWeekDay = item.open.weekDay;
  arrOpenWeekDay = arrOpenWeekDay.map((item) => {
    return translateDay(item);
  });

  return (
    <div className="bg-slate-300 bg-opacity-40 my-4 ml-20 hover:ml-40 hover:mr-0 hover:cursor-pointer  w-3/4 shadow-xl grid grid-cols-3 content-center rounded-md">
      <div className="rounded-full p-2 max-w-fit flex items-center">
        <img
          src="https://picsum.photos/300"
          alt={`Vé Số ${item.name}`}
          className="rounded-full"
        />
      </div>
      <div className="col-span-2 grid grid-rows-4 content-center text-black w-full">
        <h2 className="text-3xl w-3/4 font-bold text-black align-middle pt-4 border-b-2">
          Vé Số {item.name}
        </h2>
        <div className="row-span-2 px-2 text-base">
          <p className="flex justify-start">
            <BsCalendarWeek className="text-2xl mr-2" /> Ngày Mở:{" "}
            {arrOpenWeekDay.join(" | ")}
          </p>
          <p className="flex justify-start">
            <MdTimer className="text-2xl mr-2" /> Giờ Mở: {item.open.time}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2 border-t-2">
          <button className="flex border border-black bg-transparent hover:bg-blue-700 text-black font-bold py-2 px-4 my-1 rounded">
            <ImEye className="text-2xl" /> Xem Kết Quả
          </button>
          <button className="flex border border-black bg-transparent hover:bg-blue-700 text-black font-bold py-2 px-4 my-1 rounded">
            <TbFileSearch className="text-2xl" /> Dò Vé số
          </button>
        </div>
      </div>
    </div>
  );
}
