import * as type from "./action_types";

const initialUserState = { user: null, token: null };

function userReducer(state, action) {
  switch (action.type) {
    case type.SET_USER:
      return { ...state, ...action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

export { initialUserState, userReducer };
