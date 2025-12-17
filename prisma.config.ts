import { defineConfig, env } from "prisma/config";

// 로컬 개발 환경에서 .env 파일 로드 (Vercel에서는 자동으로 환경 변수 주입)
try {
  require("dotenv/config");
} catch {
  // dotenv가 설치되지 않은 경우 무시 (Vercel 환경)
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
