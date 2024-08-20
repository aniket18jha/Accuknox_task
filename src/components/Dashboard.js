import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../features/Dashboard/dashboardSlice";
import CategoryCards from "./CategoryCards";
import { useEffect, useMemo } from "react";
import Container from "../custom/Container";
import { selectFilteredData } from "../features/Dashboard/filterSelector";
import { openDrawer } from "../features/Dashboard/drawerSlice";
import Topbar from "./Topbar";
import { updateBreadcrumbs } from "../features/Dashboard/breadcrumbSlice";
import AddButton from "../custom/AddButton";
import SpanHeading from "../custom/SpanHeading";
import NoData from "../custom/NoData";

// consists of: 
// 1. topbar 2. Add Widget/Category button which opens the right drawer 3. Categories list and their title

export default function Dashboard() {
    let dispatch = useDispatch();
    let filteredDashboardData = useSelector(selectFilteredData);

    useEffect(() => {
        dispatch(updateBreadcrumbs([{title: "Home"}, {title: "Dashboard v2"}]));
        dispatch(fetchDashboardData());
    }, [dispatch]);

    let isData = useMemo(() => {
        return filteredDashboardData.categories.filter(val => val.widgets.length > 0).length !== 0;
    }, [filteredDashboardData]);

    return (
        <div>
            <Topbar />
            <Container>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "60px" }}>
                    <SpanHeading>CNAPP Dashboard</SpanHeading>
                    <AddButton onClick={() => {
                        dispatch(openDrawer({
                            drawerType: "ADD_WIDGET",
                            drawerProps: {
                                title: "Add Widget",
                                // activeKey: categoryId
                            }
                        }));
                    }}>Add Widget</AddButton>
                </div>
                {isData ? filteredDashboardData.categories.map((val) => {
                    return (
                        <CategoryCards
                            key={val.id}
                            category={val}
                        />
                    );
                }) : <NoData />}
            </Container>
        </div>
    );
}