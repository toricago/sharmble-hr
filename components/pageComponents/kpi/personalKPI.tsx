import React from "react"
import { currentUser } from "@clerk/nextjs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import GetUserKpi, { GetUserKpiResponse } from "./getUserKpi"
import { Employee, EmployeeProps } from "./EmployeeProps"

export const PersonalKPI = async () => {
  const user = await currentUser()
  const response = await GetUserKpi({
    email: user?.emailAddresses[0].emailAddress,
  })
  const { data } = response as GetUserKpiResponse
  const employeeData: Employee = data.employee

  return (
    employeeData && (
      <div>
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full"
            src={user?.imageUrl || "https://picsum.photos/100/100"}
            width={64}
            height={64}
            alt="profile image"
          />
          <div>
            <p className="text-sm text-gray-500">{employeeData.employeeId}</p>
            <h2 className="text-xl font-light">
              {employeeData.title.title} {employeeData.firstName}{" "}
              {employeeData.lastName}
            </h2>
          </div>
        </div>

        {employeeData.departmentKpi && (
          <div className="my-12">
            <div className="text-xl font-semibold my-4">Department KPIs</div>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>KPI</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeData.departmentKpi.map((kpi, index) => (
                  <TableRow key={index}>
                    <TableCell>{kpi.kpi}</TableCell>
                    <TableCell>{kpi.target}</TableCell>
                    <TableCell className="font-bold">{kpi.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {employeeData.employeeKpi && (
          <div className="my-12">
            <div className="text-xl font-semibold my-4">Personal KPIs</div>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>KPI</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeData.employeeKpi.map((kpi, index) => (
                  <TableRow key={index}>
                    <TableCell>{kpi.kpi}</TableCell>
                    <TableCell>{kpi.target}</TableCell>
                    <TableCell className="font-bold">{kpi.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <div className="mb-12">
          <div className="text-xl font-semibold my-4">Core Competentcy</div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Competency</TableHead>
                <TableHead>Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeData.coreCompetencies.map((competency, index) => (
                <TableRow key={index}>
                  <TableCell>{competency.competency.name}</TableCell>
                  <TableCell className="font-bold">
                    {competency.weight}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {employeeData.functionalCompetencies && (
          <div className="mb-12">
            <div className="text-xl font-semibold my-4">
              Functional Competency
            </div>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Competency</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeData.functionalCompetencies.map(
                  (competency, index) => (
                    <TableRow key={index}>
                      <TableCell>{competency.competency.name}</TableCell>
                      <TableCell className="font-bold">
                        {competency.weight}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    )
  )
}
