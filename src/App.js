import React from "react";
import { World } from "./features/world";
import { Levels } from "./data/maps/";
import { useSelector } from "react-redux";
import { Store } from "./config/store";

function App() {
  const gameOver = useSelector(state => state.player.gameOver);

  const Restart = () => {
    const handleClick = () => {
      Store.dispatch({
        type: "ADD_TILES",
        payload: { tiles: Levels["level1"] }
      });
      Store.dispatch({ type: "RESET_PLAYER", payload: {} });
    };

    return <button onClick={handleClick}>RESTART</button>;
  };

  Store.dispatch({ type: "ADD_TILES", payload: { tiles: Levels["level1"] } });
  const handleClick = direction => {
    switch (direction) {
      case "DOWN":
        window.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 40 }));
        break;
      case "LEFT":
        window.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 37 }));
        break;
      case "RIGHT":
        window.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 39 }));
        break;
      case "UP":
        window.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 38 }));
        break;
      default:
    }
  };
  return (
    <>
      {!gameOver && (
        <>
          <World />
          <div className="keypad">
            <button onClick={() => handleClick("UP")}>
              <i className="up"></i>
            </button>
            <br />
            <button onClick={() => handleClick("LEFT")}>
              <i className="left"></i>
            </button>
            <button onClick={() => handleClick("DOWN")}>
              <i className="down"></i>
            </button>
            <button onClick={() => handleClick("RIGHT")}>
              <i className="right"></i>
            </button>
          </div>
        </>
      )}
      {gameOver && (
        <div className="game-over">
          <div>
            GAME OVER
            <Restart />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
