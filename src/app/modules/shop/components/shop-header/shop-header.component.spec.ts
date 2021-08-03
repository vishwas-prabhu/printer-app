import { DebugElement } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'

import { ShopHeaderComponent } from './shop-header.component'

const displayColumns = {
  substrate_name: true,
  source: true,
  date_modified: true,
  installed_in: false,
  manufacturer: false,
  model_supported: false,
  added_to_cart: true,
}

const MatDialogMock = {
  open(): any {
    return {
      afterClosed: () => of(displayColumns),
    }
  },
}

describe('ShopHeaderComponent', () => {
  let component: ShopHeaderComponent
  let fixture: ComponentFixture<ShopHeaderComponent>
  let debugElement: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopHeaderComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialog,
          useValue: MatDialogMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopHeaderComponent)
    component = fixture.componentInstance
    debugElement = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set columns in localstorage and emit event with data as display columns', () => {
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, obj: any): void => {
        return
      }
    )
    spyOn(component, 'openDialog').and.callThrough()
    spyOn(component.updateColumn, 'emit')

    const dialogButton = debugElement.query(By.css('button'))
    dialogButton.triggerEventHandler('click', null)

    expect(component.openDialog).toHaveBeenCalled()
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'selectedColumns',
      JSON.stringify(displayColumns)
    )
    expect(component.updateColumn.emit).toHaveBeenCalledWith(displayColumns)
  })

  // tslint:disable-next-line: max-line-length
  it('should set the local storage with selectedTableColumns data initially', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string): any => {
      return false
    })
    spyOn(localStorage, 'setItem')

    component.setLocalStorage()
    tick()

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'selectedColumns',
      JSON.stringify(component.selectedTableColumns)
    )
  }))

  it('should emit displayColumns if displayColumns data is present in local storage', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string): any => {
      return JSON.stringify(displayColumns)
    })
    spyOn(component.updateColumn, 'emit')

    component.setLocalStorage()
    tick()

    expect(component.selectedTableColumns).toEqual(displayColumns)
    expect(component.updateColumn.emit).toHaveBeenCalledWith(displayColumns)
  }))

  it('should not set item if changes are not made in dialog', () => {
    spyOn(localStorage, 'setItem')
    spyOn(component, 'openDialog').and.callThrough()

    MatDialogMock.open = () => {
      return {
        afterClosed: () => of(false),
      }
    }

    const dialogButton = debugElement.query(By.css('button'))
    dialogButton.triggerEventHandler('click', null)
    expect(component.openDialog).toHaveBeenCalled()
    expect(localStorage.setItem).not.toHaveBeenCalled()
  })
})
