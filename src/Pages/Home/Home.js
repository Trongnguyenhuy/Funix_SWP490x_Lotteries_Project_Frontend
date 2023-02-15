/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLotteriesAction } from "../../Redux/Actions/ManageLotteriesAction";
import { SET_LOTTERIES_BY_STATION_INITIAL } from "../../Redux/Actions/Types/ManageLotteriesTypes";
import CheckTicketEntry from "./CheckTicketEntry/CheckTicketEntry";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
import SlideHome from "./SlideHome/SlideHome";
import StationList from "./StationList/StationList";

export default function Home(props) {
  document.title = "LotteryR";
  const { filterLotteries, zoneCode } = useSelector(
    (state) => state.ManageLotteriesReducer
  );

  const { userLogin } = useSelector((state) => state.ManageUserReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = getLotteriesAction();
    const actionLotteries = {
      type: SET_LOTTERIES_BY_STATION_INITIAL,
      station: "Miền Bắc",
    };
    dispatch(action);

    const timer = setTimeout(() => {
      dispatch(actionLotteries);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return [
    <div key={'home'} className="container flex flex-col text-center">
      <HomeCarousel />

      {userLogin.userId === undefined && (
        <div className="px-14 py-2 mb-2 mt-4 w-full">
          <CheckTicketEntry />
        </div>
      )}

      <SlideHome filterLotteries={filterLotteries} zoneCode={zoneCode} />
      <div className="px-14 py-2 mb-2 w-full">
        <StationList />
      </div>
    </div>,
  ];
}
