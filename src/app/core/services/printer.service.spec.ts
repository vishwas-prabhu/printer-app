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

const productList = {
  productList: [
    {
      substrate_name: 'sociis natoque penatibus',
      source: 'HP Latex 570 Printer(N2G70A)',
      date_modified: '2021-03-08T08:38:31-08:00',
      installed_in: true,
      manufacturer: '--',
      model_supported: 'HP Latex 570 Printer(N2G70A)',
      added_to_cart: false,
      id: 1009,
    },
    {
      substrate_name: 'gravida mauris ut',
      source: 'HP Latex 570 Printer(N2G70A)',
      date_modified: '2021-12-29T10:46:50-08:00',
      installed_in: true,
      manufacturer: 'Info not available',
      model_supported: 'HP Latex 570 Printer(N2G70A)',
      added_to_cart: false,
      id: 1010,
    },
    {
      substrate_name: 'tristique pharetra.',
      source: 'HP Latex 570 Printer(N2G70A)',
      date_modified: '2021-11-21T15:49:17-08:00',
      installed_in: true,
      manufacturer: '3P',
      model_supported: 'HP Latex 570 Printer(N2G70A)',
      added_to_cart: false,
      id: 1011,
    },
  ],
  pageNumber: 1,
  totalPages: 14,
}

const productListFallback = { productList: [], totalPages: 0, pageNumber: 0 }

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

  // tslint:disable-next-line: max-line-length
  it('should return data of type ShopDataResponse from getProductsData function', () => {
    const pageNo = 1
    service.getProductsData(pageNo).subscribe(data => {
      expect(service.pageNumber).toEqual(1)
      expect(service.totalPages).toEqual(14)
      expect(service.isDataLoading).toEqual(false)
    })
    const req = httpTestingController.expectOne(
      `http://localhost:3001/shopTableData/${pageNo}`
    )
    req.flush(productList)
  })

  it('should not call API if dataLoading is true and should return fallback value', () => {
    const pageNo = 1
    service.isDataLoading = true
    service.getProductsData(pageNo).subscribe(data => {
      expect(data).toEqual(productListFallback)
    })
  })

  it('should set pageNumber to 0 if parameter value is 1', () => {
    service.isDataLoading = true
    service.getProductsData(1)
    expect(service.pageNumber).toEqual(0)
  })
})
