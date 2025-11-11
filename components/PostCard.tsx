import { Post } from "@/types/post";
import {
  Avatar,
  Card,
  Heading,
  Paragraph,
} from "@digdir/designsystemet-react";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card>
      <Card.Block>
        <div className="flex items-center">
          <Avatar aria-label={post.author.username}>
            {post.author.username.charAt(0)}
          </Avatar>
          <div className="ml-4">
            <Heading level={3} data-size="sm">
              {post.title}
            </Heading>
            <Paragraph>{post.author.username}</Paragraph>
          </div>
        </div>
      </Card.Block>
      <Card.Block>
        <Paragraph>{post.content}</Paragraph>
      </Card.Block>
    </Card>
  );
};
