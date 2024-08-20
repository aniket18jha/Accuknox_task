import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function AddButton ({ children, ...otherProps}) {
    return (
        <Button {...otherProps}><PlusOutlined />{children}</Button>
    );
}