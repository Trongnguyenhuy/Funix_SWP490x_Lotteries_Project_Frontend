import { Button } from "antd";
import React, { Component } from "react";
import {
  LeftOutlined,
  RightOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import LotteryCard from "../../Card/LotteryCard";
import "../SlideCard.css";
import { coverDateToDayVn } from "../../../Utils/helper/helperFunction";

export default class VerticalSlideCard extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const { arrLotteries, vertical, numberCardShow, header, compareLotteries } = this.props;

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: numberCardShow,
      slidesToScroll: 1,
      vertical: vertical,
      verticalSwiping: vertical,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    const renderCard = () => {
      return arrLotteries.map((item, index) => {
        return (
          <div key={"Card" + index} className="w-full px-4">
            <NavLink
              to={`/lottery/${
                item.stationId.zoneCode === "MB01"
                  ? "Miền Bắc"
                  : item.stationId.zoneCode === "MT01"
                  ? "Miền Trung"
                  : "Miền Nam"
              }/${
                item.stationId.zoneCode === "MB01" ? coverDateToDayVn(item.date) : item.stationId.name
              }/${item._id}`}
              className="grid grid-cols-1 my-2 justify-items-center content-center px-2"
            >
              <LotteryCard lottery={item} compareLotteries={compareLotteries}/>
            </NavLink>
          </div>
        );
      });
    };

    const renderArrow = (direction) => {
      if (direction) {
        return (
          <>
            <div className="absolute left-1/2 top-10">
              <Button
                onClick={this.previous}
                type="primary"
                size="middle"
                icon={<UpOutlined />}
                shape="circle"
              />
            </div>
            <div className="absolute left-1/2 bottom-0">
              <Button
                onClick={this.next}
                type="primary"
                size="middle"
                icon={<DownOutlined />}
                shape="circle"
              />
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="absolute left-0 top-1/2">
              <Button
                onClick={this.previous}
                type="primary"
                size="middle"
                icon={<LeftOutlined />}
                shape="circle"
              />
            </div>
            <div className="absolute right-0 top-1/2">
              <Button
                onClick={this.next}
                type="primary"
                size="middle"
                icon={<RightOutlined />}
                shape="circle"
              />
            </div>
          </>
        );
      }
    };
    return (
      <div
        className="relative bg-white p-2 rounded-md"
        style={{ width: "100%" }}
      >
        <h2
          className={`text-xl font-bold border-b-2 border-gray-200 pb-2 ${
            header ? "" : "hidden"
          }`}
        >
          VÉ DÒ MỚI NHẤT:
        </h2>
        <div style={{ width: "100%" }}>
          <Slider ref={(c) => (this.slider = c)} {...settings}>
            {renderCard()}
          </Slider>
        </div>
        {renderArrow(vertical)}
      </div>
    );
  }
}
