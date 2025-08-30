import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AdminTitleContext = createContext()

export const useAdminTitle = () => {
    return useContext(AdminTitleContext)
}

export function AdminTitleProvider({children}) {
    const [title, setTitle] = useState("")
    const [icon, setIcon] = useState(null)
    return (
        <AdminTitleContext.Provider value={{title, setTitle, icon, setIcon}}>
            {children}
        </AdminTitleContext.Provider>
    )
}