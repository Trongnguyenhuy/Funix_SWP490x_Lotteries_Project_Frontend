/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardAdminAction } from "../../../Redux/Actions/ManageUserAction";
import LotteriesChart from "./Chart/LotteriesChart";
import SummaryCard from "./SummaryCard/SummaryCard";

export default function Dashboard(props) {
  const { arrUsers, userLogin } = useSelector(
    (state) => state.ManageUserReducer
  );
  const { defaultStation } = useSelector(
    (state) => state.ManageStationsReducer
  );
  const { arrLotteries } = useSelector((state) => state.ManageLotteriesReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    const action = dashboardAdminAction();
    dispatch(action);
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-8 border-b-2 border-gray-200">
        <h3 className="text-4xl font-bold">
          XIN CHÀO {userLogin.name.toUpperCase()} !
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <SummaryCard arr={arrLotteries} text={"VÉ DÒ"} />
        <SummaryCard arr={defaultStation} text={"NHÀ ĐÀI"} />
        <SummaryCard arr={arrUsers} text={"NGƯỜI DÙNG"} />
      </div>
      <LotteriesChart />
    </div>
  );
}
