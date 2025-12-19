/**
 * Role Utilities
 *
 * @description 직원 역할 관련 유틸리티 함수들입니다.
 * 역할 카테고리 판단, 컴포넌트 선택 등의 로직을 중앙화합니다.
 */

import EmployeeSlidePage from "@/components/EmployeeSlidePage";
import DoctorSlidePage from "@/components/DoctorSlidePage";
import CounselorSlidePage from "@/components/CounselorSlidePage";

/**
 * 역할 카테고리 타입
 */
export type RoleCategory = "employee" | "doctor" | "counselor";

/**
 * 역할 정보 인터페이스
 */
export interface RoleInfo {
  /** 역할 카테고리 */
  category: RoleCategory;
  /** 페이지 제목 */
  title: string;
  /** SlidePage 컴포넌트 타입 */
  component:
    | typeof EmployeeSlidePage
    | typeof DoctorSlidePage
    | typeof CounselorSlidePage;
}

/**
 * 역할 문자열로부터 카테고리 판단
 *
 * @param role - 직원 역할 문자열 (예: "원장", "상담사", "과장")
 * @returns 역할 카테고리
 *
 * @example
 * ```typescript
 * getRoleCategory("원장") // "doctor"
 * getRoleCategory("상담사") // "counselor"
 * getRoleCategory("과장") // "employee"
 * ```
 */
export function getRoleCategory(role: string): RoleCategory {
  if (role.includes("원장")) {
    return "doctor";
  }
  if (role.includes("상담사")) {
    return "counselor";
  }
  return "employee";
}

/**
 * 역할 카테고리에 따른 페이지 제목 반환
 *
 * @param role - 직원 역할 문자열
 * @returns 페이지 제목
 *
 * @example
 * ```typescript
 * getRolePageTitle("원장") // "원장 일정 보기"
 * getRolePageTitle("상담사") // "상담 일정 보기"
 * getRolePageTitle("과장") // "업무 일정 보기"
 * ```
 */
export function getRolePageTitle(role: string): string {
  const category = getRoleCategory(role);
  switch (category) {
    case "doctor":
      return "원장 일정 보기";
    case "counselor":
      return "상담 일정 보기";
    default:
      return "업무 일정 보기";
  }
}

/**
 * 역할에 따른 SlidePage 컴포넌트 반환
 *
 * @param role - 직원 역할 문자열
 * @returns SlidePage 컴포넌트 타입
 *
 * @example
 * ```typescript
 * const Component = getRoleSlidePageComponent("원장");
 * <Component title="..." employeeName="..." />
 * ```
 */
export function getRoleSlidePageComponent(
  role: string
):
  | typeof EmployeeSlidePage
  | typeof DoctorSlidePage
  | typeof CounselorSlidePage {
  const category = getRoleCategory(role);
  switch (category) {
    case "doctor":
      return DoctorSlidePage;
    case "counselor":
      return CounselorSlidePage;
    default:
      return EmployeeSlidePage;
  }
}

/**
 * 역할 정보 객체 반환
 *
 * @param role - 직원 역할 문자열
 * @returns 역할 정보 객체
 *
 * @example
 * ```typescript
 * const info = getRoleInfo("원장");
 * // { category: "doctor", title: "원장 일정 보기", component: DoctorSlidePage }
 * ```
 */
export function getRoleInfo(role: string): RoleInfo {
  return {
    category: getRoleCategory(role),
    title: getRolePageTitle(role),
    component: getRoleSlidePageComponent(role),
  };
}
