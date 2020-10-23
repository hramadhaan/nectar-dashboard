import axios from "axios";
import User from "../../models/User";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_START = "FETCH_USER_START";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAIL = "FETCH_USER_FAIL";

export const fetchUserStart = () => {
  return {
    type: FETCH_USER_START,
  };
};

export const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    users: users,
  };
};

export const fetchUserFail = (error) => {
  return {
    type: FETCH_USER_FAIL,
    error: error,
  };
};

export const fetchUser = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUserSuccess());
    try {
      const token = getState().auth.token;
      const response = await axios.get("http://192.168.1.10:3080/user/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resDat = response.data["data"];

      const fetchedUsers = [];
      for (const key in resDat) {
        fetchedUsers.push(
          new User(key, resDat[key].name, resDat[key].image, resDat[key].email)
          //   {
          //     ...resDat[key],
          //     id: key,
          //   }
        );
      }

      dispatch(fetchUserSuccess(fetchedUsers));
    } catch (err) {
      dispatch(fetchUserFail(err));
    }
    // console.log(resDat);
  };
};
