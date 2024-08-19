import React from "react";

const GameUI = ({ locationName }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg border border-gray-600">
      <p className="text-lg mb-4 font-mono">
        Current Location: <span className="font-bold">{locationName}</span>
      </p>
    </div>
  );
};

export default GameUI;
