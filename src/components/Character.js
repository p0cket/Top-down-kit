import React, { useState, useEffect, useRef } from "react"
import HeadSprite from "../sprites/head.png"

const Character = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 }) // State to track the character's position
  const keysPressed = useRef({}) // Ref to track which keys are currently pressed
  const requestRef = useRef() // Ref to store the requestAnimationFrame ID

  const moveCharacter = () => {
    let { x, y } = position // Destructure the current position
    const step = 2 // Define the movement step size

    // Update position based on pressed keys
    if (keysPressed.current["ArrowUp"] || keysPressed.current["w"]) {
      y -= step // Move up
    }
    if (keysPressed.current["ArrowDown"] || keysPressed.current["s"]) {
      y += step // Move down
    }
    if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"]) {
      x -= step // Move left
    }
    if (keysPressed.current["ArrowRight"] || keysPressed.current["d"]) {
      x += step // Move right
    }

    setPosition({ x, y }) // Update the position state
  }

  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (event) => {
      keysPressed.current[event.key] = true // Mark the key as pressed
    }

    // Function to handle keyup events
    const handleKeyUp = (event) => {
      keysPressed.current[event.key] = false // Mark the key as released
    }

    // Add event listeners for keydown and keyup events
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    // Animation loop
    const animate = () => {
      moveCharacter() // Update character position
      requestRef.current = requestAnimationFrame(animate) // Request the next frame
    }

    requestRef.current = requestAnimationFrame(animate) // Start the animation loop

    // Cleanup function to remove event listeners and cancel the animation frame
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      cancelAnimationFrame(requestRef.current)
    }
  }, [position]) // Dependency array includes position to update animation when it changes

  return (
    <img
      //   src="path/to/character-image.png" // Replace with your character image path
      src={HeadSprite} // Replace with your character image path
      alt="Character"
      style={{
        position: "absolute", // Position the image absolutely
        top: position.y, // Set the top position based on state
        left: position.x, // Set the left position based on state
        width: "40px", // Define the width of the image
        height: "40px", // Define the height of the image
      }}
    />
  )
}

export default Character
