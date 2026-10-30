import ExpenseItem from './ExpenseItem.jsx'

/** Props: expenses is the visible list and onDeleteExpense handles item removal. */
export default function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state" data-cy="empty-state">
        <span className="empty-icon" aria-hidden="true">∅</span>
        <p>No expenses here yet</p>
        <span>Add an expense or choose a different category.</span>
      </div>
    )
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDeleteExpense={onDeleteExpense}
        />
      ))}
    </ul>
  )
}
