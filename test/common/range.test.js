/* eslint-env jest */
import {Range} from '../../src/main'

test('the first value must be less than the last value', () =>{
    let createError = _=> new Range(12, 0)
    expect(createError).toThrowError('The first value must be less than the last value.')
})

test('default first value of range be 0', () =>{
    expect(new Range().first).toBe(0)
})

test('did value hit', () =>{
    expect(new Range(0, 4).hit(3)).toBe(true)
})

test('did value not hit', () =>{
    expect(new Range(0, 4).hit(5)).toBe(false)
})

test('did range hit', () =>{
    let a = new Range(0, 3)
    let b = new Range(2, 7)
    expect(a.collision(b)).toBe(true)
})

test('did range not', () =>{
    let a = new Range(1, 3)
    let b = new Range(-3, 0)
    expect(a.collision(b)).toBe(false)
})