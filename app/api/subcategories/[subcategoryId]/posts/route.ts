import { NextResponse } from "next/server";

const posts = [
  {
    id: 1,
    title: "Post 1",
    content: "This is the content of post 1",
    author: {
      id: 1,
      username: "admin",
    },
    subcategory: {
      id: 1,
      name: "Subcategory 1",
    },
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is the content of post 2",
    author: {
      id: 1,
      username: "admin",
    },
    subcategory: {
      id: 1,
      name: "Subcategory 1",
    },
  },
];

export async function GET(
  request: Request,
  { params }: { params: { subcategoryId: string } }
) {
  const subcategoryId = parseInt(params.subcategoryId);

  if (isNaN(subcategoryId)) {
    return NextResponse.json(
      { error: "Invalid subcategory ID" },
      { status: 400 }
    );
  }

  const filteredPosts = posts.filter(
    (post) => post.subcategory.id === subcategoryId
  );

  if (filteredPosts.length === 0) {
    return NextResponse.json({ error: "No posts found" }, { status: 404 });
  }

  return NextResponse.json(filteredPosts);
}
