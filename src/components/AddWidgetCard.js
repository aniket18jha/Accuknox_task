import { Button, Col, Form, Input } from "antd";
import Box from "../custom/Box";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addWidget } from "../features/Dashboard/dashboardSlice";
import AddButton from "../custom/AddButton";

// this component has:
// 1. button to add widget 2. form to add widget using name and text 3. footer with cancel and confirm buttons 

export default function AddWidgetCard(props) {
    let { category } = props;
    let [form] = Form.useForm();
    let dispatch = useDispatch();
    const [widget, setWidget] = useState({
        widgetName: "",
        widgetText: ""
    });
    const [openWidget, setOpenWidget] = useState(false);

    const handleInputChange = (e) => {
        form.setFieldsValue({
            [e.target.name]: e.target.value
        });
        setWidget(widget => ({
            ...widget,
            [e.target.name]: e.target.value
        }));
    }
    return (
        <Col xs={24} sm={12} md={12} lg={8} style={{ minWidth: "250px" }}>
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {!openWidget && <AddButton onClick={() => {
                    setOpenWidget(true);
                }}>Add Widget</AddButton>}
                {openWidget && <Form form={form} style={{width: "inherit"}}>
                    <Form.Item name="widgetName" rules={[
                        {
                            required: true,
                            message: "Please enter widget name."
                        },
                        {
                            validator: (_, value) => {
                                if (!category.widgets.some(val => val.widgetName === value)) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Widget name should be unique in a particular category.'));
                              },
                        }
                    ]}>
                        <Input name="widgetName" className="input-field" value={widget.widgetName} placeholder="Please enter widget name" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item name="widgetText">
                        <Input name="widgetText" maxLength={500} className="input-field" value={widget.widgetText} placeholder="Please enter widget text" onChange={handleInputChange} />
                    </Form.Item>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button style={{ marginRight: "10px" }} onClick={() => {
                            setWidget({
                                widgetName: "",
                                widgetText: ""
                            });
                            form.setFieldsValue({
                                widgetName: "",
                                widgetText: ""
                            });
                            setOpenWidget(false);
                        }}>Cancel</Button>
                        <Button onClick={async () => {
                            try {
                                await form.validateFields();
                                dispatch(addWidget({
                                    categoryId: category.id,
                                    widgetName: widget.widgetName,
                                    widgetText: widget.widgetText
                                }));
                                setWidget({
                                    widgetName: "",
                                    widgetText: ""
                                });
                                form.setFieldsValue({
                                    widgetName: "",
                                    widgetText: ""
                                });
                                setOpenWidget(false);
                            }
                            catch (err) {
                                console.log("Showing error");
                            }
                        }}>Add Widget</Button>
                    </div>
                </Form>}
            </Box>
        </Col>
    );
}