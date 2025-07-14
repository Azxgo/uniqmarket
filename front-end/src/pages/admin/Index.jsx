export default function Index() {
    return (
        <div className="">
            <div className="flex flex-col h-full w-full p-4 gap-6">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 m rounded-full bg-gray-800"></div>
                    <h1>PAGINA</h1>
                </div>
                <div className="flex bg-white rounded-md h-20">
                    <table className="table-fixed w-full text-left divide-y divide-gray-500/20">
                        <thead>
                            <tr>
                                <th className="px-1 py-2 text-center w-[40px]">■</th>
                                <th className="px-4 py-2 w-[320px]">Nombre</th>
                                <th className="px-1 py-2 w-[130px]">Categoria</th>
                                <th className="px-1 py-2 w-[100px]">Precio</th>
                                <th className="px-1 py-2 w-[150px]">Vendedor</th>
                                <th className="px-1 py-2 w-[100px]">Stock</th>
                                <th className="px-1 py-2 w-[150px]">Calificación</th>
                                <th className="px-1 py-2 text-center w-[90px]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-1 py-2 text-center">
                                    <input type="checkbox" />
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-3">
                                        <picture className="h-6 w-6 bg-gray-800 shrink-0" />
                                        <div className="truncate whitespace-nowrap overflow-hidden">
                                            Nombre productototototototototototototototototototo
                                        </div>
                                    </div>
                                </td>
                                <td className="px-1 py-2">Miscelaneo</td>
                                <td className="px-1 py-2">$33.00</td>
                                <td className="px-1 py-2">FashionAccesorios</td>
                                <td className="px-1 py-2">100</td>
                                <td className="px-1 py-2">FashionAccesorios</td>
                                <td className="px-1 py-2 text-center">...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}