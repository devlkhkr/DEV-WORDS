import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalDataTypes {
  modalType: string;
  modalTitle: string;
  isOpen: boolean;
}

const initialState: ModalDataTypes = {
  modalType: "",
  modalTitle: "",
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const { modalType } = actions.payload;
      state.modalType = modalType;
      state.modalTitle = modalType;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: any) => state.modal;

export default modalSlice.reducer;
