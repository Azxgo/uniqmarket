import { useState } from "react";
import { useAuthContext } from "../../context/authContext";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const result = await login(username, password);
        setLoading(false);

        if (!result) {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="flex w-full justify-center bg-gray-50 h-screen items-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col p-8 rounded-lg gap-5 w-full max-w-[400px] bg-white shadow-lg"
            >
                <h2 className="text-[30px] text-center font-bold">Iniciar Sesión</h2>

                {error && <p className="text-center text-red-400">{error}</p>}
                {loading && <p className="text-center text-blue-400">Cargando...</p>}

                <div className="flex flex-col gap-2">
                    <label className="text-gray-600">Usuario:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-[#ddd] rounded-md"
                        placeholder="Ingresa tu nombre de usuario..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-600">Contraseña:</label>
                    <input
                        type="password"
                        className="w-full p-2 border border-[#ddd] rounded-mdr"
                        placeholder="Ingresa tu contraseña..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="bg-zinc-800 text-white p-2 rounded-md disabled:opacity-50 hover:bg-zinc-700 cursor-pointer"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Ingresando..." : "Iniciar sesión"}
                </button>
            </form>
            <title>Iniciar Sesión - Uniqmarket</title>
        </div>
    );
}