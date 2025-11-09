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
      <div className="w-full max-w-4xl mx-auto space-y-4 my-8">
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
      <>
        <Heading level={1} data-size="xl">
          Felles forum
        </Heading>
        <p>Could not retrieve forum. Please check again later!</p>
      </>
    );
  }

  return (
    <>
      <Heading level={1} data-size="xl">
        Felles forum
      </Heading>
      <div className="grid grid-cols-4 gap-6">
        <aside className="bg-gray-500 rounded-lg h-[50vh] sticky top-10">
          {topics.length > 0 ? <TopicTree topics={topics} /> : <p>Ingen kategorier tilgjengelig.</p>}
        </aside>

        <section className="col-span-3">
          <Heading level={2} data-size="md">
            Feed:
          </Heading>
          <div className="space-y-6">
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton width="100%" height={120} key={index}>
                Element {index + 1}
              </Skeleton>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
