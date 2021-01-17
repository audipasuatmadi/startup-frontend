import { combineReducers } from "redux"

const dummyReducer = (state = 'nice', action) => {
  return state
}

const RootReducer = combineReducers({
  njir: dummyReducer
})


export type RootState = ReturnType<typeof RootReducer>

export default RootReducer