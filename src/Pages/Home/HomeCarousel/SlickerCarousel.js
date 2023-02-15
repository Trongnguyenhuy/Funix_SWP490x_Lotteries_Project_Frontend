import { Button } from "antd";
import React, { Component } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import CountDownTimer from "../../../Components/CountDown/CountDown";

export default class HomeCarouselSlide extends Component {
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
    const { arrImg } = this.props;
    const contentStyle = {
      color: "#000000",
      lineHeight: "160px",
      textAlign: "center",
      backgroundPosition: "center",
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
    };

    const renderImg = () => {
      return arrImg.map((item, index) => {
        let imgUrl = `url('${item.imgUrl}')`;

        return (
          <div key={'imgUrl' + index} className="relative">
            <div
              style={{ ...contentStyle, backgroundImage: imgUrl }}
              className="max-h-fit"
            >
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-full max-h-fit lg:max-h-[32rem]  opacity-0"
              />
            </div>
            <div className="absolute bottom-2 left-14 md:left-1/3 lg:bottom-10 lg:left-32 z-20">
              <CountDownTimer item={item} />
            </div>
          </div>
        );
      });
    };

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: "linear",
    };
    return (
      <div className="relative">
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          {renderImg()}
        </Slider>
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
      </div>
    );
  }
}

