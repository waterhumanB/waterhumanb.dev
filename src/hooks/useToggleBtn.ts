import { useState, MouseEvent } from "react"

export const useToggleBtn = (key: string, initialState: boolean) => {
  const [toggle, setToggle] = useState(() =>
    typeof window !== "undefined"
      ? Boolean(JSON.parse(localStorage.getItem(key) ?? `${initialState}`))
      : initialState,
  )

  const toggleBtnHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget
    if (name === "book") {
      setToggle(true)
      localStorage.setItem(key, `${initialState}`)
    }
    if (name === "video") {
      setToggle(false)
      localStorage.setItem(key, `${!initialState}`)
    }
  }

  return { toggle, toggleBtnHandler }
}
