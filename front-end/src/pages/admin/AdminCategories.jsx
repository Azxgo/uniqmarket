import { useEffect, useState } from "react";
import { useAdminTitle } from "../../context/admin/AdminTitleContext";
import useCategories from "../../hooks/admin/useCategories";
import { categoryIcons } from "../../utils/categoryIcons";
import { MisceláneoIcon } from "../../icons/CategoryIcons";
import CategoryModal from "../../components/admin/CategoryModal";

export default function AdminCategories() {
  const { setTitle } = useAdminTitle();
  const { categories, setCategories } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setTitle("Categorias");
  }, []);

  const handleEditClick = (cat) => {
    setSelectedCategory(cat);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleSave = async (categoryId, newName, deletedId = null) => {
    if (deletedId) {
      // 🔹 Eliminar categoría del estado
      setCategories((prev) => prev.filter((c) => c.category_id !== deletedId));
      return;
    }

    if (categoryId) {
      // 🔹 Editar categoría (PUT)
      const res = await fetch(`http://localhost:3000/admin/category/update/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (res.ok) {
        setCategories((prev) =>
          prev.map((c) => (c.category_id === categoryId ? { ...c, category_name: newName } : c))
        );
      }
    } else {
      // 🔹 Crear categoría (POST)
      const res = await fetch(`http://localhost:3000/admin/category/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (res.ok) {
        const data = await res.json();
        setCategories((prev) => [
          ...prev,
          { category_id: data.category_id, category_name: newName, product_count: 0 },
        ]);
      }
    }
  };

  return (
    <div className="flex flex-wrap bg-white justify-center items-center gap-6 py-4 rounded-md">
      {categories.map((cat, i) => {
        const IconComponent = categoryIcons[cat.category_name] || MisceláneoIcon;

        return (
          <div
            key={i}
            className="flex flex-col rounded-md shadow-md items-center justify-center w-full max-w-[200px] sm:max-w-[350px] p-4"
          >
            <div className="flex items-center justify-center w-22 h-22 bg-gray-300 rounded-full">
              <IconComponent size={60} className="w-28 h-28 text-white" />
            </div>
            <div className="mt-2 font-medium text-center">{cat.category_name}</div>
            <span className="text-sm text-gray-500">{cat.product_count} Productos</span>
            <button
              className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md"
              onClick={() => handleEditClick(cat)}
            >
              Editar
            </button>
          </div>
        );
      })}

      <div
        className="flex flex-col rounded-md shadow-md items-center justify-center p-4 cursor-pointer hover:bg-gray-100"
        onClick={handleAddClick}
      >
        <h1 className="text-2xl">+</h1>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
      />
    </div>
  );
}