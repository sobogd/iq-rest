"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CategoryForm } from "../category-form";

interface Category {
  id: string;
  name: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface CategoryEditClientProps {
  translations: {
    name: string;
    namePlaceholder: string;
    description_label: string;
    descriptionPlaceholder: string;
    isActive: string;
    save: string;
    saving: string;
    cancel: string;
    notFound: string;
  };
}

export function CategoryEditClient({ translations: t }: CategoryEditClientProps) {
  const params = useParams();
  const id = params.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(`/api/categories/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCategory(data);
        } else if (res.status === 404) {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch category:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (notFound || !category) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t.notFound}</p>
      </div>
    );
  }

  return <CategoryForm category={category} translations={t} />;
}
