/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import TableLotteryDetail from "../../Components/Table/TableLotteryDetail";
import {
  getLotteriesDetailAction,
  getLotteriesDetailListAction,
} from "../../Redux/Actions/ManageLotteriesAction";
import VerticalSlideCard from "../../Components/Slide/VerticalSlide/VerticalSlideCard";
import BreadcrumbComponent from "../../Components/Breadcrumb/Breadcrumb";
import { DOMAIN } from "../../Utils/settings/Configs";
import { coverDateToDayVn } from "../../Utils/helper/helperFunction";

export default function Details(props) {
  let { lotteryDetail, lotteryDetailList } = useSelector(
    (state) => state.ManageLotteriesReducer
  );

  let imgSrc;

  if (lotteryDetail.imgUrl.includes("https:/")) {
    imgSrc = lotteryDetail.imgUrl;
  } else {
    imgSrc = DOMAIN + "/" + lotteryDetail.imgUrl;
  }

  if (lotteryDetail.stationId.zoneCode === "MB01") {
    lotteryDetailList = lotteryDetailList.filter((item) => {
      return (
        coverDateToDayVn(lotteryDetail.date) === coverDateToDayVn(item.date)
      );
    });
  }

  const { url } = props.match;

  const arrTitle = url.split("/");
  const lengthArrTitle = arrTitle.length;

  document.title = `VÉ DÒ ${
    arrTitle[lengthArrTitle - 3] === "Miền Bắc"
      ? arrTitle[lengthArrTitle - 3].toUpperCase() +
        " " +
        arrTitle[lengthArrTitle - 2].toUpperCase()
      : arrTitle[lengthArrTitle - 2].toUpperCase()
  } - NGÀY ${lotteryDetail.date}`;

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const actionDetail = getLotteriesDetailAction(id);
    const actionDetailList = getLotteriesDetailListAction(id);
    dispatch(actionDetail);
    dispatch(actionDetailList);
  }, [id]);

  return (
    <div
      style={{
        backgroundImage: `url('${imgSrc}')`,
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CustomCard
        style={{ paddingTop: 150, minHeight: "100vh" }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={20} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <BreadcrumbComponent url={url} lottery={lotteryDetail} />
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center mb-4">
            <div className="hidden md:flex justify-center items-center w-full ">
              <div
                style={{
                  backgroundImage: `url('${imgSrc}')`,
                  backgroundPosition: "center",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
                className="rounded-xl"
              >
                <img
                  src={imgSrc}
                  alt={`kết quả xổ số ${lotteryDetail.stationId.name}`}
                  className="rounded-xl opacity-0 w-fit"
                />
              </div>
            </div>
            <TableLotteryDetail lottery={lotteryDetail} />
          </div>
          <div className="px-4 py-2 mt-2 w-full rounded-md shadow-md bg-white">
            <div className="Slide-card">
              <VerticalSlideCard
                arrLotteries={lotteryDetailList}
                vertical={false}
                numberCardShow={
                  lotteryDetailList.length === 1
                    ? 1
                    : lotteryDetailList.length === 2
                    ? 2
                    : 3
                }
                compareLotteries={lotteryDetailList}
              />
            </div>
          </div>
        </div>
      </CustomCard>
    </div>
  );
}
