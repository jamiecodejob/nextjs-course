import { BUSINESS_STATUS_CODE } from "@/config/constants";

export function success<T>(
  data: T,
  message = "Success",
  status = BUSINESS_STATUS_CODE.SUCCESS,
) {
  return { status, message, data };
}

// <T> 是 TypeScript 的泛型宣告。
// 它代表「這個函式可以接受任何型別的資料」，
// 但在呼叫時會自動推斷或指定這個型別。

export function error(
  message = "Internal Server Error",
  status = BUSINESS_STATUS_CODE.ERROR,
  data: any = null,
) {
  return { status, message, data };
}

// data: any = null,
// 定義一個函式 success，
// 它有一個參數 data，型別是任意 (any)，
// 預設值是 null。
// 如果呼叫時沒有傳 data，那就自動用 null。