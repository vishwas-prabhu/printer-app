import { HttpClientTestingModule } from '@angular/common/http/testing'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { Routes } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth.service'
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component'
import { AuthResponse } from 'src/app/shared/interfaces/auth-response'
import { Location } from '@angular/common'

import { LoginComponent } from './login.component'

const SuccessApiResponse = {
  api_response: {
    code: 200,
    message: 'Successful',
    jwt_token: 'ekdfn.ksnd.ksndn',
    name: 'Admin',
  },
}

const FailureApiResponse: AuthResponse = {
  api_response: {
    code: 400,
    message: 'failure',
    jwt_token: '',
    name: '',
  },
}
const authServiceStub = {
  handleLogin(value: any): Observable<AuthResponse> {
    return of(FailureApiResponse)
  },
  isLoggedIn(): boolean {
    return true
  },
}

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
]

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    }).compileComponents()
    location = TestBed.inject(Location)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should toggle password type to text or password on invoking togglePasswordType', () => {
    component.togglePasswordType()
    expect(component.passwordType).toEqual('text')
    component.togglePasswordType()
    expect(component.passwordType).toEqual('password')
  })

  it('should set email error when login is failed', fakeAsync(() => {
    component.onSubmit()
    tick()
    expect(component.emailError).toEqual('User Credentials error')
    expect(location.path()).toEqual('')
  }))

  it('should redirect to dashboard on successful login', fakeAsync(() => {
    authServiceStub.handleLogin = value => of(SuccessApiResponse)
    component.onSubmit()
    tick()
    expect(component.emailError).toEqual('')
    expect(location.path()).toEqual('/dashboard')
  }))

  it('should redirect to dashboard when user is logged in', fakeAsync(() => {
    authServiceStub.isLoggedIn = () => true
    component.ngOnInit()
    tick()
    expect(location.path()).toEqual('/dashboard')
  }))
})
