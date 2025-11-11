export type Subcategory = {
  id: number;
  name: string;
  parentId: number | null;
  createdAt: string;
  childCount: number;
  postCount: number;
};

export type Category = {
  id: number;
  name: string;
  parentId: number | null;
  createdAt: string;
  childCount: number;
  postCount: number;
  children: Subcategory[];
};
