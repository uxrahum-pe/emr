import { defineConfig } from "prisma/config";

// 로컬 개발 환경에서 .env 파일 로드 (Vercel에서는 자동으로 환경 변수 주입)
try {
  require("dotenv/config");
} catch {
  // dotenv가 설치되지 않은 경우 무시 (Vercel 환경)
}

// 빌드 시점에는 환경 변수가 없을 수 있으므로 더미 URL 제공
// 실제 런타임에서는 PrismaClient 생성 시 환경 변수를 사용
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://user:password@localhost:5432/dbname?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
});
