import React, { useState } from "react";
import { Button, Checkbox, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../features/Dashboard/drawerSlice";
import { updateWidgets } from "../features/Dashboard/dashboardSlice";
import SpanHeading from "../custom/SpanHeading";

// this component implements Add Widget drawer content.
// the content includes:
// 1. Tabs 2. Tabs Content 3. Checkboxes for widgets 4. Cancel/Confirm button for adding widget

function TabContent({ category, setCategory }) {
    const [checkedVals, setCheckedVals] = useState(category.checkedVals);
    const handleChange = (checkedValues) => {
        setCheckedVals([...checkedValues]);
        setCategory(cat => {
            return cat.map(val => {
                if (val.id === category.id) {
                    return {
                        ...val,
                        checkedVals: checkedValues
                    };
                }
                return { ...val };
            });
        });
    };
    return (
        <Checkbox.Group options={category.widgets.map(val => ({
            label: val.widgetName,
            value: val.widgetId
        }))} value={checkedVals} onChange={handleChange} />
    );
}

export default function AddWidgetDrawer(props) {

    let dispatch = useDispatch();
    // let filteredDashboardData = useSelector(selectFilteredData);
    let dashboardData = useSelector(state => state.dashboard.categories);
    const [myDashboardData, setMyDashboardData] = useState([...dashboardData]);
    let items = dashboardData.map((val) => {
        return {
            key: val.id,
            label: val.slug,
            children: <TabContent category={val} setCategory={setMyDashboardData} />
        };
    });

    const handleCancel = () => {
        dispatch(openDrawer({
            drawerType: false,
            drawerProps: {}
        }));
    }

    const handleConfirm = () => {
        dispatch(updateWidgets([...myDashboardData]));
        dispatch(openDrawer({
            drawerType: false,
            drawerProps: {}
        }));
    }

    return (
        <div>
            <SpanHeading>Personalize your dashboard by adding the following widget</SpanHeading>
            <Tabs items={items} />
            <div className="btn-container">
                <Button className="cancel-btn" onClick={handleCancel}>Cancel</Button>
                <Button className="confirm-btn" onClick={handleConfirm}>Confirm</Button>
            </div>
        </div>
    );
}