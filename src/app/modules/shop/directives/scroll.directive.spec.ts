import { ScrollDirective } from './scroll.directive'

const data = {
  target: {
    scrollHeight: 820,
    clientHeight: 690,
    scrollTop: 110,
  },
}

describe('ScrollDirective', () => {
  it('should create an instance', () => {
    const directive = new ScrollDirective()
    expect(directive).toBeTruthy()
  })

  it('should emit loadNextPage event on scroll down', () => {
    const directive = new ScrollDirective()
    directive.previousOffsetTop = 100
    spyOn(directive.loadNextPage, 'emit')
    directive.onScroll(data)
    expect(directive.loadNextPage.emit).toHaveBeenCalled()
  })

  it('should not emit loadNextPage event on scroll up', () => {
    const directive = new ScrollDirective()
    directive.previousOffsetTop = 130
    spyOn(directive.loadNextPage, 'emit')
    directive.onScroll(data)
    expect(directive.loadNextPage.emit).not.toHaveBeenCalled()
  })
})
