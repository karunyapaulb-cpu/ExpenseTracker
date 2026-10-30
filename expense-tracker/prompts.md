# Prompt library

## New feature

**Context:** [Describe the current behavior, relevant files, and stack.]  
**Goal:** [Describe the feature to implement.]  
**Constraints:** [State compatibility, design, dependency, and scope limits.]  
**Acceptance criteria:** [List observable outcomes, each verifiable by a test.]  
**Examples:** [Give representative input/output or user flows.]

## Bug fix

**Context:** [Describe the affected behavior and relevant files.]  
**Goal:** Find the root cause and fix the reported bug.  
**Constraints:** Preserve working behavior, keep the change scoped, and do not add dependencies.  
**Acceptance criteria:** Add a regression test that fails before the fix and passes after it; all related tests pass.  
**Examples:** [Steps to reproduce and expected versus actual result.]

## Refactor

**Context:** [Describe the code and current behavior.]  
**Goal:** Improve [clarity/duplication/structure] without changing user-visible behavior.  
**Constraints:** Keep public interfaces and behavior stable; avoid unrelated edits and new dependencies.  
**Acceptance criteria:** Existing tests pass and add tests for any behavior previously uncovered.  
**Examples:** [Show the intended structure or a small before/after.]

## Generate tests

**Context:** [Describe the component/helper, its inputs, outputs, and existing tests.]  
**Goal:** Add tests for the specified behavior and meaningful edge cases.  
**Constraints:** Test observable outcomes, avoid implementation details and snapshots, and do not change production code.  
**Acceptance criteria:** Each test fails when its behavior is broken and passes against the correct implementation; run the focused test command.  
**Examples:** [Provide cases with expected outcomes.]

## Review diff

**Context:** Review the proposed diff for [feature/bug fix] in this repository.  
**Goal:** Identify correctness, regression, accessibility, and test gaps.  
**Constraints:** Do not edit files. Report only actionable issues with file/line references; distinguish confirmed bugs from questions.  
**Acceptance criteria:** Every finding states impact, evidence, and confidence; if no issues are found, say so explicitly.  
**Examples:** [Include relevant user flow or edge case.]

## Commit message

**Context:** Summarize the staged diff and intended change.  
**Goal:** Propose a concise conventional commit subject and optional body.  
**Constraints:** Describe only staged changes; use imperative mood and omit claims not supported by the diff.  
**Acceptance criteria:** Subject is concise, accurately describes the change, and follows the repository's commit style.  
**Examples:** `feat(expenses): add category filtering`

## Add expense feature prompt (five-part spec)

**Context:** This is a React expense tracker. The app keeps the expense collection in `App`; `ExpenseForm` receives an `onAddExpense` callback. Categories are Food, Travel, Bills, and Other.

**Goal:** Let a user add a valid expense using its title, amount, and category.

**Constraints:** Keep state in `App` and form input/error state in `ExpenseForm`. Validate before invoking the callback. Trim title whitespace. Do not add dependencies or accept non-finite, zero, negative, or greater-than-100,000 amounts.

**Acceptance criteria:**
1. Submitting title `Lunch`, amount `12.50`, and category `Food` calls `onAddExpense` once with `{ title: "Lunch", amount: 12.5, category: "Food" }`.
2. Submitting an empty or whitespace-only title displays a title error, does not call `onAddExpense`, and adds no list item.
3. Submitting an empty, non-numeric, zero, or negative amount displays an amount error, does not call `onAddExpense`, and adds no list item.
4. Submitting an amount greater than `100000` displays a limit error, does not call `onAddExpense`, and adds no list item.
5. After a successful submission, the form title and amount fields are empty and the selected category is Food.

**Examples:** `("  Lunch ", "12.50", "Food")` submits the trimmed title `Lunch` and numeric amount `12.5`; `("Lunch", "-1", "Food")` displays an amount error without adding a row.
