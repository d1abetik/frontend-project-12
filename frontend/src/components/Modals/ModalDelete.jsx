import React from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectors as channelsSelectors } from '../../slices/channelsInfo.js';
import { actions } from '../../slices/store.js';
import { useApi } from '../Auth/Socket.jsx';
import useAuth from '../Auth/hookAuth.js';

const ModalDelete = ({ handleClose }) => {
  const { api } = useApi();
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const dispatch = useDispatch();
  const { logOut } = useAuth();
  const deletedTargetChannelId = useSelector((state) => state.modalSlice.modal.target);
  const currentChannel = channels.find((channel) => channel.id === deletedTargetChannelId);
  const currentChannelId = useSelector((state) => state.channelSlice.currentChannelId);
  const defaultChannel = 1;
  const removeChannel = async () => {
    try {
      await api.deleteChannel(currentChannel);
      dispatch(actions.removeChannel(deletedTargetChannelId));
      toast.success(t('modals.removeChannel'));
      if (currentChannelId === deletedTargetChannelId) {
        dispatch(actions.selectChannel(defaultChannel));
      }
      handleClose();
    } catch (err) {
      toast.error(t('errors.network'));
      logOut();
    }
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.sure')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" type="submit" onClick={() => removeChannel()}>
          {t('modals.delete')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalDelete;
