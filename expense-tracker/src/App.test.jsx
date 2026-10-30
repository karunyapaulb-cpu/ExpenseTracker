import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

function renderApp() {
  return { user: userEvent.setup(), ...render(<App />) }
}

async function addExpense(user, { title, amount, category = 'Food' }) {
  await user.type(screen.getByLabelText('Expense name'), title)
  await user.type(screen.getByLabelText('Amount'), amount)
  await user.selectOptions(screen.getByLabelText('Category'), category)
  await user.click(screen.getByRole('button', { name: /add expense/i }))
}

describe('expense tracker', () => {
  it('adds a valid expense and clears the form', async () => {
    const { user } = renderApp()
    await addExpense(user, { title: 'Lunch', amount: '25.50' })

    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.getByLabelText('Expense name')).toHaveValue('')
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('rejects an empty title without adding an expense', async () => {
    const { user } = renderApp()
    await user.type(screen.getByLabelText('Amount'), '25')
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByText('Enter a title.')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it.each(['0', '-5', 'not-a-number'])('rejects invalid amount %s', async (amount) => {
    const { user } = renderApp()
    await user.type(screen.getByLabelText('Expense name'), 'Invalid')
    await user.type(screen.getByLabelText('Amount'), amount)
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByText('Enter an amount greater than zero.')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('rejects amounts above 100,000', async () => {
    const { user } = renderApp()
    await addExpense(user, { title: 'Too expensive', amount: '100000.01' })

    expect(screen.getByText('Amount must be 100,000 or less.')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('filters expenses by category and updates the visible total and count', async () => {
    const { user } = renderApp()
    await addExpense(user, { title: 'Lunch', amount: '250', category: 'Food' })
    await addExpense(user, { title: 'Cab', amount: '400', category: 'Travel' })

    await user.selectOptions(screen.getByLabelText('Filter by category'), 'Food')

    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.queryByText('Cab')).not.toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('$250.00')
    expect(screen.getByTestId('count')).toHaveTextContent('1 expense')
  })

  it('deletes an expense from the list and recalculates the total', async () => {
    const { user } = renderApp()
    await addExpense(user, { title: 'Coffee', amount: '4.50' })
    await addExpense(user, { title: 'Groceries', amount: '30' })
    const coffeeRow = screen.getByText('Coffee').closest('li')

    await user.click(within(coffeeRow).getByRole('button', { name: 'Delete Coffee' }))

    expect(screen.queryByText('Coffee')).not.toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('$30.00')
    expect(screen.getByTestId('count')).toHaveTextContent('1 expense')
  })

  it('shows a formatted running total for all visible expenses', async () => {
    const { user } = renderApp()
    await addExpense(user, { title: 'Tea', amount: '2' })
    await addExpense(user, { title: 'Book', amount: '18.50', category: 'Other' })

    expect(screen.getByTestId('total')).toHaveTextContent('$20.50')
    expect(screen.getByTestId('count')).toHaveTextContent('2 expenses')
  })
})
