import React from "react"

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "none" | "sm" | "md" | "lg"
}

const Divider = (props: DividerProps) => {
  let m
  switch (props.spacing) {
    case "none":
      m = "my-0"
      break
    case "sm":
      m = "my-2"
      break
    case "md":
      m = "my-4"
      break
    case "lg":
      m = "my-8"
      break
    default:
      m = "my-4"
      break
  }
  return <div className={"h-1 border-slate-300 border-b-[1px] " + m}></div>
}

export default Divider
