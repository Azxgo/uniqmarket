export function Sort({ onSortChange }) {
    const handleSortChange = (event) => {
        onSortChange(event.target.value);
    };

    return (
        <>
            <select className="mx-3 p-1 bg-white rounded-md outline-none" onChange={handleSortChange}>
                <option value="">Ordenar Por...</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="price_desc">De mayor a menor</option>
                <option value="price_asc">De menor a mayor</option>
            </select>
        </>
    )
}