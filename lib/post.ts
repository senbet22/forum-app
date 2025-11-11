import { Post } from "@/types/post";
import axios from "axios";

export const getPostsBySubcategory = async (
  subcategoryId: number
): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>(
      `/api/subcategories/${subcategoryId}/posts`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    console.error("Failed to fetch posts for subcategory:", error);
    throw error;
  }
};

export const getLatestPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>("/api/posts/latest");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch latest posts:", error);
    throw error;
  }
};