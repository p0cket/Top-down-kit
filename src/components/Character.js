import React, { useState, useEffect, useRef } from "react"
import HeadSprite from "../sprites/head.png"

const Character = ({ walls }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const keysPressed = useRef({})
  const requestRef = useRef()

  const checkCollision = (newX, newY) => {
    const characterRect = {
      x: newX,
      y: newY,
      width: 40,
      height: 40,
    }

    for (let wall of walls) {
      const wallRect = {
        x: wall.x,
        y: wall.y,
        width: wall.width,
        height: wall.height,
      }

      if (
        characterRect.x < wallRect.x + wallRect.width &&
        characterRect.x + characterRect.width > wallRect.x &&
        characterRect.y < wallRect.y + wallRect.height &&
        characterRect.y + characterRect.height > wallRect.y
      ) {
        return true // Collision detected
      }
    }

    return false // No collision
  }

  const moveCharacter = () => {
    let { x, y } = position
    const step = 2

    if (keysPressed.current["ArrowUp"] || keysPressed.current["w"]) {
      if (!checkCollision(x, y - step)) y -= step
    }
    if (keysPressed.current["ArrowDown"] || keysPressed.current["s"]) {
      if (!checkCollision(x, y + step)) y += step
    }
    if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"]) {
      if (!checkCollision(x - step, y)) x -= step
    }
    if (keysPressed.current["ArrowRight"] || keysPressed.current["d"]) {
      if (!checkCollision(x + step, y)) x += step
    }

    setPosition({ x, y })
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      keysPressed.current[event.key] = true
    }

    const handleKeyUp = (event) => {
      keysPressed.current[event.key] = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    const animate = () => {
      moveCharacter()
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      cancelAnimationFrame(requestRef.current)
    }
  }, [position])

  return (
    <img
      //   src="path/to/character-image.png"
      src={HeadSprite} // Replace with your character image path
      alt="Character"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: "40px",
        height: "40px",
      }}
    />
  )
}

export default Character
