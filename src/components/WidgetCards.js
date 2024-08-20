import { Col } from "antd";
import Box from "../custom/Box";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { updateWidgets } from "../features/Dashboard/dashboardSlice";
import NoData from "../custom/NoData";

//this component displays info about the widget

export default function WidgetCards(props) {
    let { widgetId, categoryId, widgetName, widgetText } = props;
    let dashboardData = useSelector(state => state.dashboard.categories);
    let dispatch = useDispatch();
    return (
        <Col xs={24} sm={12} md={12} lg={8} style={{minWidth: "250px"}}>
            <Box title={widgetName} extra={<CloseOutlined style={{color: "red"}} onClick={() => {
                let updatedArr = dashboardData.map((val) => {
                    if(val.id === categoryId) {
                        return {
                            ...val,
                            checkedVals: val.checkedVals.filter(x => x !== widgetId)
                        };
                    }
                    return val;
                });
                dispatch(updateWidgets([...updatedArr]));
            }}/>}>
                {widgetText !== "" ? <p style={{wordBreak: "break-all"}}>{widgetText}</p> : <NoData />}
            </Box>
        </Col>
    );
}