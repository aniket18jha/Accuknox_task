import { createSlice } from "@reduxjs/toolkit";

//the state in this slice can be updated to generate breadcrumbs as per pages. Currently we have a single breadcrumb

let initialState = {
    breadcrumbs: []
};

export const breadcrumbSlice = createSlice({
    name: "breadcrumb",
    initialState,
    reducers: {
        updateBreadcrumbs: (state, action) => {
            state.breadcrumbs = action.payload;
        }
    }
});

export const { updateBreadcrumbs } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
