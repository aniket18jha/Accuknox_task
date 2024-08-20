import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { searchWidget } from "../features/Dashboard/dashboardSlice";

//search bar

export default function SearchBar () {
    let dispatch = useDispatch();
    const onSearch = (e) => {
        dispatch(searchWidget(e.target.value));
    }
    return (
        <div>
            <Input placeholder="Search Widget" onChange={onSearch} prefix={<SearchOutlined />}/>
        </div>
    );
}