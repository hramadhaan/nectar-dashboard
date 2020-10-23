import {
  AUTH_LOGOUT,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_START,
  SET_AUTH_REDIRECT_PATH,
} from "../action/auth";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false,
      };
    case AUTH_FAIL:
      return {
        error: action.error,
        loading: false,
      };
    case AUTH_LOGOUT:
      return {
        token: null,
        userId: null,
      };
    case SET_AUTH_REDIRECT_PATH:
      return {
        authRedirectPath: action.path,
      };
    default:
      return state;
  }
};
