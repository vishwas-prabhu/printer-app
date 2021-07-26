import { HttpClientTestingModule } from '@angular/common/http/testing'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { Observable, of } from 'rxjs'
import { UserService } from 'src/app/core/services/user.service'
import { UserResponse } from '../../interfaces/user'

import { UserTableComponent } from './user-table.component'

const userServiceStub = {
  getUsersData(): Observable<UserResponse> {
    const userData = {
      userList: [
        {
          userName: 'User 1',
          role: 'Super Admin',
          account: '6158976',
        },
      ],
    }
    return of(userData)
  },
}

describe('UserTableComponent', () => {
  let component: UserTableComponent
  let fixture: ComponentFixture<UserTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      imports: [HttpClientTestingModule, MatIconModule],
      providers: [{ provide: UserService, useValue: userServiceStub }],
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
    spyOn(component.searchTerms, 'next')
    const input = fixture.debugElement.nativeElement.querySelector('input')
    fixture.detectChanges()
    input.dispatchEvent(new Event('input'))
    tick()
    fixture.detectChanges()
    expect(component.searchTerms.next).toHaveBeenCalled()
  }))

  it('should invoke sort function on click event', fakeAsync(() => {
    spyOn(component, 'sort')
    const input = fixture.debugElement.nativeElement.querySelector('th span')
    input.dispatchEvent(new Event('click'))
    tick()
    fixture.detectChanges()
    expect(component.sort).toHaveBeenCalled()
  }))

  it('should load userData to allUsers array', () => {
    expect(component.allUsers.length).toEqual(1)
    const username = fixture.nativeElement.querySelectorAll('tr td')[1]
    expect(username.textContent).toEqual('User 1')
  })

  // tslint:disable-next-line: max-line-length
  it('should assign sortedColumn value as "" when previous value is assigned', fakeAsync(() => {
    component.sortedColumn = 'userName'
    tick()
    component.sort('userName')
    expect(component.sortedColumn).toEqual('')
    expect(component.sortedColumn).not.toEqual('userName')
  }))

  it('should assign parameter value as sortedColumn value', fakeAsync(() => {
    component.sortedColumn = 'userName'
    tick()
    component.sort('role')
    expect(component.sortedColumn).toEqual('role')
    expect(component.sortedColumn).not.toEqual('userName')
  }))
})
