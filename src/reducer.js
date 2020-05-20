const initialState = {
  history: [],
};
export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "UPDATE_HISTORY":
      return Object.assign({}, state, { history: action.payload });
    default:
      return state;
  }
}
