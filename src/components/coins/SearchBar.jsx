import { Form } from 'react-bootstrap';

const SearchBar = ({ value, onChange }) => {
  return (
    <Form.Control
      className="mb-3 w-100 w-lg-40 border-primaryDark"
      placeholder="Rechercher..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;