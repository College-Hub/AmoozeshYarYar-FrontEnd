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
        // Noresponse 
        NoResponseFromServer: false,
        // fialed requests

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
        setError(state , action) {
            let type = action.payload.type;
            if (type === "NO-RESPONSE")
                state.NoResponseFromServer = true;
        },
        deleteError(state, action) {
            let type = action.payload;
            if (type === "NO-RESPONSE") state.NoResponseFromServer = false;
        }

    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;