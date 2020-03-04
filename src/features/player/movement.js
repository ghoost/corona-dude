import { Store } from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";
import produce from "immer";
import { Levels } from "../../data/maps";

export default function handleMovement(player) {
  let timer = null;
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case "WEST":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
      case "EAST":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
      default:
        console.log(direction);
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case "SOUTH":
        return `${SPRITE_SIZE * 0}px`;
      case "EAST":
        return `${SPRITE_SIZE * 1}px`;
      case "WEST":
        return `${SPRITE_SIZE * 2}px`;
      case "NORTH":
        return `${SPRITE_SIZE * 3}px`;
      default:
    }
  }

  function getWalkIndex() {
    const walkIndex = Store.getState().player.walkIndex;
    return walkIndex >= 8 ? 0 : walkIndex + 1;
  }
  function observeBoundaries(oldPos, newPos) {
    if (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      newPos[1] >= 0 &&
      newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
    ) {
      return true;
    } else {
      return false;
    }
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = Store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    let next, map;
    if (typeof tiles[y][x] === "object") {
      next = tiles[y][x].tile;
      map = tiles[y][x].map;
    } else {
      next = tiles[y][x];
    }
    const nextTile = next;
    return [nextTile < 5, nextTile, map];
  }

  function dispatchMove(direction, newPos, tile, map) {
    if (timer == null) {
      let moves = Store.getState().player.moveCount;
      moves -= 1;
      const gameOver = moves < 0 ? true : false;
      if (gameOver) {
        Store.dispatch({
          type: "SET_MOVES",
          payload: {
            moveCount: 0,
            showAnimation: true,
            gameOver: gameOver
          }
        });
        return;
      }

      const walkIndex = getWalkIndex();
      Store.dispatch({
        type: "MOVE_PLAYER",
        payload: {
          position: newPos,
          direction,
          walkIndex,
          spriteLocation: getSpriteLocation(direction, walkIndex),
          animated: true,
          moveCount: moves,
          gameOver: gameOver
        }
      });
      if (tile === 1) {
        const newTiles = produce(Store.getState().map.tiles, draft => {
          const y = newPos[1] / SPRITE_SIZE;
          const x = newPos[0] / SPRITE_SIZE;
          draft[y][x] = 0;
        });
        if (newTiles) {
          Store.dispatch({
            type: "SET_MOVES",
            payload: {
              moveCount: moves + 10,
              showAnimation: true,
              gameOver: gameOver
            }
          });
          Store.dispatch({ type: "ADD_TILES", payload: { tiles: newTiles } });
        }
      }

      if (tile === 3) {
        if (map > 0) {
          Store.dispatch({
            type: "ADD_TILES",
            payload: { tiles: Levels["level" + map] }
          });
        }
      }
      timer = setTimeout(() => {
        timer = null;
        Store.dispatch({
          type: "IS_ANIMATED",
          payload: {
            animated: false
          }
        });
      }, 500);
    } else {
    }
  }

  function attemptMove(direction) {
    const oldPos = Store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);
    const boundaries = observeBoundaries(oldPos, newPos);
    if (boundaries) {
      const tile = observeImpassable(oldPos, newPos);
      if (observeBoundaries(oldPos, newPos) && tile[0])
        dispatchMove(direction, newPos, tile[1], tile[2]);
    }
  }
  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        return attemptMove("WEST");
      case 38:
        return attemptMove("NORTH");
      case 39:
        return attemptMove("EAST");
      case 40:
        return attemptMove("SOUTH");
      default:
        console.log(e.keyCode);
    }
  }
  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });
  return player;
}
