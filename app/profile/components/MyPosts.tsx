import { Heading, Skeleton } from "@digdir/designsystemet-react";

const MyPosts = () => {
  return (
    <>
      <Heading level={2} data-size="lg" className="text-2xl font-bold mb-4">
        My Posts
      </Heading>
      <div className="grid grid-cols-[1fr_150px_150px]">
        <p>Title of post:</p>
        <p>| Comments:</p>
        <p>| Votes:</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} variant="rectangle" width="100%" height={100}></Skeleton>
        ))}
      </div>
    </>
  );
};

export default MyPosts;
