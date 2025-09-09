// src/pages/admin/DashboardHome.jsx
import React, { useEffect } from "react";
import CountUp from "react-countup";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardHome() {
  const ordersData = [
    { day: "Mon", orders: 20 },
    { day: "Tue", orders: 35 },
    { day: "Wed", orders: 28 },
    { day: "Thu", orders: 40 },
    { day: "Fri", orders: 25 },
    { day: "Sat", orders: 30 },
    { day: "Sun", orders: 50 },
  ];

 
  
  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Total Orders</p>
          <CountUp end={120} duration={1.5} className="text-2xl font-bold text-[#b9855c]" />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Revenue ($)</p>
          <CountUp end={1200} duration={1.5} className="text-2xl font-bold text-[#b9855c]" />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Products</p>
          <CountUp end={50} duration={1.5} className="text-2xl font-bold text-[#b9855c]" />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Reviews</p>
          <CountUp end={35} duration={1.5} className="text-2xl font-bold text-[#b9855c]" />
        </div>
      </div>

      {/* Orders Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Orders This Week</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={ordersData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#b9855c"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
