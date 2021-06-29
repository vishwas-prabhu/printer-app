export interface User {
  userName: string
  role: string
  account: string
}

export interface UserResponse {
  userList: User[]
}

export interface DashboardData {
  totalUsers: number
  totalPrinters: number
  totalJobs: number
  totalIssues: number
}

export interface DashboardDataResponse {
  kpiData: DashboardData
}
