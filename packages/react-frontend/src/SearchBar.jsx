import { useState, useEffect } from 'react'

const SearchBar = ({ onSearch }) => {
 const [search, setSearch] = useState('')
 const [placeholderIndex, setPlaceholderIndex] = useState(0)
 const [isFading, setIsFading] = useState(false)

 const placeholders = [
  'Search by category',
  'Search by date',
  'Search by location',
  'Search by status',
 ]

 useEffect(() => {
  const interval = setInterval(() => {
   setIsFading(true)
   setTimeout(() => {
    setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length)
    setIsFading(false)
   }, 500)
  }, 3000) // Change text every 3 seconds

  return () => clearInterval(interval) // Cleanup on unmount
 }, [])

 const handleSearchChange = (event) => {
  const value = event.target.value
  setSearch(value)
  if (onSearch) {
   onSearch(value)
  }
 }

 return (
  <input
   type="text"
   value={search}
   onChange={handleSearchChange}
   placeholder={placeholders[placeholderIndex]}
   style={{
    width: '97.5%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.5s ease-in-out',
    opacity: isFading ? 0 : 1,
    marginTop: '30px',
   }}
  />
 )
}

export default SearchBar
