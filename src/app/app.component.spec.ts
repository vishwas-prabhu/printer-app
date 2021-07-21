import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { Router, Routes } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { HomeComponent } from './modules/home/home.component'
import { PrinterComponent } from './modules/printer/printer.component'
import { Location } from '@angular/common'
import { HttpClientTestingModule } from '@angular/common/http/testing'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'printer',
    component: PrinterComponent,
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

  it('redirects to /home path when current path is ""', fakeAsync(() => {
    router.navigate([''])
    tick()
    expect(location.path()).toBe('/home')
  }))

  it('navigate to /home path when path is "home"', fakeAsync(() => {
    router.navigate(['/home'])
    tick()
    expect(location.path()).toBe('/home')
  }))

  it('navigate to /printer path', fakeAsync(() => {
    router.navigate(['/printer'])
    tick()
    expect(location.path()).toBe('/printer')
  }))
})
