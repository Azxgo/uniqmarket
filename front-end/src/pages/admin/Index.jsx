import { useEffect } from "react"
import { useAdminTitle } from "../../context/admin/AdminTitleContext"
import { IndexCard } from "../../components/admin/IndexCard";
import { TableMini } from "../../components/admin/TableMini";
import { orderColumns as columns } from "../../utils/columns";
import useOrders from "../../hooks/admin/useOrders";
import { useUsers } from "../../hooks/admin/useUsers";
import { Chart } from "../../components/admin/Chart";


export default function Index() {
    const { setTitle } = useAdminTitle()
    const { orders, totalRenueves } = useOrders()
    const { users } = useUsers()

    useEffect(() => {
        setTitle("Dashboard")
    }, [])

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <IndexCard name="Ganancias" value={`$${totalRenueves.toFixed(2)}`} />
                        <IndexCard name="Ordenes" value={orders.length} />
                        <IndexCard name="Usuarios" value={users.length} />
                        <IndexCard name="Usuarios" />
                    </div>

                    <div className="flex flex-col gap-2 rounded-md bg-white p-6 h-[375px]">
                        <h1 className="text-2xl mb-2">Historial de Ganancias</h1>
                        <Chart orders={orders} />
                    </div>
                </div>


                <div className="rounded-md bg-white p-3 h-[100%]">
                    Mejores productos
                </div>
            </div>

            <div className="flex mt-3">
                <div className="flex flex-col gap-2 rounded-md p-6 bg-white">
                    <h1 className="text-2xl">Ultimas Ordenes</h1>
                    <TableMini
                        data={orders}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    )
}