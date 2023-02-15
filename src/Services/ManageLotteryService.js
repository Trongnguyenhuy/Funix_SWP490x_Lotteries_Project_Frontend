import { BaseService } from "./BaseServices";

export class ManageLotteryService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  getBanner = () => {
    return this.get(`/lotterymanager/banner`);
  };

  getLotteries = () => {
    return this.get(`/lotterymanager/lottery`);
  };

  getLotteriesDetail = (id) => {
    return this.get(`/lotterymanager/lottery/${id}`);
  };

  getLotteriesDetailList = (id) => {
    return this.get(`/lotterymanager/lottery/${id}?list=true`);
  };

  getLotteriesByStationAndDate = (stationName, zoneCode="", date = "") => {
    return this.get(
      `/lotterymanager/lottery/station?stationName=${stationName}&zone=${zoneCode}&date=${date}`
    );
  };

  getLotteriesByZone = (zone) => {
    return this.get(`/lotterymanager/lottery/zone?zone=${zone}`);
  };

  checkTicket = (ticketInfor) => {
    return this.post(`/lotterymanager/checkticket`, ticketInfor);
  };

  checkTicketForUser = (ticketInfor) => {
    return this.post(`/lotterymanager/checkticketforuser`, ticketInfor);
  };

  addNewLottery = (lotteryInfor) => {
    return this.post(`/lotterymanager/addNewLottery`, lotteryInfor);
  };

  addNewLotteryAuto = (lotteryInfor) => {
    return this.post(`/lotterymanager/addNewLotteryAuto`, lotteryInfor);
  };

  updateLottery = (updateLotteryInfor, id) => {
    return this.put(`/lotterymanager/updateLottery/${id}`, updateLotteryInfor);
  };

  deleteLottery = (id) => {
    return this.delete(`/lotterymanager/deleteLottery/${id}`);
  };

  deleteLotteries = (lotteries) => {
    return this.post(`/lotterymanager/deleteLotteries`, lotteries);
  };

  getStaticLottery = (year) => {
    return this.get(`/lotterymanager/staticlottery?year=${year}`);
  };

  deleteTicket = (id) => {
    return this.delete(`/lotterymanager/deleteticket/${id}`);
  };
}

export const manageLotteryService = new ManageLotteryService();
