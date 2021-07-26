import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule } from '@angular/material/dialog'

import { ShopHeaderComponent } from './shop-header.component'

describe('ShopHeaderComponent', () => {
  let component: ShopHeaderComponent
  let fixture: ComponentFixture<ShopHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopHeaderComponent],
      imports: [MatDialogModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
