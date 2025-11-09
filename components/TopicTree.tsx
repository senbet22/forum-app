import { Details } from "@digdir/designsystemet-react";
import Link from "next/link";
import { TopicNode } from "@/lib/topic";
import { ArrowRight } from "lucide-react";

interface TopicTreeProps {
  topics: TopicNode[];
}

export function TopicTree({ topics }: TopicTreeProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {topics.map((topic) => (
        <Details key={topic.id} data-variant="tinted" data-size="md" className="rounded-lg mb-4 shadow-md">
          <Details.Summary className="rounded-lg">{topic.name}</Details.Summary>
          <Details.Content className="">
            {(topic.children?.length ?? 0) > 0 ? (
              <ul className="bg-transparent">
                {topic.children?.map((child) => (
                  <li
                    key={child.id}
                    className={`
              group cursor-pointer p-3 border-b border-b-gray-300
              odd:bg-white odd:hover:bg-gray-100 even:hover:bg-[#C8DCEF]
               flex justify-between items-center transition-colors
            `}
                  >
                    <Link href={`/topics/${child.id}`} className="text-gray-800">
                      {child.name}
                    </Link>
                    <ArrowRight
                      size={28}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-600"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No under categories</p>
            )}
          </Details.Content>
        </Details>
      ))}
    </div>
  );
}
