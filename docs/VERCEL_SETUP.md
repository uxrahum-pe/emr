# Vercel 개발 환경 설정 가이드

## 🚀 빠른 시작

### 1. Vercel Postgres 설정

1. Vercel Dashboard 접속
2. 프로젝트 선택 > Storage 탭
3. "Create Database" > "Postgres" 선택
4. 데이터베이스 생성 후 `.env.local`에 자동 추가됨

```bash
# .env.local (자동 생성됨)
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
```

### 2. Supabase 사용 (대안)

Supabase는 PostgreSQL 기반이며 무료 티어가 넉넉합니다.

1. [Supabase](https://supabase.com) 가입
2. 새 프로젝트 생성
3. Settings > Database > Connection string 복사

```bash
# .env.local
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
```

### 3. MongoDB Atlas 설정

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 가입
2. 무료 클러스터 생성 (M0)
3. Database Access에서 사용자 생성
4. Network Access에서 IP 허용 (0.0.0.0/0 또는 Vercel IP)
5. Connect > Connect your application > Connection string 복사

```bash
# .env.local
MONGODB_URL="mongodb+srv://[USERNAME]:[PASSWORD]@cluster.mongodb.net/?retryWrites=true&w=majority"
```

### 4. Vercel 환경 변수 설정

Vercel Dashboard > Settings > Environment Variables:

```bash
DATABASE_URL=postgresql://...
MONGODB_URL=mongodb+srv://...
NODE_ENV=development
```

### 5. Prisma 마이그레이션

```bash
# Prisma 클라이언트 생성
npx prisma generate

# 마이그레이션 실행
npx prisma migrate dev --name init

# Prisma Studio 실행 (데이터 확인)
npx prisma studio
```

---

## 🔧 로컬 개발 환경

### .env.local 예시

```bash
# PostgreSQL (Vercel Postgres 또는 Supabase)
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"

# MongoDB Atlas
MONGODB_URL="mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true&w=majority"

# 환경
NODE_ENV="development"
```

### 개발 서버 실행

```bash
npm run dev
```

---

## 📊 데이터베이스 확인

### Prisma Studio

```bash
npx prisma studio
```

브라우저에서 `http://localhost:5555` 접속하여 데이터 확인

### MongoDB Compass

1. [MongoDB Compass](https://www.mongodb.com/products/compass) 다운로드
2. Connection string 입력하여 연결

---

## ⚠️ 주의사항

1. **환경 변수 보안**
   - `.env.local`은 Git에 커밋하지 않음
   - Vercel 환경 변수는 Dashboard에서 관리

2. **무료 티어 제한**
   - Vercel Postgres: 256MB 저장공간
   - Supabase: 500MB 저장공간
   - MongoDB Atlas: 512MB 저장공간

3. **연결 풀링**
   - Vercel Postgres는 자동으로 연결 풀링 제공
   - `POSTGRES_PRISMA_URL` 사용 권장

---

## 🔄 프로덕션(NCP) 전환 시

프로덕션 환경으로 전환할 때:

1. NCP Cloud DB for PostgreSQL 생성
2. NCP MongoDB 또는 Object Storage 설정
3. Vercel 환경 변수에서 프로덕션 URL로 변경
4. Prisma 마이그레이션 실행

```bash
# 프로덕션 마이그레이션
npx prisma migrate deploy
```
