"use client";
import { PostCard } from "@/components/PostCard";
import { useEffect, useState } from "react";
import { getCategoryTree } from "@/lib/category";
import { getLatestPosts, getPostsBySubcategory } from "@/lib/post";
import { CategoryTree } from "@/components/CategoryTree";
import { Category } from "@/types/category";
import { Post } from "@/types/post";
import { Heading, Skeleton } from "@digdir/designsystemet-react";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorPosts, setIsErrorPosts] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await getCategoryTree();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch category tree:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLatestPosts = async () => {
      try {
        setIsLoadingPosts(true);
        setIsErrorPosts(false);

        const response = await getLatestPosts();
        setPosts(response);
      } catch (error) {
        console.error("Failed to fetch latest posts:", error);
        setIsErrorPosts(true);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchCategories();
    fetchLatestPosts();
  }, []);

  const handleSubcategoryClick = async (subcategoryId: number) => {
    try {
      setIsLoadingPosts(true);
      setIsErrorPosts(false);

      const response = await getPostsBySubcategory(subcategoryId);
      setPosts(response);
    } catch (error) {
      console.error("Failed to fetch posts for subcategory:", error);
      setIsErrorPosts(true);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <Skeleton height={63} width="50%" className="mb-8" />
        <Skeleton height={56} width="100%" className="shadow-md" />
        <Skeleton height={56} width="100%" className="shadow-md" />
        <Skeleton height={56} width="100%" className="shadow-md" />
        <Skeleton height={56} width="100%" className="shadow-md" />
        <Skeleton height={56} width="100%" className="shadow-md" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full">
        <Heading level={1} data-size="xl">
          Felles forum
        </Heading>
        <p>Could not retrieve forum. Please check again later!</p>
      </div>
    );
  }

  return (
    <div className="flex gap-6 my-15 min-h-screen">
      {/* Left Sidebar - Fixed */}
      <aside className="w-64 fixed left-0 my-15 top-16 bottom-0 overflow-y-auto px-4">
        <Heading level={3} data-size="sm" className="mb-4">
          Categories
        </Heading>
        {categories.length > 0 ? (
          <CategoryTree
            categories={categories}
            onSubcategoryClick={handleSubcategoryClick}
          />
        ) : (
          <p className="text-sm">Ingen kategorier tilgjengelig.</p>
        )}
      </aside>

      {/* Main Content - With left margin to account for fixed sidebar */}
      <div className="flex-1 ml-64 px-6 max-w-6xl mx-auto">
        <section>
          <Heading level={2} data-size="md" className="mb-4">
            Feed
          </Heading>
          {isLoadingPosts ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton width="100%" height={120} key={index} />
              ))}
            </div>
          ) : isErrorPosts ? (
            <p>Could not retrieve posts. Please check again later!</p>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p>No posts made yet.</p>
          )}
          ...
        </section>
      </div>
    </div>
  );
}
