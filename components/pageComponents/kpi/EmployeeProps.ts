export interface EmployeeProps {
  employee: Employee
  evaluation: Evaluation
  explainEvaluate: ExplainEvaluate[]
}
export interface Employee {
  _id: string
  type?: string
  employeeId: string
  firstName: string
  lastName: string
  nickName: string
  title: Title
  position: Position
  positionCode?: string
  department: Department
  division: Division
  supervisorName?: SupervisorName
  email: string
  evaluated: boolean
  coreCompetencies: CoreCompetency[]
  functionalCompetencies?: FunctionalCompetency[]
  employeeKpi?: EmployeeKpi[]
  departmentKpi?: DepartmentKpi[]
}

export interface Title {
  _id: string
  title: string
}

export interface Position {
  _id: string
  name: string
  jg: number
}

export interface Department {
  _id: string
  name: string
}

export interface Division {
  _id: string
  name: string
}

export interface SupervisorName {
  _id: string
  employeeId: string
  firstName: string
  lastName: string
  nickName: string
  email: string
}

export interface CoreCompetency {
  _id: string
  weight: number
  competency: Competency
  evaluateScore: EvaluateScore[]
}

export interface Competency {
  _id: string
  name: string
}

export interface EvaluateScore {
  _id: string
  score: number
  details: string
  coreCompetencies: string
}

export interface FunctionalCompetency {
  _id: string
  employee: string
  weight: number
  competency: Competency
  evaluateScore: EvaluateScore[]
}

export interface EmployeeKpi {
  _id: string
  kpi: string
  target: string
  weight: number
  employee: string
  evaluateScore: EvaluateScore[]
}

export interface DepartmentKpi {
  _id: string
  kpi: string
  target: string
  department: string
  weight: number
  evaluateScore: EvaluateScore[]
}

export interface Evaluation {
  _id: string
  employee: string
  supervisor: Employee[]
  peers: Employee[]
  subordinate: Employee[]
}

export interface ExplainEvaluate {
  _id: string
  section: string
  score: Score[]
}

export interface Score {
  score: number
  details: string[]
}
