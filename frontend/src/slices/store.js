import { combineReducers } from '@reduxjs/toolkit';
import channelSlice, { actions as channelSliceAction } from './channelsInfo.js';
import messagesSlice, { actions as messagesAction } from './messagesSlice.js';
import modalSlice, { actions as modalActiopns } from './modalSlice.js';

export default combineReducers({ channelSlice, messagesSlice, modalSlice });

const actions = {
  ...channelSliceAction,
  ...messagesAction,
  ...modalActiopns,
};

export { actions };
