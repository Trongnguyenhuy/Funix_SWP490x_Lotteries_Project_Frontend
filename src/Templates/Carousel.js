import { Carousel } from 'antd';
import React from 'react';
const contentStyle = {
  height: '625px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  margin: '0'
};
const CarouselHeader = () => (
  <Carousel effect="fade" autoplay>
    <div>
      <h3 style={contentStyle}><img
        src="https://www.minhchinh.com/upload/images/veso/IMG_20221104_0009.jpg"
        className="block w-full"
        alt="..."
      />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
      <img
        src="https://www.minhchinh.com/upload/images/veso/IMG_0017(1).png"
        className="block w-full"
        alt="..."
      />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
      <img
        src="https://www.minhchinh.com/upload/images/veso/IMG_0018(1).png"
        className="block w-full"
        alt="..."
      />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
      <img
        src="https://www.minhchinh.com/upload/images/veso/IMG_0019(1).png"
        className="block w-full"
        alt="..."
      />
      </h3>
    </div>
  </Carousel>
);
export default CarouselHeader;