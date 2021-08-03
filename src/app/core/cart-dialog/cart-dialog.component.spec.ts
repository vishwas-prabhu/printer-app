import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { By } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { of } from 'rxjs'
import { CartService } from '../services/cart.service'

import { CartDialogComponent } from './cart-dialog.component'

const getBoundingClientRectData = {
  bottom: 0,
  top: 0,
}

const MatDialogMock = {
  open(): any {
    return {
      afterClosed: () => of(true),
    }
  },
}

const cartDataItems = [
  { id: 1010, name: 'tristique pharetra.' },
  { id: 1013, name: 'pharetra.' },
  { id: 1011, name: 'tristique' },
]

const cartServiceStub = {
  cartItems: cartDataItems,
  getIndexOfCartItem(id: number): number {
    return this.cartItems.findIndex(item => item.id === id)
  },
  removeItemFromCart(index: number): void {
    this.cartItems.splice(index, 1)
  },
}

describe('CartDialogComponent', () => {
  let component: CartDialogComponent
  let fixture: ComponentFixture<CartDialogComponent>
  let dialog: MatDialog
  let debugElement: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDialogComponent],
      imports: [MatSnackBarModule, MatDialogModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            updatePosition: () => {},
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            positionRelativeToElement: {
              nativeElement: {
                getBoundingClientRect: () => getBoundingClientRectData,
              },
            },
          },
        },
        {
          provide: MatDialog,
          useValue: MatDialogMock,
        },
        { provide: CartService, useValue: cartServiceStub },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDialogComponent)
    component = fixture.componentInstance
    dialog = TestBed.inject(MatDialog)
    debugElement = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should delete the cartitem if true is returned from dialog', () => {
    expect(component.cartData.length).toBe(3)

    spyOn(component, 'openDialog').and.callThrough()
    spyOn(component, 'removeItemFromCart').and.callThrough()

    const deleteButton = debugElement.query(By.css('.delete'))
    deleteButton.triggerEventHandler('click', null)
    expect(component.openDialog).toHaveBeenCalled()
    expect(component.removeItemFromCart).toHaveBeenCalled()
    expect(component.cartData.length).toBe(2)
  })

  it('should not remove the cartitem if false is returned from dialog', () => {
    MatDialogMock.open = () => {
      return {
        afterClosed: () => of(false),
      }
    }
    fixture.detectChanges()
    expect(component.cartData.length).toBe(2)

    spyOn(component, 'openDialog').and.callThrough()
    spyOn(component, 'removeItemFromCart').and.callThrough()

    const deleteButton = debugElement.query(By.css('.delete'))
    deleteButton.triggerEventHandler('click', null)
    expect(component.openDialog).toHaveBeenCalled()
    expect(component.removeItemFromCart).not.toHaveBeenCalled()
    expect(component.cartData.length).toBe(2)
  })
})
