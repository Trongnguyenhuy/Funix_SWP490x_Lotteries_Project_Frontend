import React from "react";
import { useDispatch } from "react-redux";
import {
  SET_LOTTERIES_CENTERZONE,
  SET_LOTTERIES_NORTHZONE,
  SET_LOTTERIES_SOUTHZONE,
} from "../../../Redux/Actions/Types/ManageLotteriesTypes";
import VerticalSlideCard from "../../../Components/Slide/VerticalSlide/VerticalSlideCard";

export default function SlideHome(props) {
  const dispatch = useDispatch();
  const { filterLotteries, zoneCode } = props;

  return (
    <section className="text-gray-600 body-font">
      <div className="px-14 py-2 w-full">
        <div
          style={{ backgroundColor: "#F0F2F5" }}
          className="container p-2 border border-gray-500 rounded-md my-1 shadow-2xl"
        >
          <h2 className="text-2xl font-bold border-b-2 border-gray-200 mb-4 py-4">
            KẾT QUẢ MỚI NHẤT THEO VÙNG
          </h2>
          <div className="flex flex-col items-center p-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-3/4 mb-2 bg-white rounded-md p-2">
              <button
                className={`${
                  zoneCode === "MB01"
                    ? "bg-blue-500 text-white"
                    : "bg-transparent"
                } hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
                onClick={() => {
                  const action = {
                    type: SET_LOTTERIES_NORTHZONE,
                  };

                  dispatch(action);
                }}
              >
                MIỀN BẮC
              </button>
              <button
                className={`${
                  zoneCode === "MT01"
                    ? "bg-blue-500 text-white"
                    : "bg-transparent"
                } hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
                onClick={() => {
                  const action = {
                    type: SET_LOTTERIES_CENTERZONE,
                  };

                  dispatch(action);
                }}
              >
                MIỀN TRUNG
              </button>
              <button
                className={`${
                  zoneCode === "MN01"
                    ? "bg-blue-500 text-white"
                    : "bg-transparent"
                } hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
                onClick={() => {
                  const action = {
                    type: SET_LOTTERIES_SOUTHZONE,
                  };

                  dispatch(action);
                }}
              >
                MIỀN NAM
              </button>
            </div>
            <div className="w-full mt-4 h-fit">
              <VerticalSlideCard
                arrLotteries={filterLotteries}
                vertical={false}
                numberCardShow={3}
                header={false}
                compareLotteries={filterLotteries}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
