"use client"
import GetUserKpi, {
  GetUserKpiResponse,
} from "@/components/pageComponents/kpi/getUserKpi"
import PageHeader from "@/components/pageComponents/pageHeader"
import { useUser } from "@clerk/nextjs"
import isEmpty from "lodash/isEmpty"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import React, { useEffect } from "react"
import {
  Employee,
  ExplainEvaluate,
} from "@/components/pageComponents/kpi/EmployeeProps"
import Loader from "../../../../components/pageComponents/barLoader"
import EvaluationForm from "@/components/pageComponents/kpi/evaluationForm"

interface Params {
  params: { id: string }
}

export default function Page({ params }: Params) {
  const { user } = useUser()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [employeeData, setEmployeeData] = React.useState<Employee>(
    {} as Employee
  )
  const [reviewer, setReviewer] = React.useState<string>("")
  const [matrix, setMatrix] = React.useState<ExplainEvaluate[]>([])
  useEffect(() => {
    async function fetchData() {
      let response = await GetUserKpi({
        email: user?.emailAddresses[0].emailAddress,
      })
      const { data, peers, funcCompMatrix } = response as GetUserKpiResponse
      const peerKPIData = peers.find((peer) => peer._id === params.id)
      if (data) {
        setReviewer(data.employee._id)
      }
      if (peerKPIData && !peerKPIData.evaluated) {
        setEmployeeData(peerKPIData)
      }
      if (funcCompMatrix) {
        setMatrix(funcCompMatrix)
      }
      setLoading(false)
    }
    fetchData()
  }, [user, params])

  if (isEmpty(employeeData) && !loading) {
    return (
      <div className="grid justify-center py-24">
        <div className="text-center pb-6 text-slate-500">
          ไม่พบข้อมูล หรือประเมินไปแล้ว
        </div>
        <Link href="/kpi/review">
          <Button className="w-full">กลับ</Button>
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="py-12">
        <Loader text="กำลังโหลด..." />
      </div>
    )
  }

  return (
    <div>
      <PageHeader name="KPI Review" description="แบบประเมินผลการทำงาน" />
      <div>
        <div className="pb-8">
          <div className="flex gap-2 items-center pb-1">
            <Badge>ประเมิน{employeeData.type}</Badge>
            <p className="text-sm text-gray-500">{employeeData.employeeId}</p>
          </div>
          <h2 className="text-xl font-light">
            {employeeData.title.title} {employeeData.firstName}{" "}
            {employeeData.lastName}
          </h2>
        </div>
        <EvaluationForm
          KPIdata={employeeData}
          reviewer={reviewer}
          matrix={matrix}
        />
      </div>
    </div>
  )
}
