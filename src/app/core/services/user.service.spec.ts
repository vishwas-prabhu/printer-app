import { TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { UserService } from './user.service'
import {
  DashboardDataResponse,
  UserResponse,
} from 'src/app/shared/interfaces/user'

const userData = {
  userList: [
    {
      userName: 'User 1',
      role: 'Super Admin',
      account: '6158976',
    },
    {
      userName: 'User 2',
      role: 'Admin',
      account: '798465654',
    },
  ],
} as UserResponse

const dashboardData = {
  kpiData: {
    totalUsers: 80,
    totalPrinters: 136,
    totalJobs: 145,
    totalIssues: 50,
  },
} as DashboardDataResponse

describe('UserService', () => {
  let service: UserService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(UserService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return the Observable of type UserResponse', () => {
    service.getUsersData().subscribe(data => {
      expect(data).toEqual(userData)
      expect(data.userList[0].userName).toEqual('User 1')
      expect(data.userList[1].role).toEqual('Admin')
    })
    const req = httpTestingController.expectOne(
      'http://localhost:3001/userList'
    )
    req.flush(userData)
  })

  it('should return the Observable of type DashboardDataResponse', () => {
    service.getDashboardData().subscribe(data => {
      expect(data).toEqual(dashboardData)
      expect(data.kpiData.totalUsers).toEqual(80)
      expect(data.kpiData.totalPrinters).toEqual(136)
    })
    const req = httpTestingController.expectOne('http://localhost:3001/kpiData')
    req.flush(dashboardData)
  })
})
