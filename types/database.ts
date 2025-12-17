/**
 * 데이터베이스 스키마 타입 정의
 * Prisma 스키마와 동기화하여 관리
 * 
 * 주의: 이 파일은 Prisma 스키마 변경 시 함께 업데이트해야 함
 */

import { Prisma } from '@prisma/client'

// ============================================
// Prisma 생성 타입 (자동 생성)
// ============================================

// Prisma가 생성하는 타입들을 재사용
// 예: import { Patient, VisitLog } from '@prisma/client'

// ============================================
// 확장된 타입 (관계 포함)
// ============================================

/** 방문일지와 관련 엔트리들을 포함한 타입 */
export type VisitLogWithEntries = Prisma.VisitLogGetPayload<{
  include: {
    entries: true
    patient: true
    hospital: true
  }
}>

/** 패키지와 관련 정보를 포함한 타입 */
export type PackageWithDetails = Prisma.PackageGetPayload<{
  include: {
    patient: true
    hospital: true
    visitLogs: true
  }
}>

/** 향후일정과 관련 정보를 포함한 타입 */
export type FutureScheduleWithDetails = Prisma.FutureScheduleGetPayload<{
  include: {
    patient: true
  }
}>

// ============================================
// DB 스키마 정의 (참고용 - 실제는 Prisma 스키마 참조)
// ============================================

/**
 * 예상되는 DB 스키마 구조 (Prisma schema.prisma와 동기화 필요)
 * 
 * model VisitLog {
 *   id          String   @id @default(uuid())
 *   visitDate   DateTime
 *   patientId   String
 *   hospitalId  String?
 *   period      String?
 *   createdAt   DateTime @default(now())
 *   updatedAt   DateTime @updatedAt
 *   
 *   patient     Patient  @relation(fields: [patientId], references: [id])
 *   hospital    Hospital? @relation(fields: [hospitalId], references: [id])
 *   entries     VisitLogEntry[]
 * }
 * 
 * model VisitLogEntry {
 *   id          String   @id @default(uuid())
 *   visitLogId  String
 *   entryTime   DateTime
 *   staffId     String
 *   content     String
 *   status      String
 *   createdAt   DateTime @default(now())
 *   
 *   visitLog    VisitLog @relation(fields: [visitLogId], references: [id])
 * }
 * 
 * model Package {
 *   id          String   @id @default(uuid())
 *   patientId   String
 *   period      Int
 *   startDate   DateTime
 *   endDate     DateTime?
 *   status      String
 *   hospitalId  String?
 *   createdAt   DateTime @default(now())
 *   updatedAt   DateTime @updatedAt
 *   
 *   patient     Patient  @relation(fields: [patientId], references: [id])
 *   hospital    Hospital? @relation(fields: [hospitalId], references: [id])
 * }
 * 
 * model FutureSchedule {
 *   id            String   @id @default(uuid())
 *   patientId     String
 *   scheduledDate DateTime
 *   scheduleType  String
 *   description   String
 *   status        String
 *   createdAt     DateTime @default(now())
 *   
 *   patient       Patient  @relation(fields: [patientId], references: [id])
 * }
 */

// ============================================
// 타입 가드 함수 타입
// ============================================

/** 타입 가드 함수 타입 */
export type TypeGuard<T> = (value: unknown) => value is T
