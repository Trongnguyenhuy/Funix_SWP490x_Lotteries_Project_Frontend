import {
  SET_STATION,
  SET_STATIONS,
  SET_STATIONS_CENTERZONE,
  SET_STATIONS_NORTHZONE,
  SET_STATIONS_SOUTHZONE,
} from "../Actions/Types/ManageStationsType";
import { sortName, modifyStationName } from "../../Utils/helper/helperFunction";

const defaultState = {
  arrStations: [
    {
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
      baseUrlAPI: "https://www.minhngoc.com.vn/ket-qua-xo-so/mien-nam/da-lat",
      __v: 0,
      fullName: "Công ty TNHH MTV Xổ Số Kiến Thiết Lâm Đồng",
      zoneCode: "MN01",
    },
  ],
  defaultStation: [
    {
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
      baseUrlAPI: "https://www.minhngoc.com.vn/ket-qua-xo-so/mien-nam/da-lat",
      __v: 0,
      fullName: "Công ty TNHH MTV Xổ Số Kiến Thiết Lâm Đồng",
      zoneCode: "MN01",
    },
  ],
  zoneCode: "MN01",
  station: {},
};

export const ManageStationsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_STATIONS: {
      state.defaultStation = action.arrStations.sort((a, b) => {
        const nameA = modifyStationName(a.name);
        const nameB = modifyStationName(b.name);
        return sortName(nameA, nameB);
      });

      state.arrStations = state.defaultStation.filter(
        (item) => item.zoneCode === "MB01"
      );

      
      state.zoneCode = "MB01";
      return { ...state };
    }
    case SET_STATIONS_NORTHZONE: {
      state.arrStations = state.defaultStation.filter(
        (item) => item.zoneCode === "MB01"
      );
      state.zoneCode = "MB01";
      return { ...state };
    }
    case SET_STATIONS_CENTERZONE: {
      state.arrStations = state.defaultStation.filter(
        (item) => item.zoneCode === "MT01"
      );
      state.zoneCode = "MT01";
      return { ...state };
    }
    case SET_STATIONS_SOUTHZONE: {
      state.arrStations = state.defaultStation.filter(
        (item) => item.zoneCode === "MN01"
      );
      state.zoneCode = "MN01";
      return { ...state };
    }

    case SET_STATION: {
      state.station = action.station;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
