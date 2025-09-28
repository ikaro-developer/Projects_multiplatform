import { useEffect, useState } from "react";
import api from "@/services/api";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    api.get("/items").then((res) => setItems(res.data));
  }, []);

  function toggleItem(id: number) {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  return { items, selectedItems, toggleItem };
};

export default useItems;
