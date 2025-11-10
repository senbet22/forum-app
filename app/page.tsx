"use client";

import { useEffect, useState } from "react";
import { getTopicTree } from "@/lib/topic";
import { TopicTree } from "@/components/TopicTree";
import { TopicNode } from "@/lib/topic";
import { Heading, Skeleton } from "@digdir/designsystemet-react";

export default function HomePage() {
  const [topics, setTopics] = useState<TopicNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await getTopicTree();
        setTopics(response.data);
      } catch (error) {
        console.error("Failed to fetch topic tree:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

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
    <div className="flex gap-6 min-h-screen">
      {/* Left Sidebar - Fixed */}
      <aside className="w-64 fixed left-0 top-16 bottom-0 overflow-y-auto p-4">
        <Heading level={3} data-size="sm" className="mb-4">
          Categories
        </Heading>
        {topics.length > 0 ? (
          <TopicTree topics={topics} />
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
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton width="100%" height={120} key={index}>
                Element {index + 1}
              </Skeleton>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
