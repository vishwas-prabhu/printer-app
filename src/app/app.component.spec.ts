import { ComponentFixture, TestBed } from '@angular/core/testing'
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

  it('should have showDropdown value as false', () => {
    expect(app.showDropdown).toBeFalsy()
  })

  // tslint:disable-next-line: max-line-length
  it('should toggle value of showDropdown when toggleDropdown is called', () => {
    expect(app.showDropdown).toBe(false)
    app.toggleDropdown()
    fixture.detectChanges()
    expect(app.showDropdown).toBe(true)
  })

  it('should have show-sidebar class when showDropdown is true', () => {
    let sidebar = fixture.nativeElement.querySelector('.show-sidebar')
    expect(sidebar).toBeFalsy()
    app.showDropdown = true
    fixture.detectChanges()
    sidebar = fixture.nativeElement.querySelector('.show-sidebar')
    expect(sidebar).toBeTruthy()
  })

  it('redirects to /home path when current path is ""', async () => {
    await router.navigate([''])
    expect(location.path()).toBe('/home')
  })

  it('navigate to /home path when path is "home"', async () => {
    await router.navigate(['/home'])
    expect(location.path()).toBe('/home')
  })

  it('navigate to /printer path', async () => {
    await router.navigate(['/printer'])
    expect(location.path()).toBe('/printer')
  })

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent)
  //   fixture.detectChanges()
  //   const compiled = fixture.nativeElement
  //   expect(compiled.querySelector('.content span').textContent).toContain(
  //     'printer-app app is running!'
  //   )
  // })
})
