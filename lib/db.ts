/**
 * 데이터베이스 연결 설정
 * 개발 환경(Vercel)과 프로덕션 환경(NCP)을 자동으로 구분
 *
 * 현재는 PostgreSQL 단일 DB 사용 (MongoDB는 선택사항)
 * PostgreSQL의 JSON 컬럼으로 유연한 데이터 처리 가능
 */

import { PrismaClient } from "@prisma/client";
// MongoDB는 선택사항 - 필요시 주석 해제
// import { MongoClient, Db } from "mongodb";

// ============================================
// Prisma (PostgreSQL/MySQL)
// ============================================

/**
 * Prisma 클라이언트 인스턴스
 * 개발: Vercel Postgres / Supabase
 * 프로덕션: NCP Cloud DB for PostgreSQL
 *
 * TODO: DB 연결 준비 후 실제 사용
 */
export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

// Prisma 연결 종료 (앱 종료 시)
if (process.env.NODE_ENV !== "production") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });
}

// ============================================
// MongoDB (NoSQL) - 선택사항
// ============================================

// MongoDB는 현재 선택사항입니다.
// PostgreSQL의 JSON 컬럼으로 대부분의 유연한 데이터 처리가 가능합니다.
// 대용량 로그나 실시간 이벤트 스트리밍이 필요할 때만 고려하세요.

// let mongoClient: MongoClient | null = null;
// let mongoDb: Db | null = null;

// /**
//  * MongoDB 클라이언트 초기화
//  * 개발: MongoDB Atlas
//  * 프로덕션: NCP MongoDB 또는 Object Storage
//  */
// export async function getMongoDb(): Promise<Db> {
//   if (mongoDb) {
//     return mongoDb;
//   }

//   if (!process.env.MONGODB_URL) {
//     throw new Error("MONGODB_URL 환경 변수가 설정되지 않았습니다.");
//   }

//   mongoClient = new MongoClient(process.env.MONGODB_URL);
//   await mongoClient.connect();

//   const dbName = process.env.NODE_ENV === "production" ? "emr_prod" : "emr_dev";

//   mongoDb = mongoClient.db(dbName);
//   return mongoDb;
// }

// /**
//  * MongoDB 연결 종료
//  */
// export async function closeMongoConnection(): Promise<void> {
//   if (mongoClient) {
//     await mongoClient.close();
//     mongoClient = null;
//     mongoDb = null;
//   }
// }

// ============================================
// 환경별 설정 확인
// ============================================

/**
 * 현재 환경 정보 출력 (개발용)
 */
export function getDbInfo() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const dbUrl = process.env.DATABASE_URL;
  // const mongoUrl = process.env.MONGODB_URL; // MongoDB는 선택사항

  return {
    environment: isDevelopment ? "development (Vercel)" : "production (NCP)",
    database: {
      provider: dbUrl?.includes("postgresql") ? "PostgreSQL" : "MySQL",
      connected: !!dbUrl,
      // MongoDB는 선택사항 - 필요시 주석 해제
      // nosql: {
      //   provider: "MongoDB",
      //   connected: !!mongoUrl,
      // },
    },
    note: "PostgreSQL의 JSON 컬럼으로 유연한 데이터 처리 가능",
  };
}
