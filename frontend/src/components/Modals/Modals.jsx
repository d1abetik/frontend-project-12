import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slices/store.js';
import ModalAdd from './ModalAdd.jsx';
import ModalDelete from './ModalDelete.jsx';
import RenameModal from './ModalRename.jsx';

const modals = {
  add: ModalAdd,
  ren: RenameModal,
  del: ModalDelete,
};

const Modals = () => {
  const dispatch = useDispatch();
  const { show, type } = useSelector((state) => state.modalSlice.modal);
  const handleClose = () => {
    dispatch(actions.closeModal({ type: '', target: null }));
  };
  const ActiveModal = modals[type];
  return (
    <Modal show={show} onHide={handleClose} centered>
      {ActiveModal && <ActiveModal handleClose={handleClose} />}
    </Modal>
  );
};

export default Modals;
