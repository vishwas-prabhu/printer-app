import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Location } from '@angular/common'
import { HomeComponent } from './home.component'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of } from 'rxjs'
import { UserService } from 'src/app/core/services/user.service'
import { DashboardDataResponse } from 'src/app/shared/interfaces/user'

const userServiceStub = {
  getDashboardData(): Observable<DashboardDataResponse> {
    const dashboardData = {
      kpiData: {
        totalUsers: 80,
        totalPrinters: 136,
        totalJobs: 145,
        totalIssues: 50,
      },
    }
    return of(dashboardData)
  },
}

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: UserService, useValue: userServiceStub }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    location = TestBed.inject(Location)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should be in "/" path initially', () => {
    expect(location.path()).toBe('')
  })

  it('should update card info with data reveived from API', () => {
    const cards = fixture.nativeElement.querySelectorAll('.home__cardInfo h3')
    fixture.detectChanges()
    expect(cards[0].textContent).not.toEqual('0')
    expect(cards[0].textContent).toEqual('80')
    expect(cards[1].textContent).toEqual('136')
  })
})
