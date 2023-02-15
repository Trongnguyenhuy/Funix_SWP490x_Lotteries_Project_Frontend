import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Actions/Types/LoadingTypes";

const defaultState = {
  isLoading: false,
};

export const LoadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      state.isLoading = true;
      return { ...state };
    }
    case HIDDEN_LOADING: {
      state.isLoading = false;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
