export const CATEGORIES = ['Food', 'Travel', 'Bills', 'Other']

export function validateExpense({ title, amount, category }) {
  const errors = {}
  const numericAmount = Number(amount)

  if (!title?.trim()) errors.title = 'Enter a title.'
  if (amount === '' || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    errors.amount = 'Enter an amount greater than zero.'
  } else if (numericAmount > 100000) {
    errors.amount = 'Amount must be 100,000 or less.'
  }
  if (!CATEGORIES.includes(category)) errors.category = 'Choose a category.'

  return errors
}

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
