import { useMemo, useState } from 'react'
import CategoryFilter from './components/CategoryFilter.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import { calculateTotal, formatCurrency } from './expenseUtils.js'

const initialExpenses = []

// Props: none; owns the expense collection and selected category shared by its children.
export default function App() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [category, setCategory] = useState('All')
  const visibleExpenses = useMemo(
    () => category === 'All' ? expenses : expenses.filter((expense) => expense.category === category),
    [category, expenses],
  )

  function addExpense(expense) {
    setExpenses((current) => [...current, { ...expense, id: crypto.randomUUID() }])
  }

  function deleteExpense(id) {
    setExpenses((current) => current.filter((expense) => expense.id !== id))
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Pennywise home">
          <span className="brand-icon" aria-hidden="true">$</span>
          <span>Pennywise</span>
        </a>
        <span className="topbar-note">Your money, in focus</span>
      </header>

      <section className="intro">
        <p className="eyebrow">PERSONAL FINANCE</p>
        <h1>Small choices.<br /><span>Clear picture.</span></h1>
        <p className="intro-copy">Keep track of the little things and feel good about the big picture.</p>
      </section>

      <section className="summary-card" aria-label="Expense summary">
        <div>
          <span className="summary-label">Total spent</span>
          <strong data-cy="total" data-testid="total">{formatCurrency(calculateTotal(visibleExpenses))}</strong>
        </div>
        <span className="summary-divider" aria-hidden="true" />
        <div>
          <span className="summary-label">Showing</span>
          <strong data-cy="count" data-testid="count">{visibleExpenses.length} <span className="summary-unit">{visibleExpenses.length === 1 ? 'expense' : 'expenses'}</span></strong>
        </div>
        <span className="summary-sparkle" aria-hidden="true">✳</span>
      </section>

      <section className="entry-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GET STARTED</p>
            <h2>Add an expense</h2>
          </div>
          <span className="heading-number">01</span>
        </div>
        <ExpenseForm onAddExpense={addExpense} />
      </section>

      <section className="ledger-section">
        <div className="section-heading ledger-heading">
          <div>
            <p className="eyebrow">YOUR ACTIVITY</p>
            <h2>Recent expenses</h2>
          </div>
          <CategoryFilter category={category} onCategoryChange={setCategory} />
        </div>
        <ExpenseList expenses={visibleExpenses} onDeleteExpense={deleteExpense} />
      </section>

      <footer className="footer">
        <span>One day at a time.</span>
        <span>Made for a clearer mind <span aria-hidden="true">✳</span></span>
      </footer>
    </main>
  )
}
