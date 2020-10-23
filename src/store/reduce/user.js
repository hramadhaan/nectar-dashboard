import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from "../action/user";

const initialState = {
  users: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
