import { isInRange } from '../index'

describe('isInRange', () => {
  it('should return true when giving startingPoint = 3 endPoint = 5 testValue = 4', () => {
    expect(isInRange(4, 3, 5)).toBeTruthy()
  })
  it('should return false when giving startingPoint = 3 endPoint = 5 testValue = 2', () => {
    expect(isInRange(2, 3, 5)).toBeFalsy()
  })
  it('should return false when giving startingPoint = 3 endPoint = 5 testValue = 6', () => {
    expect(isInRange(6, 3, 5)).toBeFalsy()
  })
  
  it('should return true when giving startingPoint = 3 endPoint = 5 testValue = 3', () => {
    expect(isInRange(3, 3, 5)).toBeTruthy()
  })
  it('should return true when giving startingPoint = 3 endPoint = 5 testValue = 5', () => {
    expect(isInRange(5, 3, 5)).toBeTruthy()
  })
})
