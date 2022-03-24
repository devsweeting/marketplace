import { render, screen } from '@testing-library/react'
import HomePage from '../pages'

describe('HomePage', () => {
  it('renders page', () => {
    render(<HomePage />)
    expect(screen.queryByText(/jump/i)).toBeVisible()
  })
})
