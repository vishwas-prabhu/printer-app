import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  let app: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents()
    fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance
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

  // tslint-disable-next-line max-line-length
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

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent)
  //   fixture.detectChanges()
  //   const compiled = fixture.nativeElement
  //   expect(compiled.querySelector('.content span').textContent).toContain(
  //     'printer-app app is running!'
  //   )
  // })
})
