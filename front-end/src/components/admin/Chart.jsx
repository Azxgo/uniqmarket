import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useMemo, useState } from "react";
import { groupsOrderBy } from "../../utils/groupOrdersBy";

export function Chart({ orders }) {
    const [period, setPeriod] = useState("day")

    const data = useMemo(() => groupsOrderBy(orders, period), [orders, period])

    return (
        <div className="rounded-md bg-white">
            <div className="flex gap-2 mb-3">
                <button onClick={() => setPeriod("day")} className="px-2 py-1 rounded bg-gray-200">Día</button>
                <button onClick={() => setPeriod("week")} className="px-2 py-1 rounded bg-gray-200">Semana</button>
                <button onClick={() => setPeriod("month")} className="px-2 py-1 rounded bg-gray-200">Mes</button>
            </div>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" name="Ganancias" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}