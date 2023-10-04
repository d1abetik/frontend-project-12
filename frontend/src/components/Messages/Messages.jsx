import React, { useEffect, useRef } from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsInfo.js';
import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import useAuth from '../Auth/hookAuth.js';
import MessagesForm from './MessagesForm.jsx';

const Massages = () => {
  const ref = useRef({});
  const { t } = useTranslation();
  const { user } = useAuth();

  const messages = useSelector(messagesSelectors.selectAll);
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channelSlice.currentChannelId);
  const currentChannel = channels.filter(({ id }) => id === currentChannelId)
    .map(({ name }) => name);
  console.log(currentChannel)
  const messagesChannel = messages.filter((message) => message.channelId === currentChannelId);
  const endMessage = messagesChannel[messagesChannel.length - 1];
  const endMessId = endMessage?.id;

  useEffect(() => {
    if (ref.current[endMessId] !== undefined) {
      ref.current[endMessId].scrollIntoView();
    }
  }, [messagesChannel, endMessId, endMessage]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${currentChannel}`}</b></p>
          <span className="text-muted">{t('messages.messageCount', { count: messagesChannel.length })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesChannel.length !== 0 ? messagesChannel.map((message) => (
            <div className="flx" key={message.id} ref={(el) => { ref.current[message?.id] = el; }}>
              <div className={`${message.userName === user.username ? 'text-break mb-2 user-message' : 'text-break mb-2 message'}`}>
                <b>{message.userName}</b>
                {`: ${message.body}`}
              </div>
            </div>
          )) : ''}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessagesForm currentChannelId={currentChannelId} messages={messages} />
        </div>
      </div>
    </Col>
  );
};

export default Massages;
