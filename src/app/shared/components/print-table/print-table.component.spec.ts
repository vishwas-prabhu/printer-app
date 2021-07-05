import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'

import { PrintTableComponent } from './print-table.component'

describe('PrintTableComponent', () => {
  let component: PrintTableComponent
  let fixture: ComponentFixture<PrintTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintTableComponent],
      imports: [HttpClientTestingModule, MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set sortingColumn to "" when same value is assigned to sortingColumn', () => {
    component.sortingColumn = 'id'
    component.sort('id')
    expect(component.sortingColumn).toEqual('')
    expect(component.sortingColumn).not.toEqual('id')
  })

  // tslint:disable-next-line: max-line-length
  it('should replace sortingColumn value with new value when sort is invoked', () => {
    component.sortingColumn = 'id'
    component.sort('name')
    expect(component.sortingColumn).toEqual('name')
    expect(component.sortingColumn).not.toEqual('')
  })

  it('totalPages array should be updated based on the parameter value', () => {
    component.totalPages = [1, 2, 3, 4]
    component.populateTotalPages(5)
    expect(component.totalPages).toEqual([1, 2, 3, 4, 5])
  })

  it('totalPages length should be same as parameter value', () => {
    component.totalPages = [1, 2, 3, 4]
    component.populateTotalPages(4)
    expect(component.totalPages.length).toEqual(4)
  })
})
