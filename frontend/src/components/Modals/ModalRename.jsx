import { Formik } from 'formik';
import filter from 'leo-profanity';
import React, { useEffect, useRef } from 'react';
import {
  Button,
  Form,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { selectors as channelsSelectors } from '../../slices/channelsInfo.js';
import { actions } from '../../slices/store.js';
import { useApi } from '../Auth/Socket.jsx';
import useAuth from '../Auth/hookAuth.js';

const schema = (channels) => Yup.object().shape({
  name: Yup.string()
    .required('validation.required')
    .min(3, 'validation.length')
    .max(20, 'validation.length')
    .notOneOf(channels, 'validation.unique')
    .trim(),
});

const RenameModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { api } = useApi();
  const inputRef = useRef();
  const { t } = useTranslation();
  const { logOut } = useAuth();
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const channels = useSelector(channelsSelectors.selectAll);
  const channelId = useSelector((state) => state.modalSlice.modal.target);
  const [currentChannel] = channels.filter((channel) => channel.id === channelId);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema(channels.map((channel) => channel.name))}
        onSubmit={async (value, action) => {
          try {
            action.setSubmitting(true);
            const { name } = value;
            const renChannel = {
              name: filter.clean(name),
              id: currentChannel.id,
            };
            await api.renameChannel(renChannel);
            dispatch(actions.selectChannel(currentChannel.id));
            toast.success(t('modals.channelRename'));
            handleClose();
          } catch (error) {
            action.setSubmitting(false);
            toast.error(t('errors.network'));
            logOut();
          }
        }}
        initialValues={{
          name: currentChannel.name,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} noValidate className="py-1 border rounded-2">
            <Modal.Body>
              <Form.Group className="input-group has-validation">
                <Form.Control
                  name="name"
                  className="mb-2"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  value={values.name}
                  isInvalid={errors.name && touched.name}
                  ref={inputRef}
                  id="name"
                  autoComplete="off"
                />
                <Form.Label text="Имя канала" className="visually-hidden" htmlFor="name">{t('modals.name')}</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.name && t(`${errors.name}`)}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                {t('modals.cancel')}
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {t('modals.send')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RenameModal;
