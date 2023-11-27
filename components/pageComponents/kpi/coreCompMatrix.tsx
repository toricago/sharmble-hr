import React from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { EvaluateScore } from "./EmployeeProps"
import { Info } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
  matrix: EvaluateScore[]
}

const FindColor = (score: number) => {
  switch (score) {
    case 5:
      return "bg-indigo-500"
    case 4:
      return "bg-green-500"
    case 3:
      return "bg-yellow-500"
    case 2:
      return "bg-orange-500"
    case 1:
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}
export default function CoreCompMatrix({ matrix }: Props) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="w-full h-full grid items-center">
          <Info size={20} className="text-slate-600" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        {matrix.map((item, index) => (
          <div key={index} className="text-sm font-light pb-3">
            <div className="flex items-start">
              <div
                className={`p-2 h-full text-white font-bold rounded-md ${FindColor(
                  item.score
                )}`}
              >
                {item.score}
              </div>
              <div className="ml-2">{item.details}</div>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
