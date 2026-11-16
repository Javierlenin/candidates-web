import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder,
  label,
}: SearchBarProps) => {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder={placeholder}
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
