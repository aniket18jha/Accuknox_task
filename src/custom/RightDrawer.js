import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AddWidgetDrawer from "../components/AddWidgetDrawer";
import { openDrawer } from "../features/Dashboard/drawerSlice";


//General component for opening right drawer. In this case, we have only one drawer component, however, we can add the component in the below object if we want to include it in a drawer.

const DRAWER_OBJ = {
    "ADD_WIDGET": AddWidgetDrawer
};

let headerStyle = {
    backgroundColor: "#161661",
    color: "white"
};

export default function RightDrawer() {
    let dispatch = useDispatch();
    let drawerData = useSelector(state => state.drawer.drawer);

    let CustomDrawer = DRAWER_OBJ[drawerData.drawerType];

    if (!drawerData.drawerType) { 
        return null;
    }
    else {
        return (
            <Drawer
                open={drawerData.drawerType}
                destroyOnClose
                size="large"
                styles={{
                    header: headerStyle
                }}
                title={drawerData.drawerProps.title}
                onClose={() => {
                    dispatch(openDrawer({
                        drawerType: false,
                        drawerProps: {}
                    }));
                }}
            >
                <CustomDrawer {...drawerData.drawerProps}/>
            </Drawer>
        );
    }
}