import { useFiltersContext } from "../context/filtersContext"
import { useState } from "react"

export function FilterPrecio() {
    const { setMinValue, setMaxValue } = useFiltersContext();

    const [tempMin, setTempMin] = useState("");
    const [tempMax, setTempMax] = useState("");

    const handleMinChange = (e) => {
        setTempMin(e.target.value);
    };

    const handleMaxChange = (e) => {
        setTempMax(e.target.value);
    };

    const handleApplyFilters = () => {
        setMinValue(tempMin === "" ? 0 : Number(tempMin));
        setMaxValue(tempMax === "" ? Infinity : Number(tempMax));
    };

    return (
        <div className="flex flex-col p-2 mt-2 gap-y-3 rounded-md bg-gray-200">
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="min-price">Min:</label>
                    <input
                        type="number"
                        id="min-price"
                        placeholder="0"
                        value={tempMin}
                        onChange={handleMinChange}
                        className="bg-white rounded-md p-1
                    appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="max-price">Max:</label>
                    <input
                        type="number"
                        id="max-price"
                        placeholder="1000"
                        value={tempMax}
                        onChange={handleMaxChange}
                        className="bg-white rounded-md p-1 
                    appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </div>
            </div>

            <button
            className="bg-white hover:opacity-80 shadow-md p-2 rounded-md cursor-pointer"
            onClick={handleApplyFilters}>Aplicar</button>
        </div>
    );
}