import { createSlice } from "@reduxjs/toolkit";

// this slice is used for opening and closing drawer. Currently, we have a single drawer but we can open multiple drawer components by updating it's state. 

let initialState = {
    drawer: {
        drawerType: "",
        drawerProps: {}
    }
};

export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        openDrawer: (state, action) => {
            state.drawer = action.payload;
        }
    }
});

export const { openDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;