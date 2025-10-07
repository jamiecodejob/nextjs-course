"use client";

import Post from "@/components/post";
import { useParams, useRouter } from "next/navigation";
import useQueryPost from "@/hooks/use-query-post";

const Content = () => {
  const router = useRouter();
  const { id } = useParams();

  // TODO DEL
  console.log(id);

  const { data } = useQueryPost();

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="text-sm text-[#000] font-bold cursor-pointer"
      >
        {"← Back"}
      </button>
      <Post post={data} />
    </div>
  );
};

export default Content;
