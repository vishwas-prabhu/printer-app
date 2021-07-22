import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Location } from '@angular/common'
import { AuthService } from './auth.service'
import { AuthComponent } from 'src/app/modules/auth/auth.component'
import { Router, Routes } from '@angular/router'

const authData = {
  api_response: {
    name: 'admin',
    jwt_token: 'ksdkksdkljw.sdsd.sdsdsdsd',
    message: 'Success',
    code: 200,
  },
}

const failureAuthData = {
  api_response: {
    name: '',
    jwt_token: '',
    message: 'Failure',
    code: 400,
  },
}

const routes: Routes = [
  {
    path: 'auth/login',
    component: AuthComponent,
  },
]

describe('AuthService', () => {
  let service: AuthService
  let httpTestingController: HttpTestingController
  let location: Location
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
    })
    service = TestBed.inject(AuthService)
    location = TestBed.inject(Location)
    router = TestBed.inject(Router)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should set loggedinUser name from response on successful signin', () => {
    service
      .handleSignIn({
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'Admin@gmail.com',
      })
      .subscribe(data => {
        expect(data).toEqual(authData)
        expect(service.loggedInUser).toEqual('admin')
      })

    const req = httpTestingController.expectOne('http://localhost:3001/signin')
    req.flush(authData)
  })

  it('should set loggedinUser name from response on successful login', () => {
    service
      .handleLogin({
        email: 'admin@gmail.com',
        password: 'Admin@gmail.com',
      })
      .subscribe(data => {
        expect(data).toEqual(authData)
        expect(service.loggedInUser).toEqual('admin')
      })

    const req = httpTestingController.expectOne('http://localhost:3001/login')
    req.flush(authData)
  })

  it('should not set loggedinUser name from response on login failure', () => {
    service
      .handleLogin({
        email: 'admin@gmail.com',
        password: 'Admin@gmail.com',
      })
      .subscribe(data => {
        expect(data).toEqual(failureAuthData)
        expect(service.loggedInUser).toEqual('')
      })

    const req = httpTestingController.expectOne('http://localhost:3001/login')
    req.flush(failureAuthData)
  })

  it('should reset loggedinUser and redirect to /auth/login', fakeAsync(() => {
    service.loggedInUser = 'admin'
    service.logout()
    tick()
    expect(location.path()).toBe('/auth/login')
    expect(service.loggedInUser).toEqual('')
  }))
})
