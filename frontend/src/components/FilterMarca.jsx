import { useFiltersContext } from "../context/filtersContext";

export function FilterMarca({ allBrands }) {
    const { selectedBrands, setSelectedBrands } = useFiltersContext()

    const handleChange = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand) 
                : [...prev, brand]
        );
    };

    return (
        <ul className="flex flex-col p-2 mt-2 gap-2 rounded-md bg-gray-200">
           {allBrands.map((brand, index) => (
                <li key={index} className="flex gap-2">
                    <input
                        type="checkbox"
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleChange(brand)}
                        className="w-6 h-6"
                    />
                    <label htmlFor={brand}>{brand}</label>
                </li>
            ))}
        </ul>
    );
}