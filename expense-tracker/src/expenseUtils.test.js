import { calculateTotal, formatCurrency, validateExpense } from './expenseUtils.js'

describe('validateExpense', () => {
  it('accepts a trimmed title and a positive amount', () => {
    expect(validateExpense({ title: '  Lunch ', amount: '12.5', category: 'Food' })).toEqual({})
  })

  it('rejects a title containing only whitespace', () => {
    expect(validateExpense({ title: '   ', amount: '12', category: 'Food' })).toHaveProperty('title')
  })

  it.each(['abc', '0', '-1', ''])('rejects invalid amount %j', (amount) => {
    expect(validateExpense({ title: 'Lunch', amount, category: 'Food' })).toHaveProperty('amount')
  })

  it('rejects amounts greater than 100,000', () => {
    expect(validateExpense({ title: 'Laptop', amount: '100000.01', category: 'Other' })).toHaveProperty('amount')
  })

  it('rejects a category outside the supported categories', () => {
    expect(validateExpense({ title: 'Lunch', amount: '12', category: 'Shopping' })).toHaveProperty('category')
  })
})

describe('expense calculations', () => {
  it('calculates the sum of expense amounts', () => {
    expect(calculateTotal([{ amount: 12.5 }, { amount: 7.25 }, { amount: 100 }])).toBe(119.75)
  })

  it('returns zero for an empty expense list', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('formats currency with exactly two decimal places', () => {
    expect(formatCurrency(250)).toBe('$250.00')
  })
})
