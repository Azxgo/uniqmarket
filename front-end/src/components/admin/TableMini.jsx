export function TableMini({data, columns}) {

    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="table-fixed w-full text-left divide-y divide-gray-500/20 bg-white ">

                <thead className="bg-gray-100">
                    <tr>
                        {columns.map(({ label, field, width }) => (
                            <th
                                key={field}
                                className={`px-2 py-3 ${width ?? ''} select-none text-gray-700 font-medium`}
                            >
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="bg-white">
                    {data.slice(0,5).map((item, i) => {
                        return (
                            <tr key={i} className="odd:bg-white even:bg-gray-100">
                                {columns.map(({ field, render }) => (
                                    <td key={field} className="px-2 py-3">
                                        {render ? render(item) : item[field]}
                                    </td>
                                ))}

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}