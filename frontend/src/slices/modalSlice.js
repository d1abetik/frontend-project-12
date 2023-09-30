/* eslint no-param-reassign: "error" */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    show: false,
    type: '',
    target: null,
  },
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, target } = payload;
      state.modal.show = true;
      state.modal.type = type;
      state.modal.target = target;
    },
    closeModal: (state, { payload }) => {
      const { type, target } = payload;
      state.modal.show = false;
      state.modal.type = type;
      state.modal.target = target;
    },
  },
});

const actions = { ...modalSlice.actions };
export { actions };
export default modalSlice.reducer;
