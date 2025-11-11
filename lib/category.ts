import axiosInstance from "@/lib/axios";
import { endpoints } from "@/lib/endpoints";
import { APIResponse } from "@/types/auth";
import { Category } from "@/types/category";

export const getCategoryTree = async (): Promise<APIResponse<Category[]>> => {
  const response = await axiosInstance.get(endpoints.category.getAll);
  return response.data;
};
