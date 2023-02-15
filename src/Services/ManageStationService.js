/* eslint-disable no-useless-constructor */
import { BaseService } from "./BaseServices";

export class ManageStationService extends BaseService {
  constructor() {
    super();
  }

  getStations = () => {
    return this.get(`/stationmanager/stations`);
  };

  getStation = (id) => {
    return this.get(`/stationmanager/station/${id}`);
  };

  addNewStation = (stationInfor) => {
    return this.post(`/stationmanager/addnewstation`, stationInfor);
  };

  updateStation = (updateStationInfor, id) => {
    return this.put(`/stationmanager/updatestation/${id}`, updateStationInfor);
  };

  deleteStation = (id) => {
    return this.delete(`/stationmanager/deletestation/${id}`);
  };

  deleteStations = (stations) => {
    return this.post(`/stationmanager/deletestations/`, stations);
  };
}

export const manageStationService = new ManageStationService();
