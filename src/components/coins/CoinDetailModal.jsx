import { useState } from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';

/** Modal to display coin details **/
const CoinDetailModal = ({ show, coin, onClose }) => {
  const [loading, setLoading] = useState(true);

  if (!coin) return null;

  return (
    <Modal show={show} onHide={onClose} centered className='border border-dark'>
      <Modal.Header closeButton className='bg-dark text-light'>
        <Modal.Title>{coin.model}</Modal.Title>
      </Modal.Header>

      <Modal.Body className='bg-light'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
          }}
        >
          {loading && <Spinner animation="border" />}

          <Image
            alt={coin.model}
            key={coin.image_url} // 🔥 IMPORTANT
            src={coin.image_url}
            fluid
            rounded
            style={{
              display: loading ? 'none' : 'block',
            }}
            onLoad={() => setLoading(false)}
          />
        </div>

        
      </Modal.Body>

      <Modal.Footer className='d-flex flex-column align-items-start bg-dark'>
        <p className='text-light'><strong className='text-light'>Lieu :</strong> {coin.place}</p>
        <p className='text-light'><strong className='text-light'>Année :</strong> {coin.year}</p>
        <p className='text-light'><strong className='text-light'>Description :</strong> {coin.description || '-'}</p>
      </Modal.Footer>
    </Modal>
  );
};

export default CoinDetailModal;