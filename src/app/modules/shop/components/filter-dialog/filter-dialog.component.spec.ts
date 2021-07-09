import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule } from '@angular/material/dialog'

import { FilterDialogComponent } from './filter-dialog.component'

describe('FilterDialogComponent', () => {
  let component: FilterDialogComponent
  let fixture: ComponentFixture<FilterDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterDialogComponent],
      imports: [MatDialogModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
