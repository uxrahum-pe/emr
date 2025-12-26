/**
 * Role Utilities
 *
 * @description 직원 역할에 따른 컴포넌트, 카테고리, 제목을 결정하는 유틸리티 함수들입니다.
 *
 * @remarks
 * - 역할 기반 라우팅 로직을 중앙화하여 유지보수성을 향상시킵니다.
 * - AI가 역할 처리 로직을 이해할 때 이 파일을 참조하면 됩니다.
 */

import DoctorSlidePage from "@/components/slides/DoctorSlidePage";
import EmployeeSlidePage from "@/components/slides/EmployeeSlidePage";
import CounselorSlidePage from "@/components/slides/CounselorSlidePage";
import type { RoleCategory, RoleInfo } from "@/types/reception";

/**
 * 역할에 따른 SlidePage 컴포넌트를 반환합니다.
 *
 * @param role - 직원 역할 문자열 (예: "원장", "상담사", "과장" 등)
 * @returns 해당 역할에 맞는 SlidePage 컴포넌트
 *
 * @example
 * ```tsx
 * const Component = getSlidePageComponent("원장"); // DoctorSlidePage
 * const Component = getSlidePageComponent("상담사"); // CounselorSlidePage
 * ```
 */
export function getSlidePageComponent(role: string): React.ComponentType<any> {
  if (role.includes("원장")) {
    return DoctorSlidePage;
  }
  if (role.includes("상담사")) {
    return CounselorSlidePage;
  }
  return EmployeeSlidePage;
}

/**
 * 역할에 따른 pageId 카테고리를 반환합니다.
 *
 * @param role - 직원 역할 문자열
 * @returns 역할 카테고리 (동일 역할은 같은 pageId 사용)
 *
 * @example
 * ```tsx
 * const category = getRoleCategory("원장"); // "doctor"
 * const category = getRoleCategory("상담사"); // "counselor"
 * ```
 */
export function getRoleCategory(role: string): RoleCategory {
  if (role.includes("상담사")) {
    return "counselor";
  }
  if (role.includes("원장")) {
    return "doctor";
  }
  if (role.includes("과장")) {
    return "manager";
  }
  if (role.includes("대리")) {
    return "assistant";
  }
  if (role.includes("팀장")) {
    return "team-leader";
  }
  if (role.includes("주임")) {
    return "clerk";
  }
  return "employee";
}

/**
 * 역할에 따른 페이지 제목을 반환합니다.
 *
 * @param role - 직원 역할 문자열
 * @returns 페이지 제목
 *
 * @example
 * ```tsx
 * const title = getPageTitle("원장"); // "원장 일정 보기"
 * const title = getPageTitle("상담사"); // "상담 일정 보기"
 * ```
 */
export function getPageTitle(role: string): string {
  if (role.includes("원장")) {
    return "원장 일정 보기";
  }
  if (role.includes("상담사")) {
    return "상담 일정 보기";
  }
  return "업무 일정 보기";
}

/**
 * 역할 정보를 한 번에 가져옵니다.
 *
 * @param role - 직원 역할 문자열
 * @returns 역할 정보 객체 (카테고리, 제목, 컴포넌트)
 *
 * @example
 * ```tsx
 * const roleInfo = getRoleInfo("원장");
 * // { category: "doctor", title: "원장 일정 보기", component: DoctorSlidePage }
 * ```
 */
export function getRoleInfo(role: string): RoleInfo {
  return {
    category: getRoleCategory(role),
    title: getPageTitle(role),
    component: getSlidePageComponent(role),
  };
}
