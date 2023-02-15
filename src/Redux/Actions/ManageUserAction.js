import { manageUserService } from "../../Services/ManageUserService";
import {
  CHANGE_PASSWORD,
  CHANGE_PROFILE,
  LOGIN,
  LOGIN_WITH_GOOGLE,
  LOGOUT,
  SET_UPDATE_USER,
  SET_USERS,
  SIGNUP,
} from "./Types/ManageUserType";

import { displayLoadingAction, hiddenLoadingAction } from "./LoadingActions";
import { history } from "../../App";
import { getStationsAction } from "./ManageStationsAction";
import { getLotteriesAction } from "./ManageLotteriesAction";
import { DISPLAY_ERRORS } from "./Types/ErrorType";

export const postLogin = (userInfor) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      let result = await manageUserService.postLogin(userInfor);

      if (result.data.statusCode === 200) {
        dispatch({
          type: LOGIN,
          userLogin: result.data.content,
        });
      }
      await dispatch(hiddenLoadingAction);
      history.push(`/profile/${result.data.content.userId}`);
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

export const postSignup = (userInfor) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.postSignup(userInfor);

      if (
        result.data.statusCode === 200 &&
        result.data.message === "TẠO NGƯỜI DÙNG THÀNH CÔNG"
      ) {
        dispatch({
          type: SIGNUP,
          userLogin: result.data.content,
        });
      } else if (result.data.statusCode === 200 && result.data.sendMailStatus) {
        window.alert(
          "GỬI EMAIL XÁC THỰC THÀNH CÔNG, VUI LÒNG ĐĂNG NHẬP EMAIL ĐỂ XÁC THỰC TÀI KHOẢN!"
        );
      }
      await dispatch(hiddenLoadingAction);
      history.push("/home");
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

export const getGoogleLoginSuccessAction = () => {
  return async (dispatch) => {
    try {
      let result = await manageUserService.getGoogleLoginSuccess();
      if (result.status === 200) {
        let data = await result.json();

        if (data.googleSignup) {
          dispatch({
            type: LOGIN_WITH_GOOGLE,
            googleLogin: data.content,
          });
          history.push("/signup/google");
        } else {
          dispatch({
            type: LOGIN,
            userLogin: data.content,
          });
        }
      } else if (result.status === 401) {
        dispatch({
          type: LOGIN,
          userLogin: {},
        });
      }
    } catch (err) {
      const action = {
        type: DISPLAY_ERRORS,
        message: err.response.data,
      };

      dispatch(action);
      console.log(err);
    }
  };
};

export const getLogout = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.getLogout();
      if (result.data.statusCode === 200) {
        await dispatch({
          type: LOGOUT,
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

export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.getUsers();
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_USERS,
          arrUsers: result.data.content.users,
          arrTickets: result.data.content.tickets,
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

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.getUser(id);
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_UPDATE_USER,
          updateUser: result.data.content.user,
          tickets: result.data.content.tickets
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

export const addNewUserAction = (userInfor) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.addNewUser(userInfor);
      if (result.data.statusCode === 200) {
        alert("THÊM NGƯỜI DÙNG THÀNH CÔNG!");
        const action = getUsers();
        await dispatch(action);
        history.push("/administration/manageusers");
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

export const updateUserAdminAction = (userInfor, id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.updateUser(userInfor, id);
      if (result.data.statusCode === 200) {
        alert("CẬP NHẬT NGƯỜI DÙNG THÀNH CÔNG!");
        const action = getUsers();
        await dispatch(action);
        history.push("/administration/manageusers");
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

export const deleteUsersAdminAction = (arrUsersId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.deleteUsers(arrUsersId);
      if (result.data.statusCode === 200) {
        alert("XÓA NGƯỜI DÙNG THÀNH CÔNG!");
        const action = getUsers();
        await dispatch(action);
        history.push("/administration/manageusers");
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

export const deleteUserAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.deleteUser(id);
      if (result.data.statusCode === 200) {
        alert("XÓA NGƯỜI DÙNG THÀNH CÔNG!");
        const action = getUsers();
        await dispatch(action);
        history.push("/administration/manageusers");
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

export const dashboardAdminAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await dispatch(getUsers());
      await dispatch(getStationsAction());
      await dispatch(getLotteriesAction());
      await dispatch(hiddenLoadingAction);
    } catch (err) {
      dispatch(hiddenLoadingAction);
      alert(err.response.data.message);
      console.log(err);
    }
  };
};

export const changeProfileAction = (userInfor, id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.changeProfile(userInfor, id);
      if (result.data.statusCode === 200) {
        alert("THAY ĐỔI THÔNG TIN NGƯỜI DÙNG THÀNH CÔNG!");
        const action = {
          type: CHANGE_PROFILE,
          updateUser: result.data.content,
        };
        await dispatch(action);
        history.goBack();
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

export const changePasswordAction = (userInfor, id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.changePassword(userInfor, id);
      if (result.data.statusCode === 200) {
        alert("THAY ĐỔI MẬT KHẨU NGƯỜI DÙNG THÀNH CÔNG!");
        const action = {
          type: CHANGE_PASSWORD,
          updateUser: result.data.content,
        };
        await dispatch(action);
        history.goBack();
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

export const forgotPasswordAction = (email) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await manageUserService.forgotPassword(email);
      if (result.data.statusCode === 200) {
        window.alert("MẬT KHẨU MỚI ĐÃ ĐƯỢC GỬI TỚI EMAIL CỦA BẠN");
        history.goBack();
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
