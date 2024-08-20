import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";

//breadcrumbs

export default function Breadcrumbs () {
    let items = useSelector(state => state.breadcrumbs.breadcrumbs);
    return (
        <Breadcrumb items={items} separator=">" />
    );
}