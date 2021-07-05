import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { JobsTableComponent } from './jobs-table.component'

describe('JobsTableComponent', () => {
  let component: JobsTableComponent
  let fixture: ComponentFixture<JobsTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsTableComponent],
      imports: [MatTooltipModule, MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
