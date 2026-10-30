# Agent instructions

## Stack and layout

- React with JavaScript and Vite.
- `src/App.jsx` owns application state and composes the UI.
- `src/components/` contains one React component per file.
- `src/expenseUtils.js` contains pure expense validation and calculation helpers.
- `src/*.test.jsx` and `src/*.test.js` contain Vitest and React Testing Library tests.
- `cypress/e2e/` contains browser-based end-to-end tests.

## Commands

- Install: `npm install`
- Start the app: `npm run dev`
- Production build: `npm run build`
- Unit and component tests: `npm test`
- Coverage: `npm run test:coverage`
- Cypress interactively: start `npm run dev` in another terminal, then `npm run cy:open`
- Cypress headlessly: start `npm run dev` in another terminal, then `npm run cy:run`

## Conventions

- Keep application state in `App`; pass data and callbacks to components through props.
- Use one component per file and add a short comment explaining each component's props/state.
- Keep calculation and validation logic in pure, directly tested helpers.
- Use accessible labels and stable `data-cy` selectors for end-to-end tests.
- Do not add dependencies without asking first.
- Work on a feature branch, never directly on `main`.
- Summarize the changes and test results for the pull request.
