import React, { useState, useEffect } from "react";

const Moves = ({ move }) => {
  const [power, setPower] = useState("");

  useEffect(() => {
    const getMovesDetails = async (url) => {
      const power = fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setPower(data.power || 0);
        });
      return power;
    };

    getMovesDetails(move.url);
  }, [move]);

  return (
    <div>
      <span className="font-medium">{move.name}</span>: {power}
    </div>
  );
};

export default Moves;
