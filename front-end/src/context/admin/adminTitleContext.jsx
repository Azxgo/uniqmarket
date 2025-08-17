import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AdminTitleContext = createContext()

export const useAdminTitle = () => {
    return useContext(AdminTitleContext)
}

export function AdminTitleProvider({children}) {
    const [title, setTitle] = useState("")
    return (
        <AdminTitleContext.Provider value={{title, setTitle}}>
            {children}
        </AdminTitleContext.Provider>
    )
}