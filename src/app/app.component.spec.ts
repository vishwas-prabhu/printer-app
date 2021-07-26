import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { Router, Routes } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { Location } from '@angular/common'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DashboardComponent } from './modules/dashboard/dashboard.component'
import { AuthComponent } from './modules/auth/auth.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
]

describe('AppComponent', () => {
  let app: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let router: Router
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [AppComponent],
    }).compileComponents()
    fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance
    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    router.initialNavigation()
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  it(`should have as title 'printer-app'`, () => {
    expect(app.title).toEqual('printer-app')
  })

  it('redirects to /dashboard path when current path is ""', fakeAsync(() => {
    router.navigate([''])
    tick()
    expect(location.path()).toBe('/dashboard')
  }))

  it('navigate to /dashboard path when path is "dashboard"', fakeAsync(() => {
    router.navigate(['/dashboard'])
    tick()
    expect(location.path()).toBe('/dashboard')
  }))

  it('navigate to /auth path', fakeAsync(() => {
    router.navigate(['/auth'])
    tick()
    expect(location.path()).toBe('/auth')
  }))
})
