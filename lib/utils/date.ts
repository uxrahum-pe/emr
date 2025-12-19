/**
 * Date Utilities (date-fns)
 *
 * @description date-fns를 사용한 날짜 유틸리티 함수들입니다.
 * 프로젝트 전반에서 일관된 날짜 포맷팅과 계산을 제공합니다.
 */

import {
  format,
  formatDistance,
  formatDistanceToNow,
  isToday,
  isYesterday,
  isTomorrow,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addWeeks,
  addMonths,
  subDays,
  subWeeks,
  subMonths,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  parseISO,
  isValid,
  startOfDay,
  endOfDay,
} from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 한국어 로케일 설정
 */
const locale = ko;

/**
 * 날짜를 한국어 형식으로 포맷팅
 *
 * @param date - 포맷팅할 날짜
 * @param formatStr - 포맷 문자열 (기본: 'yyyy-MM-dd')
 * @returns 포맷팅된 날짜 문자열
 *
 * @example
 * formatDate(new Date()) // "2024-01-15"
 * formatDate(new Date(), 'yyyy년 MM월 dd일') // "2024년 01월 15일"
 */
export function formatDate(
  date: Date | string,
  formatStr: string = "yyyy-MM-dd"
): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    return "";
  }
  return format(dateObj, formatStr, { locale });
}

/**
 * 날짜와 시간을 한국어 형식으로 포맷팅
 *
 * @param date - 포맷팅할 날짜
 * @param formatStr - 포맷 문자열 (기본: 'yyyy-MM-dd HH:mm')
 * @returns 포맷팅된 날짜 시간 문자열
 */
export function formatDateTime(
  date: Date | string,
  formatStr: string = "yyyy-MM-dd HH:mm"
): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    return "";
  }
  return format(dateObj, formatStr, { locale });
}

/**
 * 시간만 포맷팅
 *
 * @param date - 포맷팅할 날짜
 * @returns 포맷팅된 시간 문자열 (HH:mm)
 */
export function formatTime(date: Date | string): string {
  return formatDateTime(date, "HH:mm");
}

/**
 * 상대 시간 표시 (예: "3일 전", "2주 후")
 *
 * @param date - 비교할 날짜
 * @param baseDate - 기준 날짜 (기본: 현재)
 * @returns 상대 시간 문자열
 */
export function formatRelativeTime(
  date: Date | string,
  baseDate: Date = new Date()
): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    return "";
  }
  return formatDistance(dateObj, baseDate, { addSuffix: true, locale });
}

/**
 * 현재 시간 기준 상대 시간 표시
 *
 * @param date - 비교할 날짜
 * @returns 상대 시간 문자열
 */
export function formatRelativeToNow(date: Date | string): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    return "";
  }
  return formatDistanceToNow(dateObj, { addSuffix: true, locale });
}

/**
 * 날짜가 오늘인지 확인
 */
export function checkIsToday(date: Date | string): boolean {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return isValid(dateObj) && isToday(dateObj);
}

/**
 * 날짜가 어제인지 확인
 */
export function checkIsYesterday(date: Date | string): boolean {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return isValid(dateObj) && isYesterday(dateObj);
}

/**
 * 날짜가 내일인지 확인
 */
export function checkIsTomorrow(date: Date | string): boolean {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return isValid(dateObj) && isTomorrow(dateObj);
}

/**
 * 주의 시작일 (일요일) 가져오기
 */
export function getWeekStart(date: Date = new Date()): Date {
  return startOfWeek(date, { weekStartsOn: 0, locale });
}

/**
 * 주의 종료일 (토요일) 가져오기
 */
export function getWeekEnd(date: Date = new Date()): Date {
  return endOfWeek(date, { weekStartsOn: 0, locale });
}

/**
 * 월의 시작일 가져오기
 */
export function getMonthStart(date: Date = new Date()): Date {
  return startOfMonth(date);
}

/**
 * 월의 종료일 가져오기
 */
export function getMonthEnd(date: Date = new Date()): Date {
  return endOfMonth(date);
}

/**
 * 날짜 더하기
 */
export function addDaysToDate(date: Date, days: number): Date {
  return addDays(date, days);
}

export function addWeeksToDate(date: Date, weeks: number): Date {
  return addWeeks(date, weeks);
}

export function addMonthsToDate(date: Date, months: number): Date {
  return addMonths(date, months);
}

/**
 * 날짜 빼기
 */
export function subtractDaysFromDate(date: Date, days: number): Date {
  return subDays(date, days);
}

export function subtractWeeksFromDate(date: Date, weeks: number): Date {
  return subWeeks(date, weeks);
}

export function subtractMonthsFromDate(date: Date, months: number): Date {
  return subMonths(date, months);
}

/**
 * 날짜 차이 계산
 */
export function getDaysDifference(
  dateLeft: Date | string,
  dateRight: Date | string
): number {
  const left = typeof dateLeft === "string" ? parseISO(dateLeft) : dateLeft;
  const right = typeof dateRight === "string" ? parseISO(dateRight) : dateRight;
  return differenceInDays(left, right);
}

export function getWeeksDifference(
  dateLeft: Date | string,
  dateRight: Date | string
): number {
  const left = typeof dateLeft === "string" ? parseISO(dateLeft) : dateLeft;
  const right = typeof dateRight === "string" ? parseISO(dateRight) : dateRight;
  return differenceInWeeks(left, right);
}

export function getMonthsDifference(
  dateLeft: Date | string,
  dateRight: Date | string
): number {
  const left = typeof dateLeft === "string" ? parseISO(dateLeft) : dateLeft;
  const right = typeof dateRight === "string" ? parseISO(dateRight) : dateRight;
  return differenceInMonths(left, right);
}

/**
 * 날짜의 시작 시간 (00:00:00) 가져오기
 */
export function getStartOfDay(date: Date = new Date()): Date {
  return startOfDay(date);
}

/**
 * 날짜의 종료 시간 (23:59:59) 가져오기
 */
export function getEndOfDay(date: Date = new Date()): Date {
  return endOfDay(date);
}

/**
 * 날짜 유효성 검사
 */
export function isValidDate(date: Date | string | null | undefined): boolean {
  if (!date) return false;
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return isValid(dateObj);
}
