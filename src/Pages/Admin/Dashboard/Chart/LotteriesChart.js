/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import SelectYear from "./SelectYear/SelectYear";
import { useDispatch, useSelector } from "react-redux";
import { getStaticLotteryAction } from "../../../../Redux/Actions/ManageLotteriesAction";

export default function LotteriesChart(props) {
  const today = new Date();
  const currentYear = today.getFullYear();

  const [yearStatic, setYearStatic] = useState(currentYear.toString());

  const dispatch = useDispatch();
  const { staticLotteryData } = useSelector(
    (state) => state.ManageLotteriesReducer
  );

  const data = [...staticLotteryData];

  useEffect(() => {
    const action = getStaticLotteryAction(yearStatic);
    dispatch(action);
  }, [dispatch, yearStatic]);

  const config = {
    data,
    xField: "month",
    yField: "lottery",
    color: "#063970",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: "Tháng",
      },
      lottery: {
        alias: "Vé Dò",
      },
    },
  };

  return (
    <div className="border-2 border-gray-200 rounded-xl shadow-2xl p-4 mt-4">
      <div className="p-2 flex justify-between border-b-2 border-gray-200">
        <h2 className="text-2xl font-bold">
          BIỂU ĐỒ SỐ LƯỢNG VÉ DÒ ĐÃ NHẬP THEO THÁNG - NĂM {yearStatic}
        </h2>
        <div className="p-2">
          <p>LỰA CHỌN NĂM</p>
          <SelectYear
            yearStatic={yearStatic}
            setYearStatic={setYearStatic}
            currentYear={currentYear}
          />
        </div>
      </div>
      <div className="mt-4 border-2 border-gray-200 rounded-xl py-8 px-4">
        <Column {...config} />
      </div>
    </div>
  );
}
