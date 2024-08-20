import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

// this slice consists of the dashboard data state. Consists of the following reducers:
// 1. Add Widget 2. Update Widgets(Bulk update and delete) 3. Search widget
// Extra Reducers:
// Fetch data from the json file using asyncthunk and update the state in the reducer according to the response of the async operation 

const initialState = {
    categories: [],
    searchQuery: "",
    isLoading: false,
    error: null
};

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchDashboardData',
    async () => {
        return await fetch("../../dashboardData.json").then(async (res) => {
            let data = await res.json();
            data.categories = data.categories.map(val => {
                return {
                    ...val,
                    checkedVals: val.widgets.map(val => val.widgetId)
                }
            });
            return data;
        }).catch((err) => {
            throw err;
        });
    }
);

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        addWidget: (state, action) => {
            let { categoryId, widgetName, widgetText } = action.payload;
            const widget = {
                widgetId: nanoid(),
                widgetName: widgetName,
                widgetText: widgetText
            };
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === categoryId) {
                        return {
                            ...category,
                            widgets: [...category.widgets, widget],
                            checkedVals: [...category.checkedVals, widget.widgetId]
                        }
                    }
                    return category;
                })
            };
        },
        // deleteWidget: (state, action) => {
        //     let { index, widgetId } = action.payload;
        //     return state.categories[index].widgets.filter(widget => widget.id !== widgetId)
        // },
        updateWidgets: (state, action) => {
            state.categories = action.payload;
        },
        searchWidget: (state, action) => {
            state.searchQuery = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDashboardData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(fetchDashboardData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload.categories;
        }).addCase(fetchDashboardData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});

export const { addWidget, deleteWidget, updateWidgets, searchWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;