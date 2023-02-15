import {
  CHANGE_TAB_CHECK_TICKET,
  CHECK_TICKET,
  CHECK_TICKET_FALL,
  CHECK_TICKET_FOR_USER,
  CLEAR_TICKET,
  EDIT_LOTTERY_ADMIN_FINISH,
  GET_EDIT_LOTTERY_ADMIN,
  SET_LOTTERIES,
  SET_LOTTERIES_BY_STATION,
  SET_LOTTERIES_BY_STATION_AND_DAY,
  SET_LOTTERIES_BY_STATION_INITIAL,
  SET_LOTTERIES_BY_ZONE,
  SET_LOTTERIES_CENTERZONE,
  SET_LOTTERIES_DETAIL,
  SET_LOTTERIES_DETAIL_LIST,
  SET_LOTTERIES_NORTHZONE,
  SET_LOTTERIES_SOUTHZONE,
  SET_STATIC_LOTTERY_DATA,
} from "../Actions/Types/ManageLotteriesTypes";

import { sortDate, sortName } from "../../Utils/helper/helperFunction";

const defaultState = {
  arrLotteries: [
    {
      result: {
        jackpot: ["57765"],
        signJackpot: ["9FA", "13FA", "3FA", "2FA", "11FA", "12FA"],
        firstNum: ["69270"],
        secondNum: ["33523", "02685"],
        thirdNum: ["84523", "77290", "28378", "00860", "06188", "76005"],
        fourthNum: ["0445", "9065", "6142", "8859"],
        fifthNum: ["8856", "4721", "1409", "3307", "7321", "9251"],
        sixthNum: ["866", "778", "530"],
        seventhNum: ["17", "42", "90", "34"],
        eighthNum: [],
      },
      _id: "636bb8443f39fcdee9a210bb",
      stationId: {
        open: {
          weekDay: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          time: "18:15:00",
        },
        descriptions: {
          address: "53E Hàng Bài - Q.Hoàn Kiếm - Tp. Hà Nội",
          phoneNum: "049433636",
          webSite: "http://xosothudo.com.vn/",
        },
        _id: "635f3918ada19a800c8f6f65",
        name: "Miền Bắc",
        baseUrlAPI: "https://www.minhngoc.com.vn/ket-qua-xo-so/mien-bac",
        __v: 0,
        fullName: "Công ty TNHH MTV Xổ Số Kiến Thiết Thủ Đô",
        zoneCode: "MB01",
      },
      date: "09/11/2022",
      imgUrl:
        "https://www.minhngoc.net.vn/upload/images/veso/mb_06-11-2012.jpg",
      __v: 0,
    },
  ],
  filterLotteries: [
    {
      result: {
        jackpot: ["305158"],
        firstNum: ["31585"],
        secondNum: ["98283"],
        thirdNum: ["95173", "72225"],
        fourthNum: [
          "38013",
          "07628",
          "73391",
          "36502",
          "24223",
          "77416",
          "82026",
        ],
        fifthNum: ["8915"],
        sixthNum: ["3030", "6905", "7846"],
        seventhNum: ["509"],
        eighthNum: ["39"],
        signJackpot: [],
      },
      _id: "636bb8543f39fcdee9a210bf",
      stationId: {
        open: {
          weekDay: ["Sunday"],
          time: "16:15:00",
        },
        descriptions: {
          address: "số 4-6 Hồ Tùng Mậu - Phường 3 - Tp Đà Lạt - Tỉnh Lâm Đồng",
          phoneNum: "02633822111",
          webSite: "http://www.xosodalat.com.vn/",
        },
        _id: "635f33b77ffa56cc33a6aa38",
        name: "Đà Lạt",
        zoneCode: "MN01",
        baseUrlAPI: "https://www.minhngoc.com.vn/ket-qua-xo-so/mien-nam/da-lat",
        __v: 0,
        fullName: "Công ty TNHH MTV Xổ Số Kiến Thiết Lâm Đồng",
      },
      date: "06/11/2022",
      imgUrl: "https://www.minhchinh.com/upload/images/veso/IMG_0013(6).png",
      __v: 0,
    },
  ],
  filterLotteriesByStation: [
    {
      result: {
        jackpot: ["57765"],
        signJackpot: ["9FA", "13FA", "3FA", "2FA", "11FA", "12FA"],
        firstNum: ["69270"],
        secondNum: ["33523", "02685"],
        thirdNum: ["84523", "77290", "28378", "00860", "06188", "76005"],
        fourthNum: ["0445", "9065", "6142", "8859"],
        fifthNum: ["8856", "4721", "1409", "3307", "7321", "9251"],
        sixthNum: ["866", "778", "530"],
        seventhNum: ["17", "42", "90", "34"],
        eighthNum: [],
      },
      _id: "636bb8443f39fcdee9a210bb",
      stationId: {
        open: {
          weekDay: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          time: "18:15:00",
        },
        descriptions: {
          address: "53E Hàng Bài - Q.Hoàn Kiếm - Tp. Hà Nội",
          phoneNum: "049433636",
          webSite: "http://xosothudo.com.vn/",
        },
        _id: "635f3918ada19a800c8f6f65",
        name: "Miền Bắc",
        baseUrlAPI: "https://www.minhngoc.com.vn/ket-qua-xo-so/mien-bac",
        __v: 0,
        fullName: "Công ty TNHH MTV Xổ Số Kiến Thiết Thủ Đô",
        zoneCode: "MB01",
      },
      date: "09/11/2022",
      imgUrl:
        "https://www.minhngoc.net.vn/upload/images/veso/mb_06-11-2012.jpg",
      __v: 0,
    },
  ],
  lotteryDetail: {
    result: {
      jackpot: ["305158"],
      firstNum: ["31585"],
      secondNum: ["98283"],
      thirdNum: ["95173", "72225"],
      fourthNum: [
        "38013",
        "07628",
        "73391",
        "36502",
        "24223",
        "77416",
        "82026",
      ],
      fifthNum: ["8915"],
      sixthNum: ["3030", "6905", "7846"],
      seventhNum: ["509"],
      eighthNum: ["39"],
      signJackpot: [],
    },
    _id: "636bb8543f39fcdee9a210bf",
    stationId: {
      open: {
        weekDay: ["Sunday"],
        time: "16:15:00",
      },
      descriptions: {
        address: "số 4-6 Hồ Tùng Mậu - Phường 3 - Tp Đà Lạt - Tỉnh Lâm Đồng",
        phoneNum: "02633822111",
        webSite: "http://www.xosodalat.com.vn/",
      },
      _id: "635f33b77ffa56cc33a6aa38",
      name: "Đà Lạt",
      zoneCode: "MN01",
      baseUrlAPI: "https://www.minhngoc.com.vn/ket-qua-xo-so/mien-nam/da-lat",
      __v: 0,
      fullName: "Công ty TNHH MTV Xổ Số Kiến Thiết Lâm Đồng",
    },
    date: "06/11/2022",
    imgUrl: "https://www.minhchinh.com/upload/images/veso/IMG_0013(6).png",
    __v: 0,
  },
  lotteryDetailList: [
    {
      result: {
        jackpot: ["305158"],
        firstNum: ["31585"],
        secondNum: ["98283"],
        thirdNum: ["95173", "72225"],
        fourthNum: [
          "38013",
          "07628",
          "73391",
          "36502",
          "24223",
          "77416",
          "82026",
        ],
        fifthNum: ["8915"],
        sixthNum: ["3030", "6905", "7846"],
        seventhNum: ["509"],
        eighthNum: ["39"],
        signJackpot: [],
      },
      _id: "636bb8543f39fcdee9a210bf",
      stationId: {
        open: {
          weekDay: ["Sunday"],
          time: "16:15:00",
        },
        descriptions: {
          address: "số 4-6 Hồ Tùng Mậu - Phường 3 - Tp Đà Lạt - Tỉnh Lâm Đồng",
          phoneNum: "02633822111",
          webSite: "http://www.xosodalat.com.vn/",
        },
        _id: "635f33b77ffa56cc33a6aa38",
        name: "Đà Lạt",
        zoneCode: "MN01",
        baseUrlAPI: "https://www.minhngoc.com.vn/ket-qua-xo-so/mien-nam/da-lat",
        __v: 0,
        fullName: "Công ty TNHH MTV Xổ Số Kiến Thiết Lâm Đồng",
      },
      date: "06/11/2022",
      imgUrl: "https://www.minhchinh.com/upload/images/veso/IMG_0013(6).png",
      __v: 0,
    },
  ],
  lotteriesByStation: [
    {
      result: {
        jackpot: ["57765"],
        signJackpot: ["9FA", "13FA", "3FA", "2FA", "11FA", "12FA"],
        firstNum: ["69270"],
        secondNum: ["33523", "02685"],
        thirdNum: ["84523", "77290", "28378", "00860", "06188", "76005"],
        fourthNum: ["0445", "9065", "6142", "8859"],
        fifthNum: ["8856", "4721", "1409", "3307", "7321", "9251"],
        sixthNum: ["866", "778", "530"],
        seventhNum: ["17", "42", "90", "34"],
        eighthNum: [],
      },
      _id: "636bb8443f39fcdee9a210bb",
      stationId: {
        open: {
          weekDay: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          time: "18:15:00",
        },
        descriptions: {
          address: "53E Hàng Bài - Q.Hoàn Kiếm - Tp. Hà Nội",
          phoneNum: "049433636",
          webSite: "http://xosothudo.com.vn/",
        },
        _id: "635f3918ada19a800c8f6f65",
        name: "Miền Bắc",
        baseUrlAPI: "https://www.minhngoc.com.vn/ket-qua-xo-so/mien-bac",
        __v: 0,
        fullName: "Công ty TNHH MTV Xổ Số Kiến Thiết Thủ Đô",
        zoneCode: "MB01",
      },
      date: "09/11/2022",
      imgUrl:
        "https://www.minhngoc.net.vn/upload/images/veso/mb_06-11-2012.jpg",
      __v: 0,
    },
  ],
  lotteriesByZone: [
    {
      result: {
        jackpot: ["57765"],
        signJackpot: ["9FA", "13FA", "3FA", "2FA", "11FA", "12FA"],
        firstNum: ["69270"],
        secondNum: ["33523", "02685"],
        thirdNum: ["84523", "77290", "28378", "00860", "06188", "76005"],
        fourthNum: ["0445", "9065", "6142", "8859"],
        fifthNum: ["8856", "4721", "1409", "3307", "7321", "9251"],
        sixthNum: ["866", "778", "530"],
        seventhNum: ["17", "42", "90", "34"],
        eighthNum: [],
      },
      _id: "636bb8443f39fcdee9a210bb",
      stationId: {
        open: {
          weekDay: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          time: "18:15:00",
        },
        descriptions: {
          address: "53E Hàng Bài - Q.Hoàn Kiếm - Tp. Hà Nội",
          phoneNum: "049433636",
          webSite: "http://xosothudo.com.vn/",
        },
        _id: "635f3918ada19a800c8f6f65",
        name: "Miền Bắc",
        baseUrlAPI: "https://www.minhngoc.com.vn/ket-qua-xo-so/mien-bac",
        __v: 0,
        fullName: "Công ty TNHH MTV Xổ Số Kiến Thiết Thủ Đô",
        zoneCode: "MB01",
      },
      date: "09/11/2022",
      imgUrl:
        "https://www.minhngoc.net.vn/upload/images/veso/mb_06-11-2012.jpg",
      __v: 0,
    },
  ],
  checkTicketResult: {},
  checkTicketHistory: {},
  tabActive: "1",
  editLotteryAdmin: {},
  staticLotteryData: [],
  checkTicketFall: false,
};

export const ManageLotteriesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOTTERIES: {
      let sortArr = action.arrLotteries.sort((a, b) => {
        return sortDate(a.date, b.date,'N');
      });

      state.arrLotteries = sortArr;
      state.filterLotteries = state.arrLotteries.filter(
        (item) => item.stationId.zoneCode === "MB01"
      );
      state.zoneCode = "MB01";
      return { ...state };
    }
    case SET_LOTTERIES_NORTHZONE: {
      let filterArr = state.arrLotteries.filter(
        (item) => item.stationId.zoneCode === "MB01"
      );
      state.filterLotteries = filterArr.slice(0, 6);
      state.zoneCode = "MB01";
      return { ...state };
    }
    case SET_LOTTERIES_CENTERZONE: {
      let filterArr = state.arrLotteries.filter(
        (item) => item.stationId.zoneCode === "MT01"
      );
      state.filterLotteries = filterArr.slice(0, 6);
      state.zoneCode = "MT01";
      return { ...state };
    }
    case SET_LOTTERIES_SOUTHZONE: {
      let filterArr = state.arrLotteries.filter(
        (item) => item.stationId.zoneCode === "MN01"
      );
      state.filterLotteries = filterArr.slice(0, 6);
      state.zoneCode = "MN01";
      return { ...state };
    }
    case SET_LOTTERIES_BY_STATION: {
      state.filterLotteriesByStation = state.arrLotteries.filter(
        (item) => item.stationId.name === action.station
      );
      return { ...state };
    }
    case SET_LOTTERIES_BY_STATION_INITIAL: {
      state.filterLotteriesByStation = state.arrLotteries.filter(
        (item) => item.stationId.name === action.station
      );
      state.zoneCode = "MB01";
      return { ...state };
    }
    case SET_LOTTERIES_DETAIL: {
      state.lotteryDetail = action.lotteryDetail;
      state.zoneCode = action.lotteryDetail.zoneCode;
      return { ...state };
    }
    case SET_LOTTERIES_DETAIL_LIST: {
      state.lotteryDetailList = action.lotteryDetailList;
      state.zoneCode = action.lotteryDetailList[0].zoneCode;
      return { ...state };
    }
    case SET_LOTTERIES_BY_STATION_AND_DAY: {
      state.lotteriesByStation = action.arrLotteries;
      return { ...state };
    }
    case SET_LOTTERIES_BY_ZONE: {
      state.lotteriesByZone = action.lotteriesByZone;
      return { ...state };
    }

    case CHECK_TICKET: {
      state.checkTicketResult = action.checkTicketResult.results;
      state.checkTicketFall = false;
      return { ...state };
    }

    case CHECK_TICKET_FALL: {
      state.checkTicketFall = true;
      return { ...state };
    }

    case CLEAR_TICKET: {
      state.checkTicketResult = {};
      return { ...state };
    }

    case CHECK_TICKET_FOR_USER: {
      state.checkTicketResult = action.checkTicketResult.results;
      state.checkTicketHistory = action.checkTicketResult.history;
      state.checkTicketFall = 0;
      return { ...state };
    }

    case CHANGE_TAB_CHECK_TICKET: {
      state.tabActive = action.tabActive;
      return { ...state };
    }

    case GET_EDIT_LOTTERY_ADMIN: {
      state.editLotteryAdmin = action.editLotteryAdmin;
      return { ...state };
    }

    case EDIT_LOTTERY_ADMIN_FINISH: {
      state.editLotteryAdmin = {};
      return { ...state };
    }

    case SET_STATIC_LOTTERY_DATA: {
      state.staticLotteryData = action.staticLotteryData.sort((a,b) => {
        return sortName(a.month, b.month);
      });
      return { ...state };
    }

    default:
      return { ...state };
  }
};
