import moment from "moment";

export const sortName = (a, b, option) => {
  let sortBy = 1;
  if (option === "desc") {
    sortBy = -1;
  }
  const nameA = a;
  const nameB = b;
  if (nameA < nameB) {
    return -1 * sortBy;
  }
  if (nameA > nameB) {
    return 1 * sortBy;
  }
  return 0;
};

export const sortDate = (a, b, option) => {
  const dateStrA = modifyDateString(a);
  const dateStrB = modifyDateString(b);

  const dateA = new Date(dateStrA);
  const dateB = new Date(dateStrB);

  let compare = dateA - dateB;

  if (option === "N") {
    compare = -1 * compare;
  }

  return compare;
};

export const translateDay = (Day, lan) => {
  const engDayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const vnDayArr = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  let indexDay;

  if (lan === "vn") {
    indexDay = engDayArr.indexOf(Day);
    return vnDayArr[indexDay];
  } else if (lan === "en") {
    indexDay = vnDayArr.indexOf(Day);
    return engDayArr[indexDay];
  }
};

export const coverDateToDayVn = (Day) => {
  const vnDayArr = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  let strDay = Day.split("/");
  let arrDay = [strDay[2], strDay[1], strDay[0]];
  arrDay = arrDay.join("-");
  let d = new Date(arrDay);
  return vnDayArr[d.getDay()];
};

export const modifyDateString = (Day) => {
  let strDay = Day.split("/");
  let arrDay = [strDay[2], strDay[1], strDay[0]];
  arrDay = arrDay.join("-");
  return arrDay;
};

export const coverVnDateString = (Day) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return Day.toLocaleDateString("en-GB", options);
};

export const checkZoneCode = (zoneCode, toName = 1) => {
  let arrCode = ["MB01", "MN01", "MT01"];
  let arrName = ["Miền Bắc", "Miền Nam", "Miền Trung"];
  if (toName === 1) {
    let index = arrCode.indexOf(zoneCode);
    return arrName[index];
  } else {
    let index = arrName.indexOf(zoneCode);
    return arrCode[index];
  }
};

export const isObjEmpty = (obj) => {
  for (var x in obj) {
    return false;
  }
  return true;
};

export const modifyStationName = (stationName) => {
  const name = stationName.toLowerCase();
  const originalArr = [
    "bình định",
    "gia lai",
    "khánh hòa",
    "kon tum",
    "ninh thuận",
    "phú yên",
    "quảng bình",
    "quảng nam",
    "quảng ngãi",
    "quảng trị",
    "thừa thiên huế",
    "đà nẵng",
    "đắk lắk",
    "đắk nông",
    "an giang",
    "bình dương",
    "bình phước",
    "bình thuận",
    "bạc liêu",
    "bến tre",
    "cà mau",
    "cần thơ",
    "hậu giang",
    "kiên giang",
    "long an",
    "sóc trăng",
    "tiền giang",
    "tp. hồ chí minh",
    "trà vinh",
    "tây ninh",
    "vĩnh long",
    "vũng tàu",
    "đà lạt",
    "đồng nai",
    "đồng tháp",
    "miền bắc",
  ];
  const translateArr = [
    "binh dinh",
    "gia lai",
    "khanh hoa",
    "kon tum",
    "ninh thuan",
    "phu yen",
    "quang binh",
    "quang nam",
    "quang ngai",
    "quang tri",
    "thua thien hue",
    "da nang",
    "dak lak",
    "dak nong",
    "an giang",
    "binh duong",
    "binh phuoc",
    "binh thuan",
    "bac lieu",
    "ben tre",
    "ca mau",
    "can tho",
    "hau giang",
    "kien giang",
    "long an",
    "soc trang",
    "tien giang",
    "tp. ho chi minh",
    "tra vinh",
    "tay ninh",
    "vinh long",
    "vung tau",
    "da lat",
    "dong nai",
    "dong thap",
    "mien bac",
  ];

  let index = originalArr.indexOf(name);
  return translateArr[index];
};

export const checkIsNew = (date) => {
  const now = new Date();

  const yesterday = new Date(Date.now() - 86400000);
  const twoDayAgo = new Date(Date.now() - 86400000 * 2);
  const threeDayAgo = new Date(now.setDate(now.getDate() - 3));

  if (
    date === moment(now).format("DD/MM/YYYY") ||
    date === moment(yesterday).format("DD/MM/YYYY") ||
    date === moment(twoDayAgo).format("DD/MM/YYYY") ||
    date === moment(threeDayAgo).format("DD/MM/YYYY")
  ) {
    return true;
  }
  return false;
};

export const isNew = (date, arrDay) => {

  if(arrDay.length === 1){
    if (date === arrDay[0].date ) {
      return true;
    } else{
      return false;
    }
  }

  const sortDayArr = arrDay.sort((a, b) => {
    return sortDate(a.date, b.date, "N");
  });

  if (date === sortDayArr[0].date || date === sortDayArr[1].date) {
    return true;
  }

  return false;
};

export const generatePassword = (numberLength) => {
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*_-+=";
  let password = "";
  const seed = alpha.concat(numbers, symbols);

  for (let i = 0; i < numberLength; i++) {
    let character = seed[Math.floor(Math.random() * seed.length)];
    password += character;
  }

  return password;
};

export const getIncludedRowKeys = (arrSelect, arrCheck) => {
  const arrKey = [];

  for (let i = 0; i < arrSelect.length; i++) {
    let findKeyRow = arrCheck.findIndex((a) => {
      return a._id === arrSelect[i];
    });

    if (findKeyRow >= 0) {
      arrKey.push(findKeyRow.toString());
    }
  }

  return arrKey;
};

export const mergeDiffItems = (arr1, arr2) => {
  if (arr1.length < 1) {
    return arr2;
  }

  if (arr2.length < 1) {
    return arr1;
  }

  const arrMerge = [...arr2];

  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) {
      arrMerge.push(arr1[i]);
    }
  }
  return arrMerge;
};
