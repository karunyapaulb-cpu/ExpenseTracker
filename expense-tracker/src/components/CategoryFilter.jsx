import { CATEGORIES } from '../expenseUtils.js'

/** Props: category is the selected filter and onCategoryChange updates it. */
export default function CategoryFilter({ category, onCategoryChange }) {
  return (
    <label className="filter-control">
      <span className="sr-only">Filter by category</span>
      <select
        data-cy="filter"
        aria-label="Filter by category"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option>All</option>
        {CATEGORIES.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
  )
}
