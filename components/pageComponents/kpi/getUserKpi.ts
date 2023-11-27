import axios, { AxiosError } from "axios"
import { isEmpty } from "lodash"
import { Employee, EmployeeProps, ExplainEvaluate } from "./EmployeeProps"

interface Props {
  email?: string
  id?: string
}

export interface GetUserKpiResponse {
  data: EmployeeProps
  peers: Employee[]
  funcCompMatrix: ExplainEvaluate[]
}

export default async function GetUserKpi(
  { email, id }: Props = {
    email: "",
    id: "",
  }
) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/employee`,
      params: {
        email: email,
        id: id,
      },
    })
    const data: EmployeeProps = res.data
    const funcCompMatrix: ExplainEvaluate[] = data.explainEvaluate
    let peers: Employee[] = []
    if (!isEmpty(data.employee)) {
      peers.push({ ...data.employee, type: "ตัวเอง" })
    }
    if (!isEmpty(data.evaluation.peers)) {
      peers.push(
        ...data.evaluation.peers.map((peer) => ({
          ...peer,
          type: "เพื่อนร่วมงาน",
        }))
      )
    }
    if (!isEmpty(data.evaluation.supervisor)) {
      peers.push(
        ...data.evaluation.supervisor.map((supervisor) => ({
          ...supervisor,
          type: "หัวหน้า",
        }))
      )
    }
    if (!isEmpty(data.evaluation.subordinate)) {
      peers.push(
        ...data.evaluation.subordinate.map((subordinate) => ({
          ...subordinate,
          type: "ลูกทีม",
        }))
      )
    }
    return {
      data: data as EmployeeProps,
      peers: peers as Employee[],
      funcCompMatrix: funcCompMatrix as ExplainEvaluate[],
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError
      return err.response
    } else {
      throw new Error("unknown error")
    }
  }
}
