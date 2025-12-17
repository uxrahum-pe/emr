# 데이터베이스 전략 가이드

## 🎯 환경 구성

- **개발**: GitHub + Vercel
- **프로덕션**: NCP (Naver Cloud Platform) + MSSQL/MySQL + NoSQL

## 📊 추천 DB 조합

### 1순위: **PostgreSQL + MongoDB**

#### SQL: PostgreSQL
**이유:**
- ✅ **Prisma 최적화**: PostgreSQL은 Prisma의 가장 잘 지원되는 DB
- ✅ **Vercel 호환성**: Vercel Postgres, Supabase, Neon 등 무료/저렴한 옵션 많음
- ✅ **NCP 지원**: NCP에서 PostgreSQL 서비스 제공
- ✅ **GraphQL 최적화**: 복잡한 쿼리와 관계형 데이터 처리 우수
- ✅ **JSON 지원**: NoSQL처럼 JSON 컬럼 사용 가능 (하이브리드 접근)
- ✅ **성능**: 대용량 데이터 처리에 우수

**Vercel 개발 환경:**
```bash
# Vercel Postgres (무료 티어)
# 또는 Supabase (PostgreSQL 기반, 무료 티어)
# 또는 Neon (서버리스 PostgreSQL, 무료 티어)
```

**NCP 프로덕션:**
- NCP Cloud DB for PostgreSQL 사용
- 또는 NCP에서 직접 PostgreSQL 서버 구축

#### NoSQL: MongoDB
**이유:**
- ✅ **Prisma 지원**: Prisma MongoDB 지원 (Prisma 2.30+)
- ✅ **GraphQL 통합**: MongoDB + GraphQL 조합이 잘 맞음
- ✅ **유연한 스키마**: 로그, 이벤트, 실시간 데이터에 적합
- ✅ **NCP 지원**: NCP Object Storage 또는 MongoDB Atlas 연동 가능
- ✅ **TanStack Query 최적화**: 문서 기반 구조로 캐싱 효율적

**사용 케이스:**
- 방문일지 로그 (대량 데이터)
- 실시간 이벤트
- 사용자 세션 데이터
- 캐시 데이터

---

### 2순위: **MySQL + Redis + MongoDB**

#### SQL: MySQL
**이유:**
- ✅ **NCP 친화적**: NCP에서 MySQL이 가장 많이 사용됨
- ✅ **Prisma 지원**: 완벽 지원
- ✅ **비용**: NCP에서 MySQL이 PostgreSQL보다 저렴한 경우 많음
- ⚠️ **Vercel**: Vercel에서 직접 MySQL 지원은 제한적 (PlanetScale, Railway 등 서비스 필요)

**Vercel 개발 환경:**
```bash
# PlanetScale (MySQL 호환, 무료 티어)
# 또는 Railway (MySQL 지원)
# 또는 Supabase (PostgreSQL 권장)
```

#### NoSQL: Redis + MongoDB
- **Redis**: 캐싱, 세션 저장 (TanStack Query 캐시 백엔드로 활용)
- **MongoDB**: 문서 저장

---

## 🔧 Prisma 설정 전략

### 개발/프로덕션 환경 분리

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql" // 또는 "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["jsonProtocol"]
}
```

### 환경 변수 관리

```bash
# .env.development (Vercel)
DATABASE_URL="postgresql://user:pass@host:5432/emr_dev?schema=public"
MONGODB_URL="mongodb+srv://user:pass@cluster.mongodb.net/emr_dev"

# .env.production (NCP)
DATABASE_URL="postgresql://user:pass@ncp-db-host:5432/emr_prod?schema=public"
MONGODB_URL="mongodb://ncp-mongo-host:27017/emr_prod"
```

---

## 🚀 GraphQL 최적화

### PostgreSQL + GraphQL
```typescript
// graphql/resolvers.ts
import { prisma } from '@/lib/prisma'

export const resolvers = {
  Query: {
    visitLogs: async (_, { patientId }) => {
      // Prisma가 자동으로 최적화된 쿼리 생성
      return await prisma.visitLog.findMany({
        where: { patientId },
        include: { entries: true }, // 관계 자동 로드
        orderBy: { visitDate: 'desc' }
      })
    }
  }
}
```

**장점:**
- Prisma가 N+1 문제 자동 해결
- GraphQL 필드 선택에 따라 필요한 데이터만 로드
- 복잡한 관계형 쿼리 최적화

### MongoDB + GraphQL
```typescript
// MongoDB는 유연한 스키마로 실시간 데이터에 적합
export const resolvers = {
  Query: {
    realtimeEvents: async (_, { patientId }) => {
      // MongoDB에서 실시간 이벤트 조회
      return await mongoClient
        .db('emr')
        .collection('events')
        .find({ patientId })
        .toArray()
    }
  }
}
```

---

## ⚡ TanStack Query 최적화

### PostgreSQL (SQL) - 관계형 데이터
```typescript
// hooks/useVisitLogs.ts
import { useQuery } from '@tanstack/react-query'
import { getVisitLogs } from '@/lib/api-helpers'

export function useVisitLogs(patientId: string) {
  return useQuery({
    queryKey: ['visitLogs', patientId],
    queryFn: () => getVisitLogs(patientId),
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
    // PostgreSQL은 관계형 데이터라 캐싱 전략이 명확
  })
}
```

### MongoDB (NoSQL) - 문서 데이터
```typescript
// hooks/useRealtimeEvents.ts
export function useRealtimeEvents(patientId: string) {
  return useQuery({
    queryKey: ['events', patientId],
    queryFn: () => getRealtimeEvents(patientId),
    staleTime: 0, // 실시간 데이터는 즉시 만료
    refetchInterval: 5000, // 5초마다 갱신
    // MongoDB는 실시간 데이터에 적합
  })
}
```

### Redis 캐싱 레이어
```typescript
// lib/cache.ts
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 300
): Promise<T> {
  const cached = await redis.get(key)
  if (cached) {
    return JSON.parse(cached)
  }
  
  const data = await fetcher()
  await redis.setex(key, ttl, JSON.stringify(data))
  return data
}
```

---

## 📋 실제 구현 전략

### 1. 개발 환경 (Vercel)

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'
import { MongoClient } from 'mongodb'

// PostgreSQL (Prisma)
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Vercel Postgres 또는 Supabase
    },
  },
})

// MongoDB
const mongoClient = new MongoClient(process.env.MONGODB_URL!)
export const mongoDb = mongoClient.db('emr_dev')
```

**Vercel 환경 변수:**
```bash
# Vercel Dashboard > Settings > Environment Variables
DATABASE_URL=postgresql://... # Vercel Postgres
MONGODB_URL=mongodb+srv://... # MongoDB Atlas (무료)
```

### 2. 프로덕션 환경 (NCP)

```typescript
// lib/db.production.ts
// NCP PostgreSQL 연결
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NCP_DATABASE_URL, // NCP Cloud DB for PostgreSQL
    },
  },
})

// NCP MongoDB 또는 Object Storage
export const mongoDb = new MongoClient(process.env.NCP_MONGODB_URL!)
```

**NCP 설정:**
- Cloud DB for PostgreSQL 생성
- Object Storage 또는 MongoDB 서버 구축
- 환경 변수 설정

---

## 🎯 최종 추천

### **PostgreSQL + MongoDB 조합**

**이유:**
1. **개발 환경 (Vercel)**
   - Vercel Postgres 또는 Supabase (무료)
   - MongoDB Atlas (무료 티어)

2. **프로덕션 환경 (NCP)**
   - NCP Cloud DB for PostgreSQL
   - NCP Object Storage 또는 MongoDB

3. **기술 스택 호환성**
   - ✅ Prisma: PostgreSQL 최적화
   - ✅ GraphQL: 복잡한 관계형 쿼리 처리
   - ✅ TanStack Query: SQL은 관계형 캐싱, NoSQL은 실시간 데이터

4. **마이그레이션 용이성**
   - 개발 → 프로덕션 환경 전환 시 스키마 동일
   - Prisma 마이그레이션으로 DB 구조 관리

---

## 📝 구현 체크리스트

### 1단계: 개발 환경 설정
- [ ] Vercel Postgres 또는 Supabase 설정
- [ ] MongoDB Atlas 계정 생성
- [ ] Prisma 스키마 작성
- [ ] 환경 변수 설정

### 2단계: 프로덕션 환경 준비
- [ ] NCP Cloud DB for PostgreSQL 생성
- [ ] NCP MongoDB 또는 Object Storage 설정
- [ ] 환경 변수 분리 (개발/프로덕션)

### 3단계: 코드 최적화
- [ ] Prisma 클라이언트 최적화
- [ ] GraphQL Resolver 최적화
- [ ] TanStack Query 캐싱 전략
- [ ] Redis 캐싱 레이어 (선택)

---

## 🔗 참고 링크

- [Prisma Supported Databases](https://www.prisma.io/docs/concepts/database-connectors)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [NCP Cloud DB](https://www.ncloud.com/product/database/clouddb)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [TanStack Query Best Practices](https://tanstack.com/query/latest/docs/react/guides/caching)
