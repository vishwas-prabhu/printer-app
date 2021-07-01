import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { PrinterListResponse } from 'src/app/shared/interfaces/printer-data'

import { PrinterService } from './printer.service'

const printerData = {
  printerList: [
    {
      id: 'HPEPMC10501',
      name: '255.453.126.56',
      status: 'true',
    },
    {
      id: 'HPEPMC10502',
      name: '26.453.126.56',
      status: 'true',
    },
    {
      id: 'HPEPMC10503',
      name: '87.453.126.56',
      status: 'true',
    },
  ],
  totalPages: 3,
  pageNumber: 1,
} as PrinterListResponse

describe('PrinterService', () => {
  let service: PrinterService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(PrinterService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return data of type PrinterListResponse from getPrintersData function', () => {
    service.getPrintersData().subscribe(data => {
      expect(data).toEqual(printerData)
      expect(data.printerList[0].id).toEqual('HPEPMC10501')
      expect(data.printerList[1].name).toEqual('26.453.126.56')
    })
    const req = httpTestingController.expectOne(
      'http://localhost:3001/printerList'
    )
    req.flush(printerData)
  })

  it('should return data of type PrinterListResponse from getPrintersDataByPage function', () => {
    const pageNo = 1
    service.getPrintersDataByPage(pageNo).subscribe(data => {
      expect(data).toEqual(printerData)
      expect(data.printerList[0].id).toEqual('HPEPMC10501')
      expect(data.printerList[1].name).toEqual('26.453.126.56')
    })
    const req = httpTestingController.expectOne(
      `http://localhost:3001/printerList/${pageNo}`
    )
    req.flush(printerData)
  })
})
