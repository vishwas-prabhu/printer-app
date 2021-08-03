import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from '../services/auth.service'

import { AuthGuard } from './auth.guard'
const AuthServiceStub = {
  isLoggedIn(): boolean {
    return false
  },
}

const createMockRoute = (id: string | null) => {
  return {
    params: { id },
  } as any
}

const createMockRouteState = () => null as any

describe('AuthGuard', () => {
  let guard: AuthGuard
  const route = createMockRoute(null)
  const state = createMockRouteState()

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: AuthServiceStub }],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    guard = TestBed.inject(AuthGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  it('should not return true if user is not logged in', () => {
    const returnValue = guard.canActivate(route, state)
    expect(returnValue).not.toEqual(true)
  })

  it('should return true if user is logged in', () => {
    AuthServiceStub.isLoggedIn = () => true
    const returnValue = guard.canActivate(route, state)
    expect(returnValue).toEqual(true)
  })
})
