import { SET_CAROUSEL } from "../Actions/Types/CarouselType";

const defaultState = {
  arrImg: [
    {
      open: {
        weekDay: ["Thursday"],
        time: "17:15:00",
      },
      descriptions: {
        address: "304 Phan Bội Châu - Tp. Quy Nhơn - Tỉnh Bình Định",
        phoneNum: "02563822242",
        webSite: "http://www.xosobinhdinh.com.vn/",
      },
      _id: "635f319167650f04fafe8fea",
      name: "Bình Định",
      baseUrlAPI:
        "https://www.minhngoc.com.vn/ket-qua-xo-so/mien-trung/binh-dinh",
      __v: 0,
      imgUrl:
        "https://www.minhchinh.com/upload/images/veso/IMG_20221104_0007.jpg",
      hoursdiff: -23511216,
      today: false,
    },
  ],
};

export const CarouselReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CAROUSEL: {
      state.arrImg = action.arrImg;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
