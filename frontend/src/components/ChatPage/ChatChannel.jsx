/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/store.js';
import ListChannels from './ListChannel.jsx';

const Channel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(actions.openModal({ type: 'add', target: null }));
  };
  return (
    <Col md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 pe-2 p-4">
        <b>{t('channel')}</b>
        <Button type="button" text="+" variant="light" className="p-0 text-primary btn btn-group-vertical" onClick={() => openModal()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ListChannels />
    </Col>
  );
};

export default Channel;
