import React from "react";
import "./HUD.css";

function HUD({ characterPosition }) {
  return (
    <div className="HUD">
      {characterPosition && (
        <div>
          Position: x={characterPosition.x.toFixed(2)}, y=
          {characterPosition.y.toFixed(2)}, z={characterPosition.z.toFixed(2)}
        </div>
      )}
    </div>
  );
}

export default HUD;
