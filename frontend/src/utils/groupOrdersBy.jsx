import { parseISO, format, startOfWeek } from "date-fns"

export function groupsOrderBy(orders, period = "day") {
    const map = {}

    orders.forEach(order => {
        const date = parseISO(order.order_date)
        let key

        if (period === "day") {
            key = format(date, "yyyy-MM-dd")
        } else if (period === "week") {
            key = format(startOfWeek(date, { weekStartsOn: 1}), "yyyy-MM-dd")
        } else if (period === "month") {
            key = format(date, "yyyy-MM")
        }

        const total = parseFloat(order.total || 0)
        map[key] = +( (map[key] || 0) + parseFloat(order.total || 0) ).toFixed(2)
    })

    return Object.entries(map).map(([date, total]) => ({date, total}))
}