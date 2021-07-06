import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { Observable, of } from 'rxjs'
import { PrinterService } from 'src/app/core/services/printer.service'
import { PrinterListResponse } from '../../interfaces/printer-data'

import { PrintTableComponent } from './print-table.component'

const printerData = {
  printerList: [
    {
      id: 'HPEPMC10501',
      name: '255.453.126.56',
      status: 'true',
    },
  ],
  totalPages: 1,
  pageNumber: 1,
}

const printerServiceStub = {
  getPrintersData(): Observable<PrinterListResponse> {
    return of(printerData)
  },
  getPrintersDataByPage(): Observable<PrinterListResponse> {
    return of(printerData)
  },
}

describe('PrintTableComponent', () => {
  let component: PrintTableComponent
  let fixture: ComponentFixture<PrintTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintTableComponent],
      imports: [HttpClientTestingModule, MatIconModule],
      providers: [{ provide: PrinterService, useValue: printerServiceStub }],
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

  // tslint:disable-next-line: max-line-length
  it('should set sortedColumn to "" when same value is assigned to sortedColumn', () => {
    component.sortedColumn = 'id'
    component.sort('id')
    expect(component.sortedColumn).toEqual('')
    expect(component.sortedColumn).not.toEqual('id')
  })

  // tslint:disable-next-line: max-line-length
  it('should replace sortedColumn value with new value when sort is invoked', () => {
    component.sortedColumn = 'id'
    component.sort('name')
    expect(component.sortedColumn).toEqual('name')
    expect(component.sortedColumn).not.toEqual('')
  })

  it('should update totalPages array based on the parameter value', () => {
    component.totalPages = [1, 2, 3, 4]
    component.populateTotalPages(5)
    expect(component.totalPages).toEqual([1, 2, 3, 4, 5])
  })

  it('should not update totalPages array when array length is same as parameter value', () => {
    component.totalPages = [1, 2, 3, 4]
    component.populateTotalPages(4)
    expect(component.totalPages.length).toEqual(4)
  })

  it('should load data from API to printerData array', () => {
    component.paginate = false
    component.loadPrinterData()
    fixture.detectChanges()
    expect(component.printerData.length).toEqual(1)
    expect(fixture.nativeElement.querySelector('tr td').textContent).toEqual(
      'HPEPMC10501'
    )
  })

  // tslint:disable-next-line: max-line-length
  it('should load data from API to printerData array when paginate is true', () => {
    component.paginate = true
    component.pageNo = 0
    component.loadPrinterData()
    fixture.detectChanges()
    expect(component.printerData.length).toEqual(1)
    expect(fixture.nativeElement.querySelector('tr td').textContent).toEqual(
      'HPEPMC10501'
    )
  })
})
