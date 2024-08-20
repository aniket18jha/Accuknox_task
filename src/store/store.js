import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from '../features/Dashboard/dashboardSlice';
import drawerReducer from '../features/Dashboard/drawerSlice';
import breadcrumbReducer from '../features/Dashboard/breadcrumbSlice';

// this is the store that consists of all the reducers available in different slices 

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        drawer: drawerReducer,
        breadcrumbs: breadcrumbReducer
    }
});