import CommentBtn from "@/modules/home/comment-btn";
import Pagination from "@/modules/home/pagination";
import Image from "next/image";
import PostList from "./post-list";

const Content = () => {
  return (
    <>
      <Image
        src="/images/coffee-shop.jpg"
        className="w-full rounded-lg border border-white/10"
        width={1584}
        height={396}
        alt="coffee-shop"
      />
      <h1 className="text-2xl font-bold mt-2">coffee shop</h1>
      <p className="text-sm text-[#000] mt-2">
        有時候，一間咖啡廳就是一段生活的縮影。你有沒有哪家店，是你走進去就會覺得安心、想一去再去的？願意和我分享嗎？
      </p>
      <div className="w-full mt-8">
        <CommentBtn />
      </div>
      <PostList />
    </>
  );
};

export default Content;
