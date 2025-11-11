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
  {
    id: 3,
    title: "Post 3",
    content: "This is the content of post 3",
    author: {
      id: 2,
      username: "user",
    },
    subcategory: {
      id: 2,
      name: "Subcategory 2",
    },
  },
];

export async function GET() {
  const sortedPosts = posts.sort((a, b) => b.id - a.id);
  return NextResponse.json(sortedPosts);
}
