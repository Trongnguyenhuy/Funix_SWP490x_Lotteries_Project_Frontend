import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FlipCard from "../../Components/FlipCard/FlipCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styleSlick from "./SlideCard.css";

export default function MultipleItems(props) {
  let { arrLotteries } = props;

  const NextArrow = ({ currentSlide, slideCount, ...props }) => {
    const { className, style, onClick } = props;
    return (
      <div
        {...props}
        className={`${className} ${styleSlick["slick-prev"]}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
      >
        <RightOutlined />
      </div>
    );
  };

  const PrevArrow = ({ currentSlide, slideCount, ...props }) => {
    const { className, style, onClick } = props;
    return (
      <div
        {...props}
        className={`${className} ${styleSlick["slick-prev"]}`}
        style={{ ...style, display: "block", left: "-50px" }}
        onClick={onClick}
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
      >
        <LeftOutlined />
      </div>
    );
  };

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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const renderLotteries = () => {
    return arrLotteries.map((item, index) => {
      return (
        <div key={index} className={`${styleSlick["width-item"]} mx-4`}>
          <FlipCard item={item} />
        </div>
      );
    });
  };

  return (
    <div className="border-t-2 p-2">
      <Slider {...settings}>{renderLotteries()}</Slider>
    </div>
  );
}
