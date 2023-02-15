import { Button } from "antd";
import React, { Component } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import FlipCard from "../../FlipCard/FlipCard";
import "../SlideCard.css";

export default class HorizontalSlide extends Component {
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
    const { arrLotteries } = this.props;
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear",
    };

    const renderLotteries = () => {
      return arrLotteries.map((item, index) => {
        return (
          <div key={index} className="m-2 p-2">
            <FlipCard item={item} />
          </div>
        );
      });
    };

    return (
      <div>
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          {renderLotteries()}
        </Slider>
        <div className="mt-6">
          <Button
            onClick={this.previous}
            type="primary"
            ghost
            size="middle"
            icon={<LeftOutlined />}
            shape="circle"
          />
          <Button
            onClick={this.next}
            type="primary"
            ghost
            size="middle"
            icon={<RightOutlined />}
            shape="circle"
          />
        </div>
      </div>
    );
  }
}
