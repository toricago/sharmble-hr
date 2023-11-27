"use client"
import React, { useEffect, useRef } from "react"
import useAxios from "axios-hooks"
import { Employee, ExplainEvaluate } from "./EmployeeProps"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SnackbarProvider, enqueueSnackbar } from "notistack"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { isEmpty } from "lodash"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import CoreCompMatrix from "./coreCompMatrix"
import FuncCompMatrix from "./funcCompMatrix"

interface SubmitEvaluationForm {
  reviewer: string
  employee: string
  coreCompetencies: CoreCompetency[]
  functionalCompetencies?: FunctionalCompetency[]
  employeeKpi?: EmployeeKpi[]
  departmentKpi?: DepartmentKpi[]
  additions?: string
}

interface CoreCompetency {
  coreCompetencyId: string
  evaluateScore: string
}

interface FunctionalCompetency {
  functionalCompetencyId: string
  evaluateScore: string
}

interface EmployeeKpi {
  employeeKpiId: string
  evaluateScore: string
}

interface DepartmentKpi {
  departmentKpiId: string
  evaluateScore: string
}

const schema = z.object({
  coreCompetencies: z.array(
    z.object({
      coreCompetencyId: z.string(),
      evaluateScore: z.string({
        required_error: "ต้องเลือกคะแนน",
      }),
      comment: z.string().min(1, { message: "กรุณาใส่คอมเม้น" }),
    })
  ),
  functionalCompetencies: z
    .array(
      z.object({
        functionalCompetencyId: z.string(),
        evaluateScore: z.string({
          required_error: "ต้องเลือกคะแนน",
        }),
        comment: z.string().min(1, { message: "กรุณาใส่คอมเม้น" }),
      })
    )
    .optional(),

  employeeKpi: z
    .array(
      z.object({
        employeeKpiId: z.string(),
        evaluateScore: z.string({
          required_error: "ต้องเลือกคะแนน",
        }),
        comment: z.string().min(1, { message: "กรุณาใส่คอมเม้น" }),
      })
    )

    .optional(),

  departmentKpi: z
    .array(
      z.object({
        departmentKpiId: z.string(),
        evaluateScore: z.string({
          required_error: "ต้องเลือกคะแนน",
        }),
        comment: z.string().min(1, { message: "กรุณาใส่คอมเม้น" }),
      })
    )

    .optional(),
  additions: z.string().optional(),
})

export default function EvaluationForm({
  KPIdata,
  reviewer,
  matrix,
}: {
  KPIdata: Employee
  reviewer: string
  matrix: ExplainEvaluate[]
}) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const [{ data: postData, loading, error }, executePost] = useAxios(
    {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/employee/evaluation`,
    },
    { manual: true }
  )

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      )
    }
  }

  function onSubmit(values: z.infer<typeof schema>) {
    executePost({
      data: {
        ...values,
        reviewer: reviewer,
        employee: KPIdata._id,
      } as SubmitEvaluationForm,
    })
  }

  useEffect(() => {
    if (postData) {
      enqueueSnackbar("ส่งผลประเมินสำเร็จ", {
        variant: "success",
      })
      setTimeout(() => {
        router.push("/kpi/review", { scroll: false })
      }, 2000)
    }
  }, [postData, router])

  useEffect(() => {
    if (error) {
      enqueueSnackbar("เกิดข้อผิดพลาด", {
        variant: "error",
      })
    }
  }, [error])

  return (
    <div>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        maxSnack={1}
        autoHideDuration={4000}
      />
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-12">
            <div className="text-xl font-semibold my-4">Core Competencies</div>
            {KPIdata.coreCompetencies.map((core, index) => (
              <Card key={index} className="mt-4">
                <CardHeader>
                  <div className="text-lg flex items-center">
                    <div className="flex items-center p-2 mr-4 rounded-md bg-orange-700 text-white font-semibold">
                      {core.weight}%
                    </div>
                    <div className="pr-2">{core.competency.name}</div>
                    <CoreCompMatrix matrix={core.evaluateScore} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <FormField
                      control={form.control}
                      name={`coreCompetencies.${index}.coreCompetencyId`}
                      render={({ field }) => <></>}
                      defaultValue={core._id}
                    />
                    <FormField
                      control={form.control}
                      name={`coreCompetencies.${index}.evaluateScore`}
                      render={({ field }) => (
                        <FormItem className="w-full sm:w-[200px]">
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="เลือกคะแนน" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {core.evaluateScore.map((score, index) => (
                                <SelectItem key={index} value={score._id}>
                                  {score.score}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`coreCompetencies.${index}.comment`}
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input placeholder="ระบุเหตุผล" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {!isEmpty(KPIdata.functionalCompetencies) && (
            <div className="my-12">
              <div className="text-xl font-semibold my-4">
                Functional Competencies
              </div>
              {KPIdata.functionalCompetencies?.map((func, index) => (
                <Card key={index} className="mt-4">
                  <CardHeader>
                    <div className="text-lg flex items-center">
                      <div className="flex items-center p-2 mr-4 rounded-md bg-green-700 text-white font-semibold">
                        {func.weight}%
                      </div>
                      <div>{func.competency.name}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <FormField
                        control={form.control}
                        name={`functionalCompetencies.${index}.functionalCompetencyId`}
                        render={({ field }) => <></>}
                        defaultValue={func._id}
                      />
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`functionalCompetencies.${index}.evaluateScore`}
                          render={({ field }) => (
                            <FormItem className="w-full sm:w-[200px]">
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="เลือกคะแนน" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {func.evaluateScore.map((score, index) => (
                                    <SelectItem key={index} value={score._id}>
                                      {score.score}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FuncCompMatrix matrix={matrix} />
                      </div>
                      <FormField
                        control={form.control}
                        name={`functionalCompetencies.${index}.comment`}
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input placeholder="ระบุเหตุผล" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {!isEmpty(KPIdata.departmentKpi) && (
            <div className="my-12">
              <div className="text-xl font-semibold my-4">Department KPIs</div>
              {KPIdata.departmentKpi?.map((kpi, index) => (
                <Card key={index} className="mt-4">
                  <CardHeader>
                    <div className="text-lg flex items-center">
                      <div className="flex items-center p-2 mr-4 rounded-md bg-purple-700 text-white font-semibold">
                        {kpi.weight}%
                      </div>
                      <div>{kpi.kpi}</div>
                    </div>
                    <div className="pt-2 text-base text-slate-600 font-light">
                      เป้าหมาย : {kpi.target}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <FormField
                        control={form.control}
                        name={`departmentKpi.${index}.departmentKpiId`}
                        render={({ field }) => <></>}
                        defaultValue={kpi._id}
                      />
                      <FormField
                        control={form.control}
                        name={`departmentKpi.${index}.evaluateScore`}
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-[200px]">
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="เลือกคะแนน" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {kpi.evaluateScore.map((score, index) => (
                                  <SelectItem key={index} value={score._id}>
                                    {score.score}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`departmentKpi.${index}.comment`}
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input placeholder="ระบุเหตุผล" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {!isEmpty(KPIdata.employeeKpi) && (
            <div id="personal-kpi" className="my-12">
              <div className="text-xl font-semibold my-4">Personal KPIs</div>
              {KPIdata.employeeKpi?.map((kpi, index) => (
                <Card key={index} className="mt-4">
                  <CardHeader>
                    <div className="text-lg flex items-center">
                      <div className="flex items-center p-2 mr-4 rounded-md bg-blue-700 text-white font-semibold">
                        {kpi.weight}%
                      </div>
                      <div>{kpi.kpi}</div>
                    </div>
                    <div className="pt-2 text-base text-slate-600 font-light">
                      เป้าหมาย : {kpi.target}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <FormField
                        control={form.control}
                        name={`employeeKpi.${index}.employeeKpiId`}
                        render={({ field }) => <></>}
                        defaultValue={kpi._id}
                      />
                      <FormField
                        control={form.control}
                        name={`employeeKpi.${index}.evaluateScore`}
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-[200px]">
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="เลือกคะแนน" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {kpi.evaluateScore.map((score, index) => (
                                  <SelectItem key={index} value={score._id}>
                                    {score.score}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`employeeKpi.${index}.comment`}
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input placeholder="ระบุเหตุผล" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div id="additional-comment" className="mb-12">
            <div className="text-xl font-semibold my-4">Additional Comment</div>
            <FormField
              control={form.control}
              name="additions"
              render={({ field }) => (
                <Textarea
                  placeholder="ระบุความคิดเห็น หรือข้อแนะนำเพิ่มเติม"
                  className="w-full resize-y"
                  {...field}
                />
              )}
              defaultValue=""
            />
          </div>
          <div className="flex justify-center mb-12">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={loading} size="lg">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  ส่งผลประเมิน
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>ยืนยันการส่งผลประเมิน</AlertDialogTitle>
                  <AlertDialogDescription>
                    ขั้นตอนนี้สามารถทำได้เพียงครั้งเดียว
                    กรุณาตรวจสอบข้อมูลให้ดีก่อนกดยืนยัน
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>กลับ</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button onClick={handleSubmit}>ยืนยัน</Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </div>
  )
}
