import React from "react";
import { connect } from "react-redux";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";
function getTileSprite(type) {
  switch (type) {
    case 0:
      return "grass";
    case 1:
      return "corona";
    case 2:
      return "grave";
    case 3:
      return "spiral";
    case 4:
      return "toilet";
    case 5:
      return "farm";
    case 6:
      return "tree";
    case 7:
      return "trees";
    case 8:
      return "stone";
    case 9:
      return "big-tree";
    case 10:
      return "mountain-1";
    case 11:
      return "mountain-2";
    case 12:
      return "mountain-3";
    case 13:
      return "mountain-4";
    default:
  }
}

function MapTile(props) {
  const tile = getTileSprite(
    typeof props.tile === "object" ? props.tile.tile : props.tile
  );
  return (
    <div
      className={`tile ${tile}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE
      }}
    ></div>
  );
}
function MapRow(props) {
  return (
    <div className="row">
      {props.tiles.map((tile, index) => (
        <MapTile key={index} tile={tile} />
      ))}
    </div>
  );
}
function Map(props) {
  return (
    <div
      className="map"
      style={{
        width: MAP_WIDTH + "px",
        height: MAP_HEIGHT + "px"
      }}
    >
      {props.tiles.map((row, index) => (
        <MapRow key={index} tiles={row} />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    tiles: state.map.tiles
  };
}
export default connect(mapStateToProps)(Map);
