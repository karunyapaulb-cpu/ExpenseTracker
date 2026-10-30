import { formatCurrency } from '../expenseUtils.js'

/** Props: expense supplies row content and onDeleteExpense removes that expense. */
export default function ExpenseItem({ expense, onDeleteExpense }) {
  return (
    <li className="expense-item" data-cy="expense-item">
      <span className={`category-mark category-${expense.category.toLowerCase()}`} aria-hidden="true">
        {expense.category === 'Food' ? 'F' : expense.category === 'Travel' ? 'T' : expense.category === 'Bills' ? 'B' : 'O'}
      </span>
      <span className="expense-description">
        <span className="expense-title">{expense.title}</span>
        <span className="expense-category">{expense.category}</span>
      </span>
      <span className="expense-amount">{formatCurrency(expense.amount)}</span>
      <button
        className="delete-button"
        data-cy="delete-expense"
        type="button"
        aria-label={`Delete ${expense.title}`}
        onClick={() => onDeleteExpense(expense.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}
