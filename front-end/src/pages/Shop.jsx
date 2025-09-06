import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useFilters } from "../hooks/useFilters";
import { useLoad } from "../hooks/useLoad";
import { Paginacion } from "../components/Paginacion";
import { FilterMarca } from "../components/FilterMarca";
import { FilterPrecio } from "../components/FilterPrecio";
import { Sort } from "../components/Sort";
import { Spinner } from "../components/Spinner";
import { SkeletonShop } from "./skeletons/SkeletonShop";


export default function Shop() {
    const { name } = useParams();
    const { loading } = useLoad()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const categoryTitles = {
            accesorios: "Accesorios",
            alimentos: "Alimentos",
            colección: "Colección",
            hogar: "Hogar",
            literatura: "Literatura",
            mascotas: "Mascotas",
            misceláneo: "Misceláneo",
            moda: "Moda",
            música: "Música",
            tecnología: "Tecnología"
        };

        const title = categoryTitles[name];
        if (title) {
            document.title = `${title} - Uniqmarket`;
        } else {
            document.title = `Tienda - Uniqmarket`;
        }
    }, [name, loading]);

    const {
        paginatedProducts,
        totalPages,
        currentPage,
        setCurrentPage,
        allBrands,
        resetFilters,
        sortProducts,
        isLoading
    } = useFilters(name);

    const [openMenu, setOpenMenu] = useState({});

    if (loading) {
        return <SkeletonShop />;
    }

    const handlePageChange = (page) => {
        setSearchParams({ page });
        setCurrentPage(page);
    };

    const handleOpenMenu = (menuName) => {
        setOpenMenu((prevState) => ({
            ...prevState,
            [menuName]: !prevState[menuName]
        }));
    };

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-[290px_auto] gap-6">
                <div>
                    <div className="flex flex-col items-center text-center rounded-md shadow-md p-5 bg-white">
                        <h2 className="font-bold text-2xl border-b-2 border-gray-300 w-full pb-4 mb-3">Filtros</h2>
                        <div className="w-full border-b-1 border-gray-300 pb-3 mb-3">
                            <button
                                className="bg-zinc-400 text-white text-xl p-2 w-full rounded-md"
                                onClick={() => handleOpenMenu("marca")}
                            >
                                Marca
                            </button>
                            {openMenu["marca"] && <FilterMarca allBrands={allBrands} />}
                        </div>
                        <div className="w-full border-b-1 border-gray-300 pb-3">
                            <button
                                className="bg-zinc-400 text-white text-xl p-2 w-full rounded-md"
                                onClick={() => handleOpenMenu("precio")}
                            >
                                Precio
                            </button>
                            {openMenu["precio"] && <FilterPrecio />}
                        </div>
                        <div className="flex flex-col w-full mt-4 gap-4">
                            <button className="bg-zinc-400 text-white text-xl p-2 w-full rounded-md" onClick={resetFilters} >
                                Reiniciar Filtros
                            </button>
                        </div>
                    </div>
                </div>

                <main className="flex flex-col rounded-md shadow-md p-2 bg-white">
                    <div className="flex bg-gray-200 w-full items-center justify-end h-[40px] rounded-md">
                        <Sort onSortChange={sortProducts} />
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col justify-center items-center h-64 gap-3">
                            <span className="text-2xl font-bold text-gray-500 animate-pulse">Cargando productos...</span>
                            <Spinner />
                        </div>
                    ) : paginatedProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <h2 className="text-2xl font-semibold">No se encontraron productos.</h2>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-7 justify-center mt-2 py-2">
                            {paginatedProducts.map((prod) => (
                                <Link key={prod.product_id} to={`/product/${prod.product_id}`} className="cursor-pointer">
                                    <div className="flex flex-col w-full max-w-[250px] h-full max-h-[450px] border border-gray-300 shadow-md rounded-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden">
                                        <img
                                            src={prod.image_url}
                                            alt={`Imagen de ${prod.name}`}
                                            className="w-52 h-52 object-cover mx-auto"
                                        />
                                        <div className="flex flex-col justify-between p-3 w-full max-w-[208px] h-full">
                                            <div className="flex flex-col">
                                                {prod.stock === 0 && (
                                                    <span className="bg-red-600 p-1 text-white rounded-md font-semibold">
                                                        Producto Agotado
                                                    </span>
                                                )}
                                                <span className="text-gray-500">{prod.brand}</span>
                                                <h2 className="h-[90px] text-ellipsis line-clamp-5 font-bold">
                                                    {prod.name}
                                                </h2>
                                            </div>

                                            {/* Precio siempre abajo */}
                                            <span className="font-semibold text-lg mt-2">${prod.price}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <Paginacion
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={handlePageChange}
                    />
                </main>
            </div>
        </div>
    );
}