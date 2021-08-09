import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { CartItem } from 'src/app/shared/interfaces/cart-item'

import { CartService } from './cart.service'

const cartItems = [
  {
    name: 'Lorem ispum',
    id: '1001',
  },
  {
    name: 'Vplur odem',
    id: '1002',
  },
] as CartItem[]

describe('CartService', () => {
  let service: CartService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(CartService)
    service.cartItems = cartItems
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return index of the item in the array', (done: DoneFn) => {
    const index = service.getIndexOfCartItem('1002')
    expect(index).toEqual(1)
    done()
  })

  it('should add item to the cartItems array', (done: DoneFn) => {
    expect(service.cartItems.length).toEqual(2)
    const data = {
      added_to_cart: false,
      date_modified: '2021-07-14T17:08:04-07:00',
      id: 1062,
      _id: '1062',
      installed_in: false,
      manufacturer: '3P',
      model_supported: 'HP Latex 570 Printer(N2G70A)',
      source: 'HP Latex 570 Printer(N2G70A)',
      substrate_name: 'ut quam vel',
    }
    service.addItemToCart(data)

    const req = httpTestingController.expectOne(
      'http://localhost:3001/addToCart'
    )
    req.flush({ status: 200, message: 'Ok' })

    expect(service.cartItems.length).not.toEqual(2)
    expect(service.cartItems.length).toEqual(3)
    done()
  })

  it('should delete item from the cart items array', (done: DoneFn) => {
    service.removeItemFromCart(0)

    const req = httpTestingController.expectOne(
      'http://localhost:3001/deleteFromCart'
    )
    req.flush({ status: 200, message: 'Ok' })

    expect(service.cartItems.length).toEqual(2)
    done()
  })
})
