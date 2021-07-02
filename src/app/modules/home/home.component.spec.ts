import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Location } from '@angular/common'
import { HomeComponent } from './home.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    location = TestBed.inject(Location)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should be in "/" path initially', () => {
    expect(location.path()).toBe('')
  })
})
