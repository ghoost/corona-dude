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

  return (
    <>
      {!gameOver && <World />}
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
