// src/views/MenuView.jsx
import React from "react";
import Card from "./Card";
import { FaPlus, FaCalendarAlt, FaSearch, FaChartPie } from "react-icons/fa";

const ICONS = {
    add: <FaPlus size={40} />,
    calendar: <FaCalendarAlt size={40} />,
    search: <FaSearch size={40} />,
    summary: <FaChartPie size={40} />,
};

const MenuView = ({ setView }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Add Task/Event" icon={ICONS.add} onClick={() => setView("add")} />
        <Card title="View Schedule" icon={ICONS.calendar} onClick={() => setView("schedule")} />
        <Card title="Search" icon={ICONS.search} onClick={() => alert("Search coming soon!")} />
        <Card title="Summary" icon={ICONS.summary} onClick={() => alert("Summary coming soon!")} />
    </div>
);

export default MenuView;
