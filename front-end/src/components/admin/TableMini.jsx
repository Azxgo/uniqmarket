export function TableMini({data, columns}) {

    return (
        <div className="overflow-x-auto">
            <table className="table-fixed w-full text-left divide-y divide-gray-500/20 bg-white rounded-md">

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
                    {data.map((item, i) => {
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