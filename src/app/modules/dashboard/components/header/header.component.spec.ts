import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DebugElement } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { By } from '@angular/platform-browser'
import { Router, Routes } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { LoginComponent } from 'src/app/modules/auth/components/login/login.component'
import { PrinterComponent } from 'src/app/modules/printer/printer.component'
import { HeaderComponent } from './header.component'
import { Location } from '@angular/common'

const routes: Routes = [
  {
    path: 'dashboard/printer',
    component: PrinterComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
]

class MatDialogMock {
  open(): any {
    return {
      afterClosed: () => of(true),
    }
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  let router: Router
  let debugElement: DebugElement
  let dialog: MatDialog
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        MatIconModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
      ],
    }).compileComponents()
    router = TestBed.inject(Router)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    debugElement = fixture.debugElement
    dialog = TestBed.inject(MatDialog)
    location = TestBed.inject(Location)
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

    const sidebarButton = debugElement.query(By.css('mat-icon'))
    sidebarButton.triggerEventHandler('click', null)
    // fixture.nativeElement.querySelector('mat-icon').click()
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
    expect(headerTitle.textContent).toEqual('dashboard/printer')
  }))

  it('should logout on click and move to login page', fakeAsync(() => {
    component.showDropdown = 'profile'
    fixture.detectChanges()

    spyOn(component, 'openLogoutDialog').and.callThrough()

    const logoutButton = debugElement.query(By.css('.logout'))
    logoutButton.triggerEventHandler('click', null)
    tick()
    expect(component.openLogoutDialog).toHaveBeenCalled()
    expect(location.path()).toEqual('/auth/login')
  }))
})
