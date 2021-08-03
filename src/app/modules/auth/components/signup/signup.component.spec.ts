import { HttpClientTestingModule } from '@angular/common/http/testing'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of } from 'rxjs'
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component'
import { AuthResponse } from 'src/app/shared/interfaces/auth-response'
import { Location } from '@angular/common'
import { SignupComponent } from './signup.component'
import { AuthService } from 'src/app/core/services/auth.service'
import { Routes } from '@angular/router'

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
  handleSignIn(value: any): Observable<AuthResponse> {
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

describe('SignupComponent', () => {
  let component: SignupComponent
  let fixture: ComponentFixture<SignupComponent>
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
    }).compileComponents()
    location = TestBed.inject(Location)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent)
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

  it('should set email error when sign up is failed', fakeAsync(() => {
    component.onSubmit()
    tick()
    expect(component.emailError).toEqual('User Already Exists.')
    expect(location.path()).toEqual('')
  }))

  it('should redirect to dashboard on successful sign up', fakeAsync(() => {
    authServiceStub.handleSignIn = value => of(SuccessApiResponse)
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
