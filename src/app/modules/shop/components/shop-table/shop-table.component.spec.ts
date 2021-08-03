import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { of } from 'rxjs'
import { CartService } from 'src/app/core/services/cart.service'
import { ShopTableData } from 'src/app/shared/interfaces/shop-data'
import { ShopTableComponent } from './shop-table.component'

const productList = [
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
]

const cartServiceStub = {
  cartItems: [{ id: 1010, name: 'tristique pharetra.' }],
  getIndexOfCartItem(id: number): number {
    return this.cartItems.findIndex(item => item.id === id)
  },
  addItemToCart(data: ShopTableData): void {
    this.cartItems.push({ name: data.substrate_name, id: data.id })
  },
  removeItemFromCart(index: number): void {
    this.cartItems.splice(index, 1)
  },
}

class MatDialogMock {
  open(): any {
    return {
      afterClosed: () => of(true),
    }
  }
}

describe('ShopTableComponent', () => {
  let component: ShopTableComponent
  let fixture: ComponentFixture<ShopTableComponent>
  let dialog: MatDialog

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopTableComponent],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        MatSortModule,
        MatTableModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: CartService, useValue: cartServiceStub },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTableComponent)
    component = fixture.componentInstance
    component.dataSource = new MatTableDataSource<ShopTableData>(productList)
    dialog = TestBed.inject(MatDialog)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should return + sign if item is present in cart', () => {
    expect(component.getSign(1010)).toEqual('-')
    expect(component.getSign(1020)).toEqual('+')
  })

  it('should add the item into the cart when addToCart is invoked', () => {
    expect(component.getSign(1009)).toEqual('+')
    component.addToCart(productList[0])
    expect(component.getSign(1009)).toEqual('-')
  })

  // tslint:disable-next-line: max-line-length
  it('should remove the item from the card when addToCart is invoked', fakeAsync(() => {
    component.addToCart(productList[0])
    flush()
    expect(component.getSign(1009)).toEqual('+')
  }))
})
