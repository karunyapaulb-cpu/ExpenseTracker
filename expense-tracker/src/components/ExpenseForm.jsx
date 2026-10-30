import { useState } from 'react'
import { CATEGORIES, validateExpense } from '../expenseUtils.js'

/** Props: onAddExpense receives a validated expense; local state holds form values and errors. */
export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateExpense({ title, amount, category })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onAddExpense({
      title: title.trim(),
      amount: Number(amount),
      category,
    })
    setTitle('')
    setAmount('')
    setCategory(CATEGORIES[0])
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="expense-title">Expense name</label>
        <input
          id="expense-title"
          data-cy="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Coffee with Sam"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && <p className="field-error" id="title-error">{errors.title}</p>}
      </div>
      <div className="field">
        <label htmlFor="expense-amount">Amount</label>
        <div className="amount-input">
          <span aria-hidden="true">$</span>
          <input
            id="expense-amount"
            data-cy="amount"
            type="number"
            min="0.01"
            max="100000"
            step="any"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="0.00"
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
          />
        </div>
        {errors.amount && <p className="field-error" id="amount-error">{errors.amount}</p>}
      </div>
      <div className="field">
        <label htmlFor="expense-category">Category</label>
        <select
          id="expense-category"
          data-cy="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {CATEGORIES.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <button className="add-button" data-cy="add-expense" type="submit">
        <span aria-hidden="true">+</span> Add expense
      </button>
    </form>
  )
}
