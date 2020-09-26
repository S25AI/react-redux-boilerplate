import { TEST_CHANGE_TEXT } from "../constants/test";

const initialState = {
  title: "hello"
};

function test(state = initialState, action) {
  switch (action.type) {
    case TEST_CHANGE_TEXT:
      return { ...state, title: action.payload };

    default:
      return state;
  }
}

export { test };
