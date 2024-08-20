import { useSelector } from "react-redux";
import WidgetCards from "./WidgetCards";
import { Row } from "antd";
import AddWidgetCard from "./AddWidgetCard";
import SpanHeading from "../custom/SpanHeading";

//this component maps through all the widgets for a given category

export default function CategoryCards(props) {
    let { category } = props;
    let searchVal = useSelector(state => state.dashboard.searchQuery);
    if (category.widgets.length === 0 && searchVal !== "") {
        return null;
    }
    else {
        return (
            <div>
                <SpanHeading>{category.name}</SpanHeading>
                <Row gutter={[15, 15]}>
                    {category.widgets.map((val) => {
                        return (
                            <WidgetCards
                                key={val.widgetId}
                                widgetId={val.widgetId}
                                widgetName={val.widgetName}
                                widgetText={val.widgetText}
                                categoryId={category.id}
                            />
                        );
                    })}
                    <AddWidgetCard category={category} />
                </Row>
            </div>
        );
    }
}