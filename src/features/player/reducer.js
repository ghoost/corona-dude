import update from "react-addons-update";

const initialState = {
  position: [0, 0],
  spriteLocation: "0px",
  direction: "east",
  walkIndex: 0,
  moveCount: 10,
  animated: false,
  showAnimation: false,
  gameOver: false
};

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_PLAYER":
      return {
        ...action.payload
      };
    case "IS_ANIMATED":
      return update(state, {
        animated: { $set: action.payload.animated }
      });
    case "SET_MOVES":
      return update(state, {
        moveCount: { $set: action.payload.moveCount },
        gameOver: { $set: action.payload.gameOver },
        showAnimation: { $set: action.payload.showAnimation }
      });
    case "RESET_PLAYER":
      state = initialState;
      return state;
    default:
      return state;
  }
};
