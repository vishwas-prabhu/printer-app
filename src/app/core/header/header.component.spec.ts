import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { Router, Routes } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { PrinterComponent } from 'src/app/modules/printer/printer.component'
import { HeaderComponent } from './header.component'

const routes: Routes = [
  {
    path: 'printer',
    component: PrinterComponent,
  },
]

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule.withRoutes(routes), MatIconModule],
    }).compileComponents()
    router = TestBed.inject(Router)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should assign value to showDropdown on invoking openDropdown', () => {
    component.openDropdown('notifications')
    expect(component.showDropdown).toEqual('notifications')

    // assign null string when openDropdown is invoked with same parameter value
    component.openDropdown('notifications')
    expect(component.showDropdown).not.toEqual('notifications')
    expect(component.showDropdown).toEqual('')
  })

  it('should emit openSidebar event on click', () => {
    spyOn(component.openSideBar, 'emit')
    fixture.nativeElement.querySelector('mat-icon').click()
    fixture.detectChanges()
    expect(component.openSideBar.emit).toHaveBeenCalled()
  })

  // tslint:disable-next-line: max-line-length
  it('should update the header with path name of current page', fakeAsync(() => {
    const headerTitle = fixture.nativeElement.querySelector(
      '.header_infoSubTitle'
    )
    expect(headerTitle.textContent).toEqual('')
    router.navigate(['/printer'])
    tick()
    fixture.detectChanges()
    expect(headerTitle.textContent).toEqual('printer')
  }))
})
