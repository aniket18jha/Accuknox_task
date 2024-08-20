import { createSelector } from "@reduxjs/toolkit";

let dashboardData = (state) => state.dashboard;

//this selector helps in implementing filters and temporarily updating data

export const selectFilteredData = createSelector(
    dashboardData,
    (dashboardData) => {
        let { categories, searchQuery } = dashboardData;
        return {
            categories: categories.map((val) => {
                return {
                    ...val,
                    widgets: val.widgets
                        .filter(x => {
                            return val.checkedVals.includes(x.widgetId)
                        })
                        .filter(x => {
                            return (x.widgetName.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === "" || x.widgetText.toLowerCase().includes(searchQuery.toLowerCase()))
                        })
                }
            })
        };
    }
);