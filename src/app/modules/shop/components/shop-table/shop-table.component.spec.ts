import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'

import { ShopTableComponent } from './shop-table.component'

describe('ShopTableComponent', () => {
  let component: ShopTableComponent
  let fixture: ComponentFixture<ShopTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopTableComponent],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        MatSortModule,
        MatTableModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
