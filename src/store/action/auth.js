import axios from "axios";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: AUTH_LOGOUT,
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
    };
    const url = "http://192.168.1.10:3080/login";
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        if (response.data.status === 1) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          dispatch(authSuccess(response.data.token, response.data.userId));
        }
        alert(response.data.message);
      })
      .catch((err) => {
        dispatch(authFail(err.message));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
    }
  };
};
