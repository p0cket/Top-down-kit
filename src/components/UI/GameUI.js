import React from "react"

const GameUI = ({ locationName, playerHealth }) => {
  const healthBarWidth = `${Math.max(0, playerHealth)}%`

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
      <div className="flex flex-col mb-4">
        <p className="text-lg font-bold mb-2">Current Location: {locationName}</p>
      </div>{" "}
      <p className="text-lg font-bold">Player Health:</p>
      <div className="relative bg-red-600 rounded-md overflow-hidden w-full h-8">
        <div className="absolute top-0 left-0 bg-green-500 h-full transition-all duration-300 ease-in-out" style={{ width: healthBarWidth, borderRadius: "0 4px 4px 0" }} />
      </div>{" "}
      <p className="text-sm mt-1 text-center">{playerHealth} / 100</p>
    </div>
  )
}

export default GameUI
