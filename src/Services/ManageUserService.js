/* eslint-disable no-useless-constructor */
// email: test867@gmail.com, password: 123456789
import { DOMAIN } from "../Utils/settings/Configs";
import { BaseService } from "./BaseServices";

export class ManageUserService extends BaseService {
  constructor() {
    super();
  }

  postLogin = (userInfor) => {
    // infor{ email, password}
    return this.post(`/usermanager/login`, userInfor);
  };

  postSignup = (userInfor) => {
    // infor{ email, password}
    return this.post(`/usermanager/signup`, userInfor);
  };

  getGoogleLoginSuccess = () => {
    return fetch(`${DOMAIN}/usermanager/auth/google/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
  };

  getLogout = () => {
    return this.get(`/usermanager/logout`);
  };

  getUsers = () => {
    return this.get(`/usermanager/users`);
  };

  addNewUser = (userInfor) => {
    return this.post(`/usermanager/addnewuser`, userInfor);
  };

  deleteUser = (id) => {
    return this.delete(`/usermanager/deleteuser/${id}`);
  };

  deleteUsers = (arrUsersId) => {
    return this.post(`/usermanager/deleteusers`, arrUsersId);
  };

  getUser = (id) => {
    return this.get(`/usermanager/user/${id}`);
  };

  updateUser = (userInfor,id) => {
    return this.put(`/usermanager/updateuser/${id}`,userInfor);
  };

  changeProfile = (userInfor,id) => {
    return this.put(`/usermanager/changeprofile/${id}`,userInfor);
  };

  changePassword = (userInfor,id) => {
    return this.put(`/usermanager/changepassword/${id}`,userInfor);
  };

  forgotPassword = (email) => {
    return this.put(`/usermanager/forgotpassword`,email);
  };
}

export const manageUserService = new ManageUserService();
