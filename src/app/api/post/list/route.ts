import { NextRequest } from "Next/Server";
import { withApiHandler } from "@/utils/withApiHandler";
import { error, success } from "@/utils/apiResponse";
import clientPromise from "@/lib/mongodb";
import { DB_NAME } from "@/config/constants";

export const GET = withApiHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const skip = (Number(page) - 1) * Number(limit);

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection("posts");
  const total = await collection.countDocuments();
  const posts = await collection
    .find({}) // find({}) 是查詢（query）指令： {} → 查全部（沒有條件）
    .skip(skip) // skip() 表示要略過前面多少筆資料。
    .limit(Number(limit)) // 表示最多取幾筆資料。
    .sort({ createdAt: -1 }) // 表示排序方式 -1 是新到舊
    .toArray(); //find() 回傳的是游標（Cursor），它像一個查詢結果的串流（stream）。    .toArray() 會把結果全部「收集」成一個陣列：

  return Response.json(
    success({
      posts,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    }),
    {
      status: 200,
    },
  );
});
