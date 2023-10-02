import { useEffect, useRef } from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsInfo';
import { actions } from '../../slices/store.js';

const ListChannels = () => {
  const channelRef = useRef({});
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channelSlice.currentChannelId);
  const { selectChannel } = actions;
  useEffect(() => {
    if (!channelRef.current[currentChannelId]) {
      return;
    }
    channelRef.current[currentChannelId].scrollIntoView();
  }, [channels, currentChannelId]);
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        !channel.removable ? (
          <li ref={(el) => { channelRef.current[channel.id] = el; }} key={channel.id} className="nav-item w-100">
            <Button
              type="button"
              onClick={() => dispatch(selectChannel(channel.id))}
              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start btn"
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </li>
        ) : (
          <li key={channel.id} ref={(el) => { channelRef.current[channel.id] = el; }} className="nav-item w-100">
            <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
              <Button type="button" onClick={() => dispatch(selectChannel(channel.id))} variant={channel.id === currentChannelId ? 'secondary' : 'light'} className="w-100 text-truncate rounded-0 text-start btn">
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              <Dropdown.Toggle split id="" variant={channel.id === currentChannelId ? 'secondary' : 'light'}>
                <span className="visually-hidden">{t('channelManagement')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatch(actions.openModal({ type: 'del', target: channel.id }))}>{t('modals.delete')}</Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(actions.openModal({ type: 'ren', target: channel.id }))}>{t('modals.rename')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        )
      ))}
    </ul>
  );
};

export default ListChannels;
