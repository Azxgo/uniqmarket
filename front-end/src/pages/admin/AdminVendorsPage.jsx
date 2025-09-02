import { useEffect, useState } from "react";
import { useAdminTitle } from "../../context/admin/AdminTitleContext";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminVendorsPage() {
    const { setTitle } = useAdminTitle()
    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState("")

    useEffect(() => {

    }, [])
}