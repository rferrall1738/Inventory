import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import HomePage from './HomePage'

// Mock dependencies
jest.mock('./Map', () => jest.fn(() => <div data-testid="map" />))
jest.mock('./searchbar', () =>
 jest.fn(({ onSearch }) => (
  <input
   data-testid="search-bar"
   onChange={(e) => onSearch(e.target.value)}
  />
 ))
)

describe('HomePage Component', () => {
 beforeEach(() => {
  // Mock the fetch API
  global.fetch = jest.fn(() =>
   Promise.resolve({
    ok: true,
    json: () =>
     Promise.resolve([
      {
       _id: '1',
       Item: 'Wallet',
       Location: 'Recreation Center',
       Category: 'Keys/Wallet',
       Date: '12-01-2024',
       Status: 'Found',
       Image: null,
       Lat: 35.305,
       Lng: -120.662,
      },
      {
       _id: '2',
       Item: 'Bruh',
       Location: 'Swine Unit',
       Category: 'Other',
       Date: '11-30-2024',
       Status: 'Lost',
       Image: null,
       Lat: 35.307,
       Lng: -120.664,
      },
     ]),
   })
  )
 })

 afterEach(() => {
  jest.clearAllMocks()
 })

 test('renders loading state initially', () => {
  render(<HomePage />)
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
 })

 test('fetches and displays items after loading', async () => {
  render(<HomePage />)
  await waitFor(() =>
   expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  )

  expect(screen.getByText('Wallet')).toBeInTheDocument()
  expect(screen.getByText('Bruh')).toBeInTheDocument()
 })

 test('filters items based on search input', async () => {
  render(<HomePage />)
  await waitFor(() =>
   expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  )

  const searchInput = screen.getByTestId('search-bar')
  fireEvent.change(searchInput, { target: { value: 'Bruh' } })

  expect(screen.queryByText('Wallet')).not.toBeInTheDocument()
  expect(screen.getByText('Bruh')).toBeInTheDocument()
 })

 test('renders the map component for each item', async () => {
  render(<HomePage />)
  await waitFor(() =>
   expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  )

  const maps = screen.getAllByTestId('map')
  expect(maps.length).toBe(2)
 })
})
