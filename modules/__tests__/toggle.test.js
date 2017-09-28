const toggle = require('../toggle')
const { generateApp } = require('../../fixtures/app')
const { generateWindow, generateWindowSet } = require('../../fixtures/windowSet')
const { hideWindows, showWindows } = require('../windows')

jest.mock('../windows')

const app = generateApp()
let win
let set = generateWindowSet(2)

describe('toggle', () => {
  beforeAll(() => {
    app.getWindows.mockReturnValue(set)
  })

  describe('when windows blurred', () => {
    beforeEach(() => {
      toggle(app)
    })

    it('shows the windows', () => {
      expect(showWindows).toHaveBeenCalledTimes(1)
    })
  })

  describe('when windows focused', () => {
    beforeAll(() => {
      win = generateWindow()
      win.isFocused.mockReturnValue(true)
      set.add(win)
    })

    beforeEach(() => {
      toggle(app)
    })

    afterAll(() => {
      set.delete(win)
    })

    it('hides windows', () => {
      expect(hideWindows).toHaveBeenCalledTimes(1)
    })
  })
})
