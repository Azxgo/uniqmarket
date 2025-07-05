import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";

export function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register} = useAuthContext();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true)
        const result = await register(username, email, password);
        setLoading(false)
        if (!result) {
            setError("Invalid");
        } else {
            console.log("Usuario registrado exitosamente");
        }
    };

    return (
        <div className="flex w-full justify-center bg-gray-50 h-screen items-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col p-8 rounded-lg gap-5 w-full max-w-[400px] bg-white shadow-lg "
            >
                <h2 className="text-[30px] text-center font-bold">Registro</h2>

                {error && <p className="text-center text-red-400">{error}</p>}
                {loading && <p className="text-center text-blue-400">Cargando...</p>}

                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-gray-600">Usuario:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-[#ddd] rounded-md"
                        placeholder="Ingresa tu nombre de usuario..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-gray-600">Correo Electrónico:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-[#ddd] rounded-md"
                        placeholder="Ingresa tu correo electrónico..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-gray-600">Contraseña:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-[#ddd] rounded-md"
                        placeholder="Ingresa tu contraseña..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-zinc-800 text-white p-2 rounded-md hover:bg-zinc-700 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Registrando..." :"Crear Cuenta"}
                </button>
            </form>
            <title>Registro - Uniqmarket</title>
        </div>
    );
}