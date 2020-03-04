import React from "react";
import Map from "../map";
import Player from "../player";
import { useSelector } from "react-redux";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";

export function World(props) {
  const position = useSelector(state => state.player.position);
  return (
    <>
      <div
        className="world"
        style={{
          transition: "all 0.5s linear",
          position: "relative",
          width: MAP_WIDTH + "px",
          height: MAP_HEIGHT + "px",
          margin: "20px auto",
          clipPath:
            "circle(150px at " +
            (position[0] + SPRITE_SIZE / 2) +
            "px " +
            (position[1] + SPRITE_SIZE / 2) +
            "px)"
        }}
      >
        <Map />
        <Player />
      </div>
    </>
  );
}
