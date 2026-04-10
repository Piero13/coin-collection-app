import { Toast, ToastContainer } from 'react-bootstrap';

/** Global Toast component **/
const AppToast = ({ show, message, onClose, variant = 'success' }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} bg={variant} delay={3000} autohide>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AppToast;