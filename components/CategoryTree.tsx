"use client";

import { Category } from "@/types/category";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type CategoryTreeProps = {
  categories: Category[];
  onSubcategoryClick: (subcategoryId: number) => void;
};

export const CategoryTree = ({
  categories,
  onSubcategoryClick,
}: CategoryTreeProps) => {
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  const toggleCategory = (id: number) => {
    if (openCategories.includes(id)) {
      setOpenCategories(openCategories.filter((catId) => catId !== id));
    } else {
      setOpenCategories([...openCategories, id]);
    }
  };

  return (
    <div className="w-full ">
      {categories.map((category) => (
        <div key={category.id} className="mb-2">
          <div
            className="flex items-center justify-between p-2  cursor-pointer"
            onClick={() => toggleCategory(category.id)}
          >
            <h2 className="text-lg font-semibold">{category.name}</h2>
            <span>
              {openCategories.includes(category.id) ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </span>
          </div>
          {openCategories.includes(category.id) && (
            <div className="pl-4 pt-2">
              {category.children.map((child) => (
                <div
                  key={child.id}
                  className="p-2 border-l-2 border-gray-200 dark:border-gray-700 cursor-pointer"
                  onClick={() => onSubcategoryClick(child.id)}
                >
                  <p>{child.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
