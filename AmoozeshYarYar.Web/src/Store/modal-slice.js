import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        content: '',
        id: '',
        errors: { errmessage: '' },
        data: []
    },
    reducers: {
        setModalData(state, action) {
            state.content = action.payload.content;
            if (action.payload.id) state.id = action.payload.id;
            if (action.payload.data) state.data = action.payload.data;
        },
        hideModal(state, action) {
            state.content = '';
            state.id = '';
            state.data = [];
            state.errors.errmessage = '';
        },
        errorHandler(state, action) {
            const typeOfHandler = action.payload.typeOfHandler;
            state.errors.errmessage = typeOfHandler === "CLEAR" ? '' : action.payload.errmessage;
        },
    }
});

export const modalActions = modalSlice.actions;
export default modalSlice;