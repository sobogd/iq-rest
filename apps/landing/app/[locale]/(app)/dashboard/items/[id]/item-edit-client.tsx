"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ItemForm } from "../item-form";

interface Item {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  categoryId: string;
}

interface ItemEditClientProps {
  translations: {
    name: string;
    namePlaceholder: string;
    description_label: string;
    descriptionPlaceholder: string;
    price: string;
    pricePlaceholder: string;
    category: string;
    categoryPlaceholder: string;
    image: string;
    uploadImage: string;
    removeImage: string;
    isActive: string;
    save: string;
    saving: string;
    cancel: string;
    error: string;
    close: string;
    notFound: string;
  };
}

export function ItemEditClient({ translations: t }: ItemEditClientProps) {
  const params = useParams();
  const id = params.id as string;

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`/api/items/${id}`);
        if (res.ok) {
          const data = await res.json();
          setItem(data);
        } else if (res.status === 404) {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch item:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t.notFound}</p>
      </div>
    );
  }

  return <ItemForm item={item} translations={t} />;
}
