import { HttpClientTestingModule } from '@angular/common/http/testing'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { Router, Routes } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { PrinterComponent } from 'src/app/modules/printer/printer.component'
import { HeaderComponent } from './header.component'

const routes: Routes = [
  {
    path: 'dashboard/printer',
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
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        MatIconModule,
        MatDialogModule,
      ],
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
      '.header-info-subtitle'
    )
    tick()
    expect(headerTitle.textContent).toEqual('')
    router.navigate(['/dashboard/printer'])
    tick()
    fixture.detectChanges()
    console.log('header title', headerTitle)
    expect(headerTitle.textContent).toEqual('dashboard/printer')
  }))
})
