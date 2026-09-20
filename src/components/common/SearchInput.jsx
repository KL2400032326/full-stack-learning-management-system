import SearchBar from './SearchBar'

const SearchInput = ({ value, onChange, placeholder = 'Search courses, users, content...' }) => (
  <SearchBar value={value} onChange={onChange} placeholder={placeholder} />
)

export default SearchInput
