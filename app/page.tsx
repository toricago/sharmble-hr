import PageHeader from "@/components/pageComponents/pageHeader"
import { AlertCircle, BarChart2 } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <PageHeader name="Overview" description="ข้อมูลสรุปของคุณ" />
      <div>
        <h2 className="text-xl font-semibold py-4">Reminder</h2>
        <Link href="/kpi/review">
          <Alert>
            <BarChart2 className="h-4 w-4" />
            <AlertTitle className="text-lg">การประเมินประจำปี</AlertTitle>
            <AlertDescription>
              กรุณาประเมินผลการทำงานของเพื่อนร่วมงานของคุณภายในวันที่ 4 ธันวาคม
              2023 เวลา 13:00 น.
            </AlertDescription>
          </Alert>
        </Link>
      </div>
    </div>
  )
}
