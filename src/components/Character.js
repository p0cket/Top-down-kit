// src/components/Character.js
import React, { useEffect, useState } from "react"
import HeadSprite from "../sprites/head.png"
import useMovement from "../hooks/useMovement"
import Notification from "./Notification"
import { checkEventTrigger, checkProximity } from "../utils/collision"
import { throttleLog } from "../utils/throttleLog"

const Character = ({
  walls,
  eventSquares,
  npcs,
  enemies,
  onPositionUpdate,
  onEnemyHealthChange,
  onSceneChange,
  movePlayerOnMap,
}) => {
  const [showNotification, setShowNotification] = useState(false) // State to show/hide notification
  const [notificationPosition, setNotificationPosition] = useState({
    x: 0,
    y: 0,
  }) // Notification position

  throttleLog(() =>
    console.log("Character received onSceneChange:", onSceneChange)
  )

  const handleEventTrigger = (x, y, isActivationKey = false) => {
    checkEventTrigger(x, y, eventSquares, isActivationKey, onSceneChange)
  }

  const handleProximity = (x, y) => {
    checkProximity(
      x,
      y,
      eventSquares,
      setNotificationPosition,
      setShowNotification
    )
  }

  const position = useMovement(
    walls,
    eventSquares,
    npcs,
    enemies,
    handleEventTrigger,
    handleProximity,
    onPositionUpdate,
    onEnemyHealthChange
  )
  useEffect(() => {
    // Check if the player is at the edge of the current level
    const { x, y } = position

    const isAtEdge = x <= 0 || y <= 0 || x >= walls.width || y >= walls.height

    if (isAtEdge) {
      // Determine the direction based on the position
      let direction = null
      if (x <= 0) direction = "left"
      if (y <= 0) direction = "up"
      if (x >= walls.width) direction = "right"
      if (y >= walls.height) direction = "down"

      if (direction) {
        movePlayerOnMap(direction)
      }
    }
  }, [position])
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
