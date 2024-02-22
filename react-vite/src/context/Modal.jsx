import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState([]);

  const pushModalContent = (content) => {
    setModalContent([...modalContent, content]);
  }

  const popModalContent = () => {
    const content = modalContent[modalContent.length - 1];
    setModalContent(modalContent.slice(0, -1));
    return content;
  }

  const closeModal = (...args) => {
    const undefinedOrContent = popModalContent();
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (!!undefinedOrContent && typeof undefinedOrContent.onClose === 'function') {
      undefinedOrContent.onClose(...args);
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    popModalContent,
    pushModalContent,
    closeModal // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent: modalContentArray, closeModal } = useContext(ModalContext);

  let modalContent;

  if (modalContentArray.length) {
    modalContent = modalContentArray[modalContentArray.length - 1].component;
  }

  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
