/* eslint-disable indent */
import React, { useContext } from "react"
import "./index.css"

const stateContext = React.createContext()
const dispatchContext = React.createContext()

export function useStateContext() {
  return useContext(stateContext)
}
export function useDispatchContext() {
  return useContext(dispatchContext)
}
export const ACTIONS = {
  //   RESET_DATA: 'RESET_DATA',
}
const startingData = {
  player: null,
}
export const MainProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, startingData)
  function reducer(state, action) {
    try {
      state = structuredClone(state)
    } catch (error) {
      console.error("Error cloning state:", error)
      console.log("State at error:", state)
      console.log("Action at error:", action)
    }
    switch (action.type) {
      //   case ACTIONS.RESET_DATA:
      //     return { ...state, ...action.payload }
      default:
        console.log("ERROR: Invalid action type. End of Reducer reached")
        return state
    }
  }

  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  )
}
