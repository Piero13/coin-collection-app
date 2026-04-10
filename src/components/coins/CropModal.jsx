import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Modal, Button } from 'react-bootstrap';

/** Modal for cropping image **/
const CropModal = ({ show, image, onClose, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Body style={{ position: 'relative', height: 400 }}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape='round'
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, croppedAreaPixels) =>
            setCroppedArea(croppedAreaPixels)
          }
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button
          onClick={() => onCropDone(croppedArea)}
        >
          Crop
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CropModal;