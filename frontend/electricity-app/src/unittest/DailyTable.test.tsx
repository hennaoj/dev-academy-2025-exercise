import { expect, test } from "vitest";
import DailyTable from "../view/DailyTable";
import { render, screen } from '@testing-library/react'

test('DailyTable renders header', () => {
  render(<DailyTable/>)

  const element = screen.getByText('Daily Electricity Information')
  expect(element).toBeDefined()
})
