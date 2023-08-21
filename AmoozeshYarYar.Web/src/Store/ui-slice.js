import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        // authentication
        showPassWord: false,
        // header
        expandNavbar: false,
        //time input
        isStartTime: true,
        //pagination
        pageNO: 0,
        itemPerPage: 10,
        // loading
        isloading: false,

    },
    reducers: {

        hidePassword(state, action) {
            state.showPassWord = !state.showPassWord;
        },
        NavbarToggler(state, action) {
            state.expandNavbar = !state.expandNavbar;
        },
        timeInputToggler(state, action) {
            state.isStartTime = !state.isStartTime;
        },
        setPageNO(state, action) {
            state.pageNO = parseInt(action.payload.pageNO);
        },
        setItemPerPage(state, action) {
            state.itemPerPage = parseInt(action.payload.itemPerPage);
        },
        setLoader(state, action) {
            state.isloading = action.payload;
        },

    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;