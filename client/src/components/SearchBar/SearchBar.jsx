import React from 'react'
import { HiLocationMarker } from "react-icons/hi";

const SearchBar = ({filter,setFilter}) => {
  return (
    <div className="flexCenter search-bar">
    <HiLocationMarker color="var(--blue)" />
    <input placeholder='seach by title/city/country...' type="text" value={filter} onChange={(e)=>setFilter(e.target.value)} />
    <button className="button">Search</button>
  </div>
  )
}

export default SearchBar