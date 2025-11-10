import { Button } from "@digdir/designsystemet-react";
import { TopicNode } from "@/lib/topic";

interface TopicTreeProps {
  topics: TopicNode[];
}

export function TopicTree({ topics }: TopicTreeProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {topics.map((topic) => (
        <Button
          type="button"
          key={topic.id}
          className="w-full mb-2"
          data-color="neutral"
        >
          {topic.name}
        </Button>
      ))}
    </div>
  );
}
