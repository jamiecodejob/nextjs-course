import { MongoClient } from "mongodb"; 


// MongoClient 是 MongoDB 官方 Node.js 驅動程式（driver） 提供的一個類別。
// 它的工作是：
// 建立、管理、重用、關閉與 MongoDB 資料庫的連線。

// MongoClient 是「連線池管理員」
// 這也是為什麼在初始化時會看到
// const options = { maxPoolSize: 10};
// 代表最多維持 10 條活躍連線給 app 使用

const uri = process.env.MONGODB_URI!;
const options = { maxPoolSize: 10};

let client: MongoClient;
// client 這個變數的型別是 MongoClient
let clientPromise: Promise<MongoClient>;
// clientPromise 是一個「會 resolve 成 MongoClient 的 Promise
// clientPromise 是等待連線完成的 Promise。
// Promise<MongoClient> 就是「非同步地取得 MongoClient」的意思

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

// 在 Next.js 中，每個 API Route 都可能被重複呼叫、重載，
// 如果你在每次請求中都 new MongoClient() → MongoDB 會被打爆 💥
// 這樣做的目的是：
// ✅ 整個專案只建立一次 MongoClient 連線，之後都重用。
if(!global._mongoClientPromise){
    client = new MongoClient(uri, options); // 建立客戶端物件
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;
// 問題	                                               | 解法
// Next.js 開發時會 hot reload，導致每次都重新執行這個檔案	| 用全域變數保存第一次建立的連線
// 多次 import 這個檔案會多次 new MongoClient()          |改成重用 global._mongoClientPromise
// 要讓所有檔案共用同一個連線	                          | 匯出 clientPromise 供整個 app 使用

export default clientPromise;

