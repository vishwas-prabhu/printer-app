import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { CartDialogComponent } from './cart-dialog.component'

describe('CartDialogComponent', () => {
  let component: CartDialogComponent
  let fixture: ComponentFixture<CartDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDialogComponent],
      imports: [MatSnackBarModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
