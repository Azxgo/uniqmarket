import { useEffect } from "react"
import { useAdminTitle } from "../../context/admin/AdminTitleContext"
import { IndexCard } from "../../components/admin/IndexCard";
import { TableMini } from "../../components/admin/TableMini";
import { orderColumns as columns } from "../../utils/columns";
import useOrders from "../../hooks/admin/useOrders";
import { useUsers } from "../../hooks/admin/useUsers";
import { Chart } from "../../components/admin/Chart";
import useAdmin from "../../hooks/admin/useAdmin";
import { StarIcon } from "../../icons/MiscIcons"
import { LayoutIcon } from "../../icons/AdminIcons";


export default function Index() {
    const { setTitle, setIcon } = useAdminTitle()
    const { orders, totalRenueves } = useOrders()
    const { users } = useUsers()
    const { topProducts } = useAdmin()

    useEffect(() => {
        setTitle("Dashboard")
        setIcon(<LayoutIcon color="white" size={30} />)
    }, [])

    const last5Orders = orders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date)).slice(0, 5)

    return (
        <div className="">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <IndexCard name="Ganancias" value={`$${totalRenueves.toFixed(2)}`} />
                        <IndexCard name="Ordenes" value={orders.length} />
                        <IndexCard name="Usuarios" value={users.length} />
                        <IndexCard name="Reseñas" />
                    </div>

                    <div className="flex flex-col gap-4 rounded-md bg-white p-6 h-[405px] shadow-sm">
                        <h1 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Historial de Ganancias</h1>
                        <Chart orders={orders} />
                    </div>
                </div>


                <div className="rounded-md bg-white px-4 py-6 h-[100%] shadow-sm">
                    <h1 className="text-2xl font-semibold text-gray-700 border-b border-gray-200 pb-2">Mejores productos</h1>
                    <ul className="p-2">
                        {topProducts.map((prod, i) => (
                            <li key={i} className="flex border-b border-gray-200 rounded-lg py-6">
                                <div className="flex gap-3 items-center">
                                    <img src={prod.image_url} alt={prod.name}
                                        className="h-20 object-cover rounded-lg" />
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-sm">{prod.brand}</span>
                                        <span className="truncate overflow-hidden whitespace-nowrap w-60 text-gray-700 font-semibold">{prod.name}</span>
                                        <div className="flex items-center mt-1 gap-1">
                                            <StarIcon size={24} filled={true} />
                                            <span className="text-gray-700"> {prod.avg_rating} de {prod.total_reviews} reseñas</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex mt-4">
                <div className="flex flex-col rounded-md bg-white p-6 shadow-sm mb-4">
                    <h1 className="text-2xl font-semibold mb-2 text-gray-700 border-b border-gray-200 pb-2">Ultimas Ordenes</h1>
                    <TableMini
                        data={last5Orders}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    )
}