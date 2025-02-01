import DailyTable from "../view/DailyTable";
import { render, screen } from '@testing-library/react'

test('DailyTable renders header', () => {
  render(<DailyTable/>)

  const element = screen.getByText('Daily Electricity Information')
  expect(element).toBeDefined()
})

test('DailyTable renders table', () => {
  render(<DailyTable/>);
  const element = screen.getByTestId("maintable")
  expect(element).toBeDefined()
})
