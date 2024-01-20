/* eslint-disable react/prop-types */
import '../styles/Modal.css';

import { useRef, useEffect } from 'react';

function Modal({ isOpen, isWon, functionOnClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else if (modalRef.current.open) {
      modalRef.current?.close();
    }
  }, [isOpen]);

  let textContent = '';
  if (isWon) {
    textContent = 'You won!';
  } else {
    textContent = 'You lose!';
  }

  return (
    <dialog ref={modalRef}>
      <p>{textContent}</p>
      <button type="button" onClick={functionOnClose}>
        Play again
      </button>
    </dialog>
  );
}

export default Modal;
