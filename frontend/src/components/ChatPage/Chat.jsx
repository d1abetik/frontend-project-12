import React, { useEffect } from 'react';
import {
  Container, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slices/store.js';
import useAuth from '../Auth/hookAuth.js';
import Messages from '../Messages/Messages.jsx';
import Modals from '../Modals/Modals.jsx';
import Channel from './ChatChannel.jsx';

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { logOut } = useAuth();
  const { loadingStatus, error } = useSelector((state) => state.channelSlice);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(actions.fetchData({ Authorization: `Bearer ${user.token}` }));
      if (loadingStatus === 'failed') {
        if (error.status === 401) {
          logOut();
        }
        if (error === 'AxiosError') {
          logOut();
        }
      }
    };
    fetchData();
  }, [dispatch, user, loadingStatus, error, logOut]);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channel />
        <Messages />
        <Modals />
      </Row>
    </Container>
  );
};

export default Chat;
