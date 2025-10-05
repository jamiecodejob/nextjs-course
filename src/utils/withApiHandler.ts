import { NextRequest } from "next/server";
import { error } from "@/utils/apiResponse";
import { BUSINESS_STATUS_CODE } from "@/config/constants";

export function withApiHandler(
  handler: (req: NextRequest) => Promise<Response>,
  //「handler 是一個函式，它接收一個 NextRequest，
  // 然後非同步地回傳一個 Response 物件。」
  defaultStatus = BUSINESS_STATUS_CODE.ERROR,
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (err: any) {
      console.error("API Error:", err);
      // Response.json: 快速建立一個 JSON 格式的 HTTP 回應
      return Response.json(
        error(err.message || "Internal Server Error", defaultStatus),
        { status: defaultStatus },
      );
    }
  };
}
