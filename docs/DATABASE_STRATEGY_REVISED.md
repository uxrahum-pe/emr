# 데이터베이스 전략 (재검토)

## 🤔 PostgreSQL + MongoDB가 정말 필요한가?

### 현재 EMR 시스템 분석

**주요 데이터:**
- 환자 정보 (Patient) - 관계형
- 방문일지 (VisitLog) - 관계형
- 방문일지 엔트리 (VisitLogEntry) - 관계형
- 패키지 정보 (Package) - 관계형
- 향후일정 (FutureSchedule) - 관계형

**결론: 대부분 관계형 데이터 → PostgreSQL만으로 충분**

---

## ✅ PostgreSQL 단일 DB 추천

### PostgreSQL만 사용하는 이유

#### 1. **JSON 컬럼 지원 (NoSQL 기능 포함)**
PostgreSQL은 JSON/JSONB 타입을 지원하여 NoSQL처럼 사용 가능:

```prisma
model VisitLog {
  id          String   @id @default(uuid())
  visitDate   DateTime
  patientId   String
  metadata    Json?    // 유연한 데이터 저장 (NoSQL처럼)
  customData  Json?    // 동적 필드 저장
  // ...
}
```

**사용 예시:**
```typescript
// JSON 컬럼에 유연한 데이터 저장
await prisma.visitLog.create({
  data: {
    visitDate: new Date(),
    patientId: 'patient-123',
    metadata: {
      customFields: { /* 동적 필드 */ },
      tags: ['urgent', 'follow-up'],
      notes: '...'
    }
  }
})
```

#### 2. **관계형 데이터 최적화**
- 환자 ↔ 방문일지 ↔ 엔트리 관계
- 복잡한 JOIN 쿼리 최적화
- 트랜잭션 보장 (ACID)

#### 3. **Prisma 최적화**
- PostgreSQL은 Prisma의 가장 잘 지원되는 DB
- 복잡한 관계형 쿼리 자동 최적화
- N+1 문제 자동 해결

#### 4. **GraphQL 최적화**
- 관계형 데이터와 GraphQL이 완벽하게 맞음
- Prisma가 GraphQL Resolver 최적화

#### 5. **TanStack Query 최적화**
- 관계형 데이터는 캐싱 전략이 명확
- 데이터 일관성 보장

---

## 📊 PostgreSQL vs MongoDB 비교

| 항목 | PostgreSQL (단일) | PostgreSQL + MongoDB |
|------|-------------------|---------------------|
| **복잡도** | ✅ 낮음 | ❌ 높음 |
| **비용** | ✅ 저렴 (1개 DB) | ❌ 비쌈 (2개 DB) |
| **관리** | ✅ 간단 | ❌ 복잡 |
| **데이터 일관성** | ✅ 높음 | ⚠️ 낮음 (2개 DB 동기화) |
| **유연한 스키마** | ✅ JSON 컬럼 | ✅ MongoDB |
| **관계형 쿼리** | ✅ 최적화 | ⚠️ PostgreSQL만 |
| **실시간 데이터** | ⚠️ 제한적 | ✅ MongoDB |
| **대용량 로그** | ⚠️ 제한적 | ✅ MongoDB |

---

## 🎯 MongoDB가 필요한 경우

### MongoDB를 추가로 고려해야 하는 경우:

1. **대용량 로그 데이터** (일일 수백만 건)
   - 방문일지 엔트리가 매우 많을 때
   - 하지만 PostgreSQL도 충분히 처리 가능

2. **실시간 이벤트 스트리밍**
   - 실시간 알림, 이벤트 로깅
   - 하지만 WebSocket + PostgreSQL로도 가능

3. **완전히 다른 스키마의 데이터**
   - 문서 기반 데이터 (예: 설문지 응답, 동적 폼)
   - 하지만 PostgreSQL JSON 컬럼으로 해결 가능

---

## 💡 최종 추천: PostgreSQL 단일 DB

### 이유:

1. **현재 EMR 시스템 특성**
   - 대부분 관계형 데이터
   - 복잡한 JOIN 쿼리 필요
   - 데이터 일관성 중요 (의료 데이터)

2. **PostgreSQL의 강점**
   - JSON 컬럼으로 NoSQL 기능 제공
   - 관계형 데이터 최적화
   - Prisma, GraphQL, TanStack Query와 완벽 호환

3. **비용 및 복잡도**
   - 1개 DB 관리로 간단
   - 비용 절감
   - 운영 복잡도 감소

4. **확장성**
   - 나중에 필요하면 MongoDB 추가 가능
   - 하지만 대부분의 경우 PostgreSQL만으로 충분

---

## 🔧 PostgreSQL 단일 DB 구현

### Prisma 스키마 예시

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Patient {
  id           String   @id @default(uuid())
  name         String
  registerDate DateTime @default(now())
  metadata     Json?    // 유연한 데이터 (NoSQL처럼)
  
  visitLogs    VisitLog[]
  packages     Package[]
  schedules    FutureSchedule[]
  
  @@map("patients")
}

model VisitLog {
  id          String   @id @default(uuid())
  visitDate   DateTime
  patientId   String
  hospitalId  String?
  period      String?
  customData  Json?    // 동적 필드 (NoSQL처럼)
  metadata    Json?    // 추가 메타데이터
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  patient     Patient  @relation(fields: [patientId], references: [id])
  entries     VisitLogEntry[]
  
  @@index([patientId, visitDate])
  @@map("visit_logs")
}

model VisitLogEntry {
  id          String   @id @default(uuid())
  visitLogId  String
  entryTime   DateTime
  staffId     String
  staffName   String
  staffRole   String
  content     String
  status      String   @default("completed")
  extraData   Json?    // 추가 데이터 (NoSQL처럼)
  createdAt   DateTime @default(now())
  
  visitLog    VisitLog @relation(fields: [visitLogId], references: [id])
  
  @@index([visitLogId])
  @@map("visit_log_entries")
}
```

### JSON 컬럼 활용 예시

```typescript
// 유연한 데이터 저장 (NoSQL처럼)
const visitLog = await prisma.visitLog.create({
  data: {
    visitDate: new Date(),
    patientId: 'patient-123',
    customData: {
      // 동적 필드
      customField1: 'value1',
      customField2: 123,
      tags: ['urgent', 'follow-up'],
      notes: {
        internal: '내부 메모',
        external: '환자 메모'
      }
    },
    metadata: {
      source: 'mobile-app',
      version: '1.0.0',
      device: {
        type: 'ios',
        version: '17.0'
      }
    }
  }
})

// JSON 쿼리 (PostgreSQL JSON 연산자)
const logs = await prisma.$queryRaw`
  SELECT * FROM visit_logs 
  WHERE custom_data->>'tags' @> '["urgent"]'::jsonb
`
```

---

## 🚀 확장 전략

### 나중에 MongoDB가 필요하면?

1. **점진적 도입**
   - 특정 기능만 MongoDB로 분리
   - 예: 대용량 로그만 MongoDB

2. **하이브리드 접근**
   - 핵심 데이터: PostgreSQL
   - 로그/이벤트: MongoDB

3. **하지만 대부분의 경우**
   - PostgreSQL JSON 컬럼으로 충분
   - 추가 DB 관리 비용 불필요

---

## 📝 최종 권장사항

### ✅ **PostgreSQL 단일 DB 사용**

**이유:**
1. EMR 시스템의 대부분 데이터가 관계형
2. PostgreSQL JSON 컬럼으로 유연한 데이터 처리 가능
3. Prisma, GraphQL, TanStack Query 최적화
4. 비용 절감 및 운영 간소화
5. 나중에 필요하면 MongoDB 추가 가능

**MongoDB 추가 고려 시점:**
- 일일 로그가 수백만 건 이상
- 실시간 이벤트 스트리밍이 핵심 기능
- 완전히 다른 스키마의 대용량 데이터

**마우스 이벤트 로깅의 경우:**
- 마우스 이동, 클릭 등은 매우 빈번한 이벤트
- 하지만 PostgreSQL의 배치 처리로 충분히 처리 가능
- `UserEventBatch` 모델로 성능 최적화
- 필요 시 나중에 MongoDB로 마이그레이션 가능

**현재 단계에서는 PostgreSQL만으로 충분합니다!**
