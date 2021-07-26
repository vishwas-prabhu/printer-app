import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'

import { SidebarComponent } from './sidebar.component'

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit closeSidebar event when sidebar items are clicked', () => {
    spyOn(component.closeSideBar, 'emit')
    fixture.nativeElement.querySelector('.sidebar').click()
    fixture.detectChanges()
    expect(component.closeSideBar.emit).toHaveBeenCalled()
  })
})
