import { manageLotteryService } from "../../Services/ManageLotteryService";
import {
  CHANGE_TAB_CHECK_TICKET,
  CHECK_TICKET,
  CHECK_TICKET_FALL,
  CHECK_TICKET_FOR_USER,
  EDIT_LOTTERY_ADMIN_FINISH,
  GET_EDIT_LOTTERY_ADMIN,
  SET_LOTTERIES,
  SET_LOTTERIES_BY_STATION_AND_DAY,
  SET_LOTTERIES_BY_ZONE,
  SET_LOTTERIES_DETAIL,
  SET_LOTTERIES_DETAIL_LIST,
  SET_STATIC_LOTTERY_DATA,
} from "./Types/ManageLotteriesTypes";
import { sortName } from "../../Utils/helper/helperFunction";
import { displayLoadingAction, hiddenLoadingAction } from "./LoadingActions";
import { history } from "../../App";
import { DISPLAY_ERRORS } from "./Types/ErrorType";
import { getUsers } from "./ManageUserAction";

export const getLotteriesAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.getLotteries();
      dispatch({
        type: SET_LOTTERIES,
        arrLotteries: result.data.content.sort(sortName),
      });

      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const getLotteriesDetailAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.getLotteriesDetail(id);
      dispatch({
        type: SET_LOTTERIES_DETAIL,
        lotteryDetail: result.data.content[0],
      });

      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const getLotteriesDetailListAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.getLotteriesDetailList(id);
      dispatch({
        type: SET_LOTTERIES_DETAIL_LIST,
        lotteryDetailList: result.data.content,
      });

      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const getLotteriesByStationAndDateAction = (
  stationName,
  zoneCode,
  date
) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.getLotteriesByStationAndDate(
        stationName,
        zoneCode,
        date
      );
      dispatch({
        type: SET_LOTTERIES_BY_STATION_AND_DAY,
        arrLotteries: result.data.content.sort(sortName),
      });

      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const getLotteriesByZoneAction = (zone) => {
  let zoneCode =
    zone === "Miền Bắc" ? "MB01" : zone === "Miền Trung" ? "MT01" : "MN01";
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.getLotteriesByZone(zoneCode);
      dispatch({
        type: SET_LOTTERIES_BY_ZONE,
        lotteriesByZone: result.data.content,
      });

      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const checkTicketAction = (ticketInfor) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await manageLotteryService.checkTicket(ticketInfor);

      if (result.data.statusCode === 200) {
        dispatch({
          type: CHECK_TICKET,
          checkTicketResult: result.data.content,
        });
      } else {
        await dispatch({
          type: CHECK_TICKET_FALL
        })
      }

      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const checkTicketForUserAction = (ticketInfor) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await manageLotteryService.checkTicketForUser(ticketInfor);

      if (result.data.statusCode === 200) {
        dispatch({
          type: CHECK_TICKET_FOR_USER,
          checkTicketResult: result.data.content,
        });
        dispatch(changeTabCheckTicketAction("2"));
      }
      
      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const changeTabCheckTicketAction = (key) => {
  return {
    type: CHANGE_TAB_CHECK_TICKET,
    tabActive: key,
  };
};

export const addnewLotteryAction = (lotteryInfor) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await manageLotteryService.addNewLottery(lotteryInfor);

      if (result.data.statusCode === 200) {
        alert("THÊM MỚI VÉ DÒ MỚI THÀNH CÔNG");
        await dispatch({
          type: EDIT_LOTTERY_ADMIN_FINISH,
        });
      }
      await dispatch(hiddenLoadingAction);
      history.push("/administration/managelotteries");
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const addnewLotteryAutoAction = (lotteryInfor) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await manageLotteryService.addNewLotteryAuto(lotteryInfor);

      if (result.data.statusCode === 200) {
        alert("LẤY DỮ LIỆU THÀNH CÔNG");
        await dispatch({
          type: GET_EDIT_LOTTERY_ADMIN,
          editLotteryAdmin: result.data.content,
        });
      }
      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const getEditLotteryAdminAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.getLotteriesDetail(id);
      dispatch({
        type: GET_EDIT_LOTTERY_ADMIN,
        editLotteryAdmin: result.data.content[0],
      });

      dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const putEditLotteryAdminAction = (updateLotteryInfor, id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.updateLottery(
        updateLotteryInfor,
        id
      );

      if (result.data.statusCode === 200) {
        alert("CẬP NHẬT VÉ DÒ THÀNH CÔNG!");
      }

      await dispatch(hiddenLoadingAction);
      history.push("/administration/managelotteries");
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const deleteLotteryAdminAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.deleteLottery(id);

      if (result.data.statusCode === 200) {
        alert("XÓA VÉ DÒ THÀNH CÔNG!");
      }

      await dispatch(getLotteriesAction());
      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const deleteLotteriesAdminAction = (lotteries) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.deleteLotteries(lotteries);

      if (result.data.statusCode === 200) {
        alert("XÓA VÉ DÒ THÀNH CÔNG!");
      }
      await dispatch(getLotteriesAction());
      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};


export const getStaticLotteryAction = (year) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.getStaticLottery(year);
      dispatch({
        type: SET_STATIC_LOTTERY_DATA,
        staticLotteryData: result.data.content,
      });

      dispatch(hiddenLoadingAction);
    } catch (err) {

      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const deleteTicketAdminAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.deleteTicket(id);

      if (result.data.statusCode === 200) {
        window.alert(`XÓA LỊCH SỬ DÒ SỐ THÀNH CÔNG!`);
      }

      await dispatch(getUsers());
      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};
