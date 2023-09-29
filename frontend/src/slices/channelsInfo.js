/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  miniSerializeError,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'channelInfo/setInitialState',
  async (auth, { rejected }) => {
    try {
      const response = await axios.get(routes.dataPath(), { headers: auth });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejected(error.response);
      } if (error.isAxiosError) {
        return rejected('AxiosError');
      }
      return rejected(miniSerializeError(error));
    }
  },
);

const adapter = createEntityAdapter();

const initialState = adapter.getInitialState({
  currentChannelId: null, loadingStatus: 'idle', error: null,
});

const channelInfo = createSlice({
  name: 'channelInfo',
  initialState,
  reducers: {
    addChannel: adapter.addOne,
    addChannels: adapter.addMany,
    updateChannel: adapter.setOne,
    selectChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeChannel: adapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        adapter.addMany(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      })
      .addCase(fetchData.rejected, (state, { payload }) => {
        state.loadingStatus = 'failed';
        state.error = payload;
      });
  },
});

const actions = {
  ...channelInfo.actions,
  fetchData,
};

export const stateCurrentChannelId = (state) => state.channelSlice.currentChannelId;
export const selectors = adapter.getSelectors((state) => state.channelSlice);
export { actions, fetchData };
export default channelInfo.reducer;
