/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Details from "./Pages/Details/Details";
import StationLotteries from "./Pages/Station/Station";
import Lotteries from "./Pages/Lottery/Lottery";
import { useEffect } from "react";
import UserTemplate from "./Templates/UserTemplate/UserTemplate";
import Ticket from "./Pages/Ticket/Ticket";
import Loading from "./Components/Loading/Loading";
import Profile from "./Pages/Profile/Profile";
import AdminTemplate from "./Templates/AdminTemplate/AdminTemplate";
import ManageLotteriesAdmin from "./Pages/Admin/ManageLotteriesAdmin/ManageLotteriesAdmin";
import ManageStationsAdmin from "./Pages/Admin/ManageStationsAdmin/ManageStationsAdmin";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import AddNewLotteries from "./Pages/Admin/ManageLotteriesAdmin/AddNew/AddNew";
import EditLotteries from "./Pages/Admin/ManageLotteriesAdmin/Edit/Edit";
import AddNewStation from "./Pages/Admin/ManageStationsAdmin/AddNew/AddNew";
import EditStation from "./Pages/Admin/ManageStationsAdmin/Edit/Edit";
import AddNewUser from "./Pages/Admin/ManageUsersAdmin/AddNew/AddNew";
import EditUser from "./Pages/Admin/ManageUsersAdmin/Edit/Edit";
import GoogleSignup from "./Pages/Signup/GoogleSignup/GoogleSignup";
import ManageUserAdmin from "./Pages/Admin/ManageUsersAdmin/ManageUserAdmin";
import { useDispatch } from "react-redux";
import {
  getGoogleLoginSuccessAction,
  getLogout,
} from "./Redux/Actions/ManageUserAction";
import Error from "./Components/Error/Error";
import HomeTemplate from "./Templates/HomeTemplate/HomeTemplate";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";

export const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("USER_LOGIN") && localStorage.getItem("TOKEN")) {
      let user = JSON.parse(localStorage.getItem("USER_LOGIN"));
      let now = new Date();
      let timeLogin = new Date(user.timeLogin);
      let gap = now - timeLogin;

      if (gap <= 0) {
        const action = getLogout();
        dispatch(action);
      } else {
        const timeOut = window.setTimeout(() => {
          const action = getLogout();
          dispatch(action);
        }, 3600000 - gap);
        return () => {
          clearTimeout(timeOut);
        };
      }
    } else {
      const action = getGoogleLoginSuccessAction();
      dispatch(action);
    }
  }, []);

  return (
    <Router history={history}>
      <Loading />
      <Error />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate
          path="/lottery/:zone/:station/:id"
          exact
          Component={Details}
        />
        <HomeTemplate
          path="/lottery/:zone/:station"
          exact
          Component={StationLotteries}
        />
        <HomeTemplate path="/lottery/:zone" exact Component={Lotteries} />
        <HomeTemplate path="/lottery" exact Component={Lotteries} />
        <HomeTemplate path="/ticket" exact Component={Ticket} />
        <HomeTemplate path="/profile/:id" exact Component={Profile} />
        <HomeTemplate path="/profile/edit/:id" exact Component={Profile} />
        <HomeTemplate
          path="/profile/changepassword/:id"
          exact
          Component={Profile}
        />
        <HomeTemplate path="/" exact Component={Home} />
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/signup" exact Component={Signup} />
        <UserTemplate path="/forgotpassword" exact Component={ForgotPassword} />
        <UserTemplate path="/signup/google" exact Component={GoogleSignup} />
        <AdminTemplate path="/administration" exact Component={Dashboard} />
        <AdminTemplate
          path="/administration/managelotteries"
          exact
          Component={ManageLotteriesAdmin}
        />
        <AdminTemplate
          path="/administration/managelotteries/addnewlotteries"
          exact
          Component={AddNewLotteries}
        />
        <AdminTemplate
          path="/administration/managelotteries/editlotteries/:id"
          exact
          Component={EditLotteries}
        />

        <AdminTemplate
          path="/administration/managestations"
          exact
          Component={ManageStationsAdmin}
        />
        <AdminTemplate
          path="/administration/managestations/addnewstations"
          exact
          Component={AddNewStation}
        />
        <AdminTemplate
          path="/administration/managestations/editstations/:id"
          exact
          Component={EditStation}
        />

        <AdminTemplate
          path="/administration/manageusers"
          exact
          Component={ManageUserAdmin}
        />
        <AdminTemplate
          path="/administration/manageusers/addnewuser"
          exact
          Component={AddNewUser}
        />
        <AdminTemplate
          path="/administration/manageusers/edituser/:id"
          exact
          Component={EditUser}
        />
      </Switch>
    </Router>
  );
}

export default App;
