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
          className="container rounded-md my-1 shadow-2xl"
        >
          <div
            className="
              grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 gap-4 justify-items-center place-content-center
              border-b-2 border-gray-300
              w-full
            "
          >
            <h2
              className="
                lg:col-span-2
                w-full
                text-2xl font-bold
                flex flex-row justify-center items-center
                py-2 lg:py-4
              "
            >
              KẾT QUẢ MỚI NHẤT
            </h2>
            <div
              className="
                grid grid-cols-3
                w-full
              "
            >
              <button
                className={`
                  ${
                    zoneCode === "MB01"
                      ? "bg-red-500 text-white"
                      : "bg-transparent"
                  } 
                  font-semibold
                  hover:bg-red-500 hover:text-white 
                  border-l-2 border-gray-300 
                  hover:border-transparent 
                `}
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
                className={`
                  ${
                    zoneCode === "MT01"
                      ? "bg-red-500 text-white"
                      : "bg-transparent"
                  } 
                  font-semibold
                  hover:bg-red-500 hover:text-white  
                  border-l-2 border-gray-300 
                  hover:border-transparent
                `}
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
                className={`
                  ${
                    zoneCode === "MN01"
                      ? "bg-red-500 text-white"
                      : "bg-transparent"
                  } 
                  font-semibold
                  hover:bg-red-500 hover:text-white  
                  border-l-2 border-gray-300 
                  hover:border-transparent
                  lg:rounded-tr-md
                `}
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
          </div>
          <div
            className="
              w-full h-fit
              mt-4 p-4
            "
          >
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
    </section>
  );
}
