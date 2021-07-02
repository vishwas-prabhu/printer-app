import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UserTableComponent } from './user-table.component'

describe('UserTableComponent', () => {
  let component: UserTableComponent
  let fixture: ComponentFixture<UserTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      imports: [HttpClientTestingModule],
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
})
