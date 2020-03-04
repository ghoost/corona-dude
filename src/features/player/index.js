import React from "react";
import { connect } from "react-redux";
import walkSprite from "./player_walk.png";
import handleMovement from "./movement";
import { SPRITE_SIZE } from "../../config/constants";
import { useSelector } from "react-redux";

function Player(props) {
  const position = useSelector(state => state.player.spriteLocation);
  const animated = useSelector(state => state.player.animated);
  const showAnimation = useSelector(state => state.player.showAnimation);
  const moves = useSelector(state => state.player.moveCount);
  let movement = (moves / 10) * 100;
  const Moves = () => {
    return (
      <div
        className="moves"
        style={{
          background: moves > 10 ? "#0f0" : "#f00",
          position: "absolute",
          top: "-5px",
          width: movement + "%",
          maxWidth: "100%",
          height: "4px",
          overflow: "hidden",
          transition: "transition: width 1s ease-in-out"
        }}
      >
        {moves}
      </div>
    );
  };
  return (
    <div
      className={`player ${animated ? "animated" : ""}`}
      style={{
        transition: "top 0.5s linear, left 0.5s linear",
        position: "absolute",
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${walkSprite}')`,
        //backgroundPosition: "0px 0px",
        backgroundPositionY: position,
        width: SPRITE_SIZE + "px",
        height: SPRITE_SIZE + "px"
      }}
    >
      <Moves />

      <div
        className={`add-points ${animated && showAnimation ? "animated" : ""}`}
      >
        10
      </div>
      <div className={`shadow ${showAnimation ? "animated" : ""}`}></div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.player
  };
}

export default connect(mapStateToProps)(handleMovement(Player));
