const initialState = {
  tiles: []
};
export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TILES":
      state = action.payload;
      //console.log(state);
      return state;
    case "RESET_TILES":
      state = initialState;
      return state;
    default:
      return state;
  }
};
