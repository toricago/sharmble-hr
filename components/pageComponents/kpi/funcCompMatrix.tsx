import React from "react"
import { ExplainEvaluate } from "./EmployeeProps"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ArrowDownNarrowWide } from "lucide-react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Props {
  matrix: ExplainEvaluate[]
}

export default function FuncCompMatrix({ matrix }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <ArrowDownNarrowWide size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="max-h-[calc(100vh-100px)] md:max-h-max overflow-scroll"
        side="bottom"
      >
        <SheetHeader>
          <SheetDescription>
            <div>
              <Table>
                <TableCaption>
                  เกณฑ์การประเมิน Functional Competency
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Matrix/Score</TableHead>
                    <TableHead>1</TableHead>
                    <TableHead>2</TableHead>
                    <TableHead>3</TableHead>
                    <TableHead>4</TableHead>
                    <TableHead>5</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matrix.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.section}
                      </TableCell>
                      {item.score.map((score, index) => (
                        <TableCell key={index}>{score.details}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
