import { ElementRef } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'

import { FilterDialogComponent } from './filter-dialog.component'

export class MockELlRef extends ElementRef {}

const getBoundingClientRectData = {
  bottom: 0,
  top: 0,
}

describe('FilterDialogComponent', () => {
  let component: FilterDialogComponent
  let fixture: ComponentFixture<FilterDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterDialogComponent],
      imports: [MatDialogModule],
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
    fixture = TestBed.createComponent(FilterDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
