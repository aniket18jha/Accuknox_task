import Breadcrumbs from "./Breadcrumbs";
import SearchBar from "./SearchBar";

// This is a topbar. Consists of:
// 1. Breadcrumbs 2. Search Bar 

export default function Topbar () {
    return (
        <ul className="topbar">
            <li className="items-bread"><Breadcrumbs /></li>
            <li className="items-search"><SearchBar /></li>
        </ul>
    );
} 