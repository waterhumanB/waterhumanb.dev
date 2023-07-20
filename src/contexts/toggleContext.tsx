import {
  useReducer,
  createContext,
  Dispatch,
  ReactNode,
  useContext,
} from "react"

interface State {
  toggle: boolean
}

type Action =
  | {
      type: "book"
      toggle: true
    }
  | {
      type: "video"
      toggle: false
    }

const INIT_TOGGLE = {
  toggle: true,
}

const toggleReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "book":
      return { toggle: action.toggle }
    case "video":
      return { toggle: action.toggle }
    default:
      return state
  }
}

const ToggleStateContext = createContext<State>(INIT_TOGGLE)
const ToggleDispatchContext = createContext<Dispatch<Action>>(() => null)

export const useToggleStateContext = () => {
  return useContext(ToggleStateContext)
}

export const useToggleDispatch = () => {
  return useContext(ToggleDispatchContext)
}

export function ToggleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toggleReducer, INIT_TOGGLE)

  return (
    <ToggleStateContext.Provider value={state}>
      <ToggleDispatchContext.Provider value={dispatch}>
        {children}
      </ToggleDispatchContext.Provider>
    </ToggleStateContext.Provider>
  )
}
