import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'

import { PrintTableComponent } from './print-table.component'

describe('PrintTableComponent', () => {
  let component: PrintTableComponent
  let fixture: ComponentFixture<PrintTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintTableComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatSortModule,
        MatDialogModule,
      ],
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
})
