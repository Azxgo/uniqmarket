export function TableMini({data, columns}) {

    return (
        <div className="overflow-x-auto rounded-lg p-4 border border-gray-300">
            <table className="table-fixed w-full text-left divide-y divide-gray-500/20 bg-white ">

                <thead className="">
                    <tr>
                        {columns.map(({ label, field, width }) => (
                            <th
                                key={field}
                                className={`px-1 py-2 ${width ?? ''} select-none`}
                            >
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="bg-white">
                    {data.slice(0,5).map((item, i) => {
                        return (
                            <tr key={i}>
                                {columns.map(({ field, render }) => (
                                    <td key={field} className="px-1 py-2">
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