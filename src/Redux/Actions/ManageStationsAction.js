import { manageStationService } from "../../Services/ManageStationService";
import { SET_STATION, SET_STATIONS } from "./Types/ManageStationsType";
import { displayLoadingAction, hiddenLoadingAction } from "./LoadingActions";
import { history } from "../../App";
import { DISPLAY_ERRORS } from "./Types/ErrorType";

export const getStationsAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageStationService.getStations();

      const stations = result.data.content.filter( station => {
        return station.status
      })

      dispatch({
        type: SET_STATIONS,
        arrStations: stations.sort(sortName),
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

export const getStationAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await manageStationService.getStation(id);

      dispatch({
        type: SET_STATION,
        station: result.data.content,
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

export const addNewStationAction = (stationInfor) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await manageStationService.addNewStation(stationInfor);

      if (result.data.statusCode === 200) {
        alert("THÊM NHÀ ĐÀI THÀNH CÔNG!");
        await dispatch(hiddenLoadingAction);
        history.push("/administration/managestations");
      }
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

export const deleteStationAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await manageStationService.deleteStation(id);

      if (result.data.statusCode === 200) {
        alert("XÓA NHÀ ĐÀI THÀNH CÔNG!");
        await dispatch(hiddenLoadingAction);
        dispatch(getStationsAction());
      }
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

export const deleteStationsAdminAction = (stations) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await manageStationService.deleteStations(stations);

      if (result.data.statusCode === 200) {
        alert("XÓA NHÀ ĐÀI THÀNH CÔNG!");
        await dispatch(hiddenLoadingAction);
        dispatch(getStationsAction());
      }
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

export const putEditStationAdminAction = (updateStationInfor, id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageStationService.updateStation(
        updateStationInfor,
        id
      );

      if (result.data.statusCode === 200) {
        alert("CẬP NHẬT NHÀ ĐÀI THÀNH CÔNG!");
      }

      await dispatch(hiddenLoadingAction);
      history.push("/administration/managestations");
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

const sortName = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};
