import React from "react"
import Divider from "../ui/divider"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description?: string
}

export default function PageHeader(props: HeaderProps) {
  return (
    <div className="my-4">
      <div className="flex gap-2">
        <h1 className="text-4xl font-bold pb-2">{props.name}</h1>
      </div>
      {props.description && (
        <p className="text-muted-foreground">{props.description}</p>
      )}
      <Divider />
    </div>
  )
}
