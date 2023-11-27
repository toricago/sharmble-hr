import { PersonalKPI } from "@/components/pageComponents/kpi/personalKPI"
import PageHeader from "@/components/pageComponents/pageHeader"
import { Button } from "@/components/ui/button"
import Divider from "@/components/ui/divider"
import React from "react"

export default function KPIPage() {
  return (
    <div>
      <PageHeader
        name="KPIs"
        description="รายละเอียด KPIs รายบุคคล และหน่วยงาน"
      />
      <PersonalKPI />
    </div>
  )
}
