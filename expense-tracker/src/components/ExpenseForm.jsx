import { CATEGORIES } from '../expenseUtils.js'

/** Props provide the controlled form values, errors, change handlers, and submit callback; state lives in App. */
export default function ExpenseForm({
  title,
  amount,
  category,
  errors,
  onTitleChange,
  onAmountChange,
  onCategoryChange,
  onSubmit,
}) {
  return (
    <form className="expense-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="expense-title">Expense name</label>
        <input
          id="expense-title"
          data-cy="title"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
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
            onChange={(event) => onAmountChange(event.target.value)}
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
          onChange={(event) => onCategoryChange(event.target.value)}
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
