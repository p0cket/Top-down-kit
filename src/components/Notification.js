import React from "react"

const Notification = ({ show, position }) => {
  if (!show) return null

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        backgroundColor: "yellow",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      Press E to Log
    </div>
  )
}

export default Notification