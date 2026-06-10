import { createContext, useContext, useState } from "react";

export const FilterContext = createContext();

export const useFiltersContext = () => {
    return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
    const [selectedBrands, setSelectedBrands] = useState([])
    const [minValue, setMinValue] = useState(); 
    const [maxValue, setMaxValue] = useState(Infinity);

    return (
        <FilterContext.Provider value={{selectedBrands, setSelectedBrands,
            minValue, setMinValue, maxValue, setMaxValue
        }}>
            {children}
        </FilterContext.Provider>
    );
};