import * as types from '../Constants/actionsTypes'

export const initialState = {
    user:{
        email: "",
        userName: "",
        profileImage: "",
    },
    errorState: false,
}

export default (state, action) => {
    switch (action.type) {
      case types.CLEAR_STATE:
        return initialState;
      case types.GET_USER_DATA:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  