import { Category, Subcategory } from "./category";
import { User } from "./user";

export type Post = {
  id: number;
  title: string;
  content: string;
  author: User;
  subcategory: Subcategory;
};
