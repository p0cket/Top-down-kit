import React, { useState, useEffect, useRef } from "react"
import { createRect, doesItCollide } from "../utils/collision"

const NPC = ({
  initialPosition,
  movementRange,
  walls,
  playerPosition,
  onPositionUpdate,
}) => {
  const [position, setPosition] = useState(initialPosition)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward
  const requestRef = useRef()

  const checkCollisionWithWallsAndPlayer = (newX) => {
    const npcRect = createRect({ x: newX, y: position.y })

    if (doesItCollide(npcRect, walls)) return true // Collision detected with wall
    if (doesItCollide(npcRect, [playerPosition])) return true // Collision detected with player

    return false // No collision
  }

  const moveNPC = () => {
    let { x, y } = position
    const step = 1
    const { minX, maxX } = movementRange

    const newX = x + step * direction

    if (
      newX >= maxX ||
      newX <= minX ||
      checkCollisionWithWallsAndPlayer(newX)
    ) {
      setDirection(direction * -1) // Reverse direction
    } else {
      x = newX
    }

    setPosition({ x, y })
    onPositionUpdate({ x, y })
  }

  useEffect(() => {
    const animate = () => {
      moveNPC()
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(requestRef.current)
    }
  }, [position, direction])

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: "40px",
        height: "40px",
        backgroundColor: "purple",
      }}
    >NPC</div>
  )
}

export default NPC
