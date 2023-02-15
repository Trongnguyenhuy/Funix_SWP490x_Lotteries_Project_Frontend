import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styleSlick from "./SlideDetail.css";
import LotteryCard from "../../../Components/Card/LotteryCard";
import { NavLink } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );
}

export default function SlideDetail(props) {
  let { arrLotteries } = props;

  const settings = {
    className: "center variable-width",
    infinite: true,
    centerPadding: "60px",
    centerMode: true,
    speed: 500,
    slidesToShow:
      arrLotteries.length === 1 ? 1 : arrLotteries.length === 2 ? 2 : 3,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const renderLotteries = () => {
    return arrLotteries.map((item, index) => {
      return (
        <div key={index} className={`${styleSlick["width-item"]} mx-4`}>
          <NavLink
            to={`/lottery/${item.stationId.name}/${item._id}`}
            target="_blank"
          >
            <LotteryCard lottery={item} w={72}/>
          </NavLink>
        </div>
      );
    });
  };

  return (
    <div className="p-2">
      <Slider {...settings}>{renderLotteries()}</Slider>
    </div>
  );
}
