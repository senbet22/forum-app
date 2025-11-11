import { Heading, Skeleton } from "@digdir/designsystemet-react";

const MyPosts = () => {
  return (
    <>
      <Heading level={3} data-size="md" className="text-2xl font-bold mb-4">
        My Posts
      </Heading>

      {/* Make use of ul and li to form semantic list using loop or map */}
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
      <div>Paginering senere</div>
    </>
  );
};

export default MyPosts;
