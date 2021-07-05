import { HttpClientTestingModule } from '@angular/common/http/testing'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'

import { UserTableComponent } from './user-table.component'

describe('UserTableComponent', () => {
  let component: UserTableComponent
  let fixture: ComponentFixture<UserTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      imports: [HttpClientTestingModule, MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should invoke search function on input event', fakeAsync(() => {
    spyOn(component, 'search')
    const input = fixture.debugElement.nativeElement.querySelector('input')
    fixture.detectChanges()
    input.dispatchEvent(new Event('input'))
    tick()
    fixture.detectChanges()
    expect(component.search).toHaveBeenCalled()
  }))

  it('should invoke sort function on click event', fakeAsync(() => {
    spyOn(component, 'sort')
    const input = fixture.debugElement.nativeElement.querySelector('th span')
    input.dispatchEvent(new Event('click'))
    tick()
    fixture.detectChanges()
    expect(component.sort).toHaveBeenCalled()
  }))

  // it('jksjj', fakeAsync(() => {
  //   component.sortingColumn = 'userName'
  //   tick()
  //   component.sort('userName')
  //   expect(component.sortingColumn).toEqual('')
  //   expect(component.sortingColumn).not.toEqual('userName')
  // }))
})
