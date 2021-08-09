import { HttpClientTestingModule } from '@angular/common/http/testing'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { Observable, of } from 'rxjs'
import { PrinterService } from 'src/app/core/services/printer.service'
import { ShopDataResponse } from 'src/app/shared/interfaces/shop-data'

import { ShopComponent } from './shop.component'

const columnsToDisplayObject = {
  added_to_cart: false,
  date_modified: false,
  installed_in: false,
  manufacturer: true,
  model_supported: true,
  source: true,
  substrate_name: true,
}

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
      _id: '1009',
    },
    {
      substrate_name: 'gravida mauris ut',
      source: 'HP Latex 570 Printer(N2G70A)',
      date_modified: '2021-12-29T10:46:50-08:00',
      installed_in: true,
      manufacturer: 'Info not available',
      model_supported: 'HP Latex 570 Printer(N2G70A)',
      added_to_cart: false,
      _id: '1010',
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
      _id: '1011',
      id: 1011,
    },
  ],
  pageNumber: 1,
  totalPages: 14,
}

const printerServiceStub = {
  getProductsData(pageNo: number): Observable<ShopDataResponse> {
    return of(productList)
  },
}

describe('ShopComponent', () => {
  let component: ShopComponent
  let fixture: ComponentFixture<ShopComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: PrinterService, useValue: printerServiceStub }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // tslint:disable-next-line: max-line-length
  it('should update the array with key name whose value is true', fakeAsync(() => {
    component.updateDisplayColumns(columnsToDisplayObject)
    tick()
    expect(component.columnsToDisplay).toEqual([
      'manufacturer',
      'model_supported',
      'source',
      'substrate_name',
    ])
  }))

  it('should load the data from API on component initialization', () => {
    expect(component.dataSource.data).toEqual(productList.productList)
  })
})
