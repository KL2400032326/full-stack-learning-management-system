import { Search } from 'lucide-react'

const SearchBar = ({ value = '', onChange, placeholder = 'Search...', className = '' }) => (
  <div className={`relative w-full max-w-md ${className}`}>
    <Search
      size={16}
      className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400 pointer-events-none"
    />
    <input
      type="search"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    />
  </div>
)

export default SearchBar
