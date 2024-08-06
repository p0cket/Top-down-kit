import React, { useState } from "react"
import HeadSprite from "../sprites/head.png"
import useMovement from "../hooks/useMovement"
import Notification from "./Notification"
import { checkEventTrigger, checkProximity } from "../utils/collision"

const Character = ({ walls, eventSquares, npcs, onPositionUpdate }) => {
  const [showNotification, setShowNotification] = useState(false) // State to show/hide notification
  const [notificationPosition, setNotificationPosition] = useState({ x: 0, y: 0 }) // Notification position

  const handleEventTrigger = (x, y, isActivationKey = false) => {
    checkEventTrigger(x, y, eventSquares, isActivationKey)
  }

  const handleProximity = (x, y) => {
    checkProximity(x, y, eventSquares, setNotificationPosition, setShowNotification)
  }

  const position = useMovement(walls, eventSquares, npcs, handleEventTrigger, handleProximity, onPositionUpdate)

  return (
    <>
      <img
        src={HeadSprite}
        alt="Character"
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          width: "40px",
          height: "40px",
        }}
      />
      <Notification show={showNotification} position={notificationPosition} />
    </>
  )
}

export default Character