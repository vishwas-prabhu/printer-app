import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { CartDialogComponent } from './cart-dialog.component'

const getBoundingClientRectData = {
  bottom: 0,
  top: 0,
}

describe('CartDialogComponent', () => {
  let component: CartDialogComponent
  let fixture: ComponentFixture<CartDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDialogComponent],
      imports: [MatSnackBarModule, MatDialogModule],
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
