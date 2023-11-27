"use client"
import React, { useEffect } from "react"
import PageHeader from "@/components/pageComponents/pageHeader"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Loader from "../../../components/pageComponents/barLoader"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Employee } from "@/components/pageComponents/kpi/EmployeeProps"
import GetUserKpi, {
  GetUserKpiResponse,
} from "@/components/pageComponents/kpi/getUserKpi"
import { useUser } from "@clerk/nextjs"
import { Badge } from "@/components/ui/badge"

export default function KPIPage() {
  const router = useRouter()
  const { user } = useUser()
  const [hidden, sethidden] = React.useState<boolean>(false)
  const [showPeer, setShowPeer] = React.useState<Employee[]>([])
  const [peerData, setPeerData] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    if (hidden) {
      let filtered = peerData.filter((peer) => !peer.evaluated)
      setShowPeer(filtered)
    } else {
      setShowPeer(peerData)
    }
  }, [hidden, peerData])

  useEffect(() => {
    async function fetchData() {
      let response = await GetUserKpi({
        email: user?.emailAddresses[0].emailAddress,
      })
      const { peers } = response as GetUserKpiResponse
      setPeerData(peers)
    }
    fetchData()
    setLoading(false)
  }, [user])

  return (
    <div>
      <PageHeader
        name="Performance Review"
        description="การประเมินประจำรอบ เพื่อวัดผลการทำงาน"
      />
      <div className="w-full flex items-center justify-between py-4">
        <div className="text-xl font-light">รายการที่ต้องประเมิน</div>
        <div className="flex items-center space-x-2">
          <Switch
            onClick={() => {
              sethidden(!hidden)
            }}
            id="hidden-switch"
          />
          <Label className="hidden sm:flex" htmlFor="hidden-switch">
            แสดงเฉพาะรอประเมิน
          </Label>
        </div>
      </div>

      {loading && <Loader text="กำลังโหลด..." />}
      {!loading && peerData && (
        <div className="grid grid-cols-12 gap-4">
          {showPeer.length > 0 ? (
            showPeer.map((peer, index) => (
              <Card className="col-span-12 lg:col-span-6" key={index}>
                <CardHeader>
                  <div className="text-xl font-medium flex items-center w-full">
                    {peer.title.title}&nbsp;{peer.firstName}&nbsp;
                    {peer.lastName}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex">
                      <div className="w-1/3 font-light">ประเภท :</div>
                      <div className="w-2/3">
                        <Badge color="secondary">{peer.type}</Badge>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 font-light">ตำแหน่ง :</div>
                      <div className="w-2/3">{peer.position.name}</div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 font-light">แผนก :</div>
                      <div className="w-2/3">{peer.department.name}</div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 font-light">หน่วยงาน :</div>
                      <div className="w-2/3">{peer.division.name}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="w-full flex gap-4">
                  <Button
                    onClick={() => {
                      router.push(`/kpi/review/${peer._id}`, { scroll: false })
                    }}
                    disabled={peer.evaluated}
                    className="w-full"
                  >
                    เริ่มประเมิน
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-12 py-12 text-center text-neutral-400">
              ไม่มีรายการ
            </div>
          )}
        </div>
      )}
    </div>
  )
}
