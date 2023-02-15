// import { history } from "../../App";
import {
  CHANGE_PASSWORD,
  CHANGE_PROFILE,
  LOGIN,
  LOGIN_WITH_GOOGLE,
  LOGOUT,
  SET_UPDATE_USER,
  SET_USERS,
  SIGNUP,
} from "../Actions/Types/ManageUserType";

let user = {};

if (localStorage.getItem("USER_LOGIN")) {
  user = JSON.parse(localStorage.getItem("USER_LOGIN"));
}

const defaultState = {
  userLogin: user,
  googleLogin: {},
  arrUsers: [],
  arrTickets: [],
  updateUser: {},
};

export const ManageUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN: {
      const { userLogin } = action;

      localStorage.setItem("USER_LOGIN", JSON.stringify(userLogin));

      localStorage.setItem("TOKEN", JSON.stringify(userLogin.token));

      state.userLogin = userLogin;

      return { ...state };
    }

    case SIGNUP: {
      const { userLogin } = action;

      localStorage.setItem("USER_LOGIN", JSON.stringify(userLogin));

      localStorage.setItem("TOKEN", JSON.stringify(userLogin.token));

      state.userLogin = userLogin;

      return { ...state };
    }

    case LOGIN_WITH_GOOGLE: {
      const { googleLogin } = action;

      state.googleLogin = googleLogin;

      return { ...state };
    }

    case LOGOUT: {
      localStorage.removeItem("USER_LOGIN");
      localStorage.removeItem("TOKEN");

      state.userLogin = {};

      return { ...state };
    }

    case SET_USERS: {

      state.arrUsers = action.arrUsers;
      state.arrTickets = action.arrTickets;

      return { ...state };
    }

    case SET_UPDATE_USER: {
      state.updateUser = action.updateUser;
      state.arrTickets = action.tickets;
      return { ...state };
    }

    case CHANGE_PROFILE: {
      const { updateUser } = action;

      localStorage.setItem("USER_LOGIN", JSON.stringify(updateUser));

      localStorage.setItem("TOKEN", JSON.stringify(updateUser.token));

      state.userLogin = updateUser;
      state.updateUser = updateUser;
      return { ...state };
    }

    case CHANGE_PASSWORD: {
      const { updateUser } = action;

      localStorage.setItem("USER_LOGIN", JSON.stringify(updateUser));

      localStorage.setItem("TOKEN", JSON.stringify(updateUser.token));

      state.userLogin = updateUser;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
