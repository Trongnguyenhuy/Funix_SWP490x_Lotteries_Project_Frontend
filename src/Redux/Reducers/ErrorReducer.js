import { DISPLAY_ERRORS, HIDDEN_ERRORS } from "../Actions/Types/ErrorType";

const defaultState = {
  isError: false,
  message: {},
};

export const ErrorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case DISPLAY_ERRORS: {
      state.isError = true;
      state.message = { ...action.message };
      return { ...state };
    }

    case HIDDEN_ERRORS: {
      state.isError = false;
      state.message = {};
      return { ...state };
    }

    default:
      return { ...state };
  }
};
