import { useEffect, useState } from "react";

export function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setItemsPerPage(4);      
      } else if (width < 1024) {
        setItemsPerPage(6);      
      } else if (width < 1536) {
        setItemsPerPage(8);      
      } else {
        setItemsPerPage(10);     
      }                
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  return itemsPerPage;
}