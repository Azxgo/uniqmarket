import { useEffect, useState } from "react"
import useAdmin from "../../hooks/admin/useAdmin"
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminTitle } from "../../context/admin/AdminTitleContext"
import { MisceláneoIcon } from "../../icons/CategoryIcons";
import { IndexCard } from "../../components/admin/IndexCard";
import { TableMini } from "../../components/admin/TableMini";
import { orderColumns as columns } from "../../utils/columns";
import useOrders from "../../hooks/admin/useOrders";



export default function Index() {
    const { setTitle } = useAdminTitle()
    const { orders } = useOrders()

    useEffect(() => {
        setTitle("Dashboard")
    }, [])
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <IndexCard name="Ganancias" />
                        <IndexCard name="Ordenes" />
                        <IndexCard name="Usuarios" />
                        <IndexCard name="Usuarios" />
                    </div>

                    <div className="rounded-md bg-white p-3 h-[300px]">
                        Aca voy a hacer un gráfico, quizá necesite instalar alguna librería
                    </div>
                </div>


                <div className="rounded-md bg-white p-3 h-[100%]">
                    Mejores productos
                </div>
            </div>

            <div className="flex mt-3">
                <div className="flex rounded-md p-6 bg-white">
                    <TableMini
                        data={orders}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    )
}