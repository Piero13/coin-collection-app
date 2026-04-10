import { Form } from 'react-bootstrap';

const SortSelect = ({ value, onChange }) => {
  return (
    <>
      <p className='m-0 ms-1 fs-6'>Trier par :</p>
      <Form.Select
        className="mb-3 w-100 w-lg-40 border-primaryDark"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="recent">Toutes les pièces</option>
        <option value="place">Lieu A-Z</option>
        <option value="model">Modèle A-Z</option>
        <option value="year">Année</option>
      </Form.Select>
    </>
  );
};

export default SortSelect;