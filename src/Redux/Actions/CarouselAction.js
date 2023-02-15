import { manageLotteryService } from "../../Services/ManageLotteryService";
import { displayLoadingAction, hiddenLoadingAction } from "./LoadingActions";
import { SET_CAROUSEL } from "./Types/CarouselType";
import { DISPLAY_ERRORS } from "./Types/ErrorType";

export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageLotteryService.getBanner()

      dispatch({
        type: SET_CAROUSEL,
        arrImg: result.data.content.sort((a,b) => a.hoursdiff - b.hoursdiff),
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
