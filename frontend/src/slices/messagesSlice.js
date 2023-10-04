import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { actions as channelsInfo } from './channelsInfo.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

/* eslint-disable */
const messageSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsInfo.fetchData.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      })
      .addCase(channelsInfo.removeChannel, (state, { payload }) => {
        const channelId = payload;
        const messages = Object.values(state.entities).filter((item) => item.id !== channelId);
        messagesAdapter.setAll(state, messages);
      });
  },
});
/* eslint-disable */

export default messageSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesSlice);
export const { actions } = messageSlice;
